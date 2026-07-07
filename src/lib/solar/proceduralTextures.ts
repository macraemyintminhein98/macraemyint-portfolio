/**
 * Procedural planet textures — every surface in the simulator is generated
 * from seeded value-noise at runtime. No image assets, no network requests.
 */

import * as THREE from 'three';
import type { TextureSpec } from '@/data/solarSystem';

/* ── seeded RNG + periodic value noise ──────────────────────────────────── */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Lattice hash — deterministic per (seed, x, y). */
function hash2(seed: number, x: number, y: number) {
  let h = seed ^ (x * 374761393) ^ (y * 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Value noise, periodic in x with period `perX` lattice cells (seamless longitude). */
function noise2(seed: number, x: number, y: number, perX: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const wrap = (v: number) => ((v % perX) + perX) % perX;
  const a = hash2(seed, wrap(x0), y0);
  const b = hash2(seed, wrap(x0 + 1), y0);
  const c = hash2(seed, wrap(x0), y0 + 1);
  const d = hash2(seed, wrap(x0 + 1), y0 + 1);
  const u = smooth(fx);
  const v = smooth(fy);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal Brownian motion — octave stack of periodic value noise. */
function fbm(seed: number, x: number, y: number, perX: number, octaves = 5) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < octaves; o++) {
    sum += amp * noise2(seed + o * 131, x * freq, y * freq, Math.max(1, Math.round(perX * freq)));
    amp *= 0.5;
    freq *= 2;
  }
  return sum; // ~0..1
}

/* ── colour helpers ─────────────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Sample an even-stop gradient of hex colours at t ∈ [0,1]. */
function gradient(stops: [number, number, number][], t: number): [number, number, number] {
  const tt = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(tt);
  return lerp3(stops[i], stops[i + 1], tt - i);
}

function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, ctx: c.getContext('2d')! };
}

function toTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/* ── surface generators ─────────────────────────────────────────────────── */

const W = 768;
const H = 384;
const PER = 6; // noise lattice period across the seam

function paintCraters(ctx: CanvasRenderingContext2D, seed: number, count: number, w: number, h: number) {
  const rnd = mulberry32(seed * 7919);
  for (let i = 0; i < count; i++) {
    const x = rnd() * w;
    // bias craters away from extreme poles where equirect stretching distorts them
    const y = h * (0.08 + rnd() * 0.84);
    const r = 2 + Math.pow(rnd(), 2.2) * (w / 28);
    const g = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,0.34)');
    g.addColorStop(0.72, 'rgba(0,0,0,0.12)');
    g.addColorStop(0.86, 'rgba(255,255,255,0.16)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (x < r) {
      ctx.beginPath();
      ctx.arc(x + w, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (x > w - r) {
      ctx.beginPath();
      ctx.arc(x - w, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function rockySurface(spec: TextureSpec): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(W, H);
  const img = ctx.createImageData(W, H);
  const stops = spec.palette.map(hexToRgb);
  const icy = spec.kind === 'ice';
  for (let y = 0; y < H; y++) {
    const v = y / H;
    const lat = Math.abs(v - 0.5) * 2; // 0 equator → 1 pole
    for (let x = 0; x < W; x++) {
      const u = x / W;
      let n = fbm(spec.seed, u * PER, v * PER * 0.9, PER, 5);
      if (icy) {
        // long cracked lineae — ridged noise streaks
        const ridge = Math.abs(fbm(spec.seed + 500, u * PER * 2.2, v * PER * 0.7, PER * 2.2, 4) - 0.5) * 2;
        n = n * 0.72 + (1 - Math.pow(ridge, 0.4)) * 0.28;
      }
      let [r, g, b] = gradient(stops, n);
      if (spec.caps && lat > 1 - spec.caps.extent * (0.8 + n * 0.5)) {
        const cap = hexToRgb(spec.caps.color);
        const t = Math.min(1, (lat - (1 - spec.caps.extent)) / spec.caps.extent + n * 0.3);
        [r, g, b] = lerp3([r, g, b], cap, Math.max(0, t));
      }
      const i = (y * W + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  if (spec.craters) paintCraters(ctx, spec.seed, spec.craters, W, H);
  return c;
}

function gasSurface(spec: TextureSpec): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(W, H);
  const img = ctx.createImageData(W, H);
  const stops = spec.palette.map(hexToRgb);
  const bands = spec.bands ?? 9;
  const turb = spec.turbulence ?? 0.05;
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const warp = (fbm(spec.seed, u * PER * 1.6, v * PER * 3.2, Math.round(PER * 1.6), 5) - 0.5) * turb;
      const band = 0.5 + 0.5 * Math.sin((v + warp) * Math.PI * bands + Math.sin((v + warp) * Math.PI * 2.3) * 1.4);
      const detail = (fbm(spec.seed + 77, u * PER * 3, v * PER * 6, PER * 3, 4) - 0.5) * 0.16;
      let [r, g, b] = gradient(stops, Math.min(1, Math.max(0, band + detail)));
      if (spec.spot) {
        const du = Math.min(Math.abs(u - spec.spot.u), 1 - Math.abs(u - spec.spot.u)) / spec.spot.ru;
        const dv = (v - spec.spot.v) / spec.spot.rv;
        const d = du * du + dv * dv;
        if (d < 1.6) {
          const t = Math.max(0, 1 - d / 1.6);
          const sc = hexToRgb(spec.spot.color);
          const swirl = 0.75 + 0.25 * Math.sin(d * 9 + u * 40);
          [r, g, b] = lerp3([r, g, b], sc, Math.pow(t, 0.8) * swirl);
        }
      }
      const i = (y * W + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function venusSurface(spec: TextureSpec): HTMLCanvasElement {
  const { c, ctx } = makeCanvas(W, H);
  const img = ctx.createImageData(W, H);
  const stops = spec.palette.map(hexToRgb);
  const turb = spec.turbulence ?? 0.14;
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const u = x / W;
      // sulphuric cloud deck — big soft swirls sheared by super-rotation
      const shear = fbm(spec.seed + 9, u * PER + v * 3.5, v * PER * 1.4, PER, 5);
      const n = fbm(spec.seed, u * PER * 1.3 + shear * turb * 22, v * PER * 1.8, Math.round(PER * 1.3), 5);
      const [r, g, b] = gradient(stops, n);
      const i = (y * W + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function earthSurface(spec: TextureSpec): HTMLCanvasElement {
  const w = 1024;
  const h = 512;
  const per = 7;
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  const deep = hexToRgb(spec.palette[0]);
  const shallow = hexToRgb(spec.palette[1]);
  const veg = hexToRgb(spec.palette[2]);
  const arid = hexToRgb(spec.palette[3]);
  const ice: [number, number, number] = [232, 240, 245];
  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = Math.abs(v - 0.5) * 2;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const continents = fbm(spec.seed, u * per, v * per, per, 6);
      const relief = fbm(spec.seed + 40, u * per * 3, v * per * 3, per * 3, 5);
      let r: number, g: number, b: number;
      const sea = 0.545;
      if (continents > sea) {
        const inland = Math.min(1, (continents - sea) / 0.16);
        const dryness = fbm(spec.seed + 90, u * per * 1.7, v * per * 1.7, Math.round(per * 1.7), 4);
        // subtropical desert belt
        const desertBias = Math.exp(-Math.pow((lat - 0.38) / 0.16, 2)) * 0.5;
        [r, g, b] = lerp3(veg, arid, Math.min(1, dryness * 0.75 + desertBias));
        const shade = 0.82 + relief * 0.36 + inland * 0.06;
        r *= shade;
        g *= shade;
        b *= shade;
      } else {
        const depth = Math.min(1, (sea - continents) / 0.3);
        [r, g, b] = lerp3(shallow, deep, Math.pow(depth, 0.7));
        const glint = 0.92 + relief * 0.12;
        r *= glint;
        g *= glint;
        b *= glint;
      }
      // polar ice
      const iceEdge = 0.855 - relief * 0.05;
      if (lat > iceEdge) {
        const t = Math.min(1, (lat - iceEdge) / 0.07);
        [r, g, b] = lerp3([r, g, b], ice, t);
      }
      const i = (y * w + x) * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function buildCloudCanvas(seed: number): HTMLCanvasElement {
  const w = 1024;
  const h = 512;
  const per = 8;
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const n = fbm(seed, u * per + v * 1.5, v * per * 0.9, per, 5);
      const a = Math.min(1, Math.max(0, (n - 0.52) / 0.2));
      const i = (y * w + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(Math.pow(a, 1.25) * 235);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function buildSurfaceTexture(spec: TextureSpec): THREE.CanvasTexture {
  let canvas: HTMLCanvasElement;
  switch (spec.kind) {
    case 'gas':
      canvas = gasSurface(spec);
      break;
    case 'venus':
      canvas = venusSurface(spec);
      break;
    case 'earth':
      canvas = earthSurface(spec);
      break;
    case 'ice':
    case 'rocky':
    default:
      canvas = rockySurface(spec);
      break;
  }
  return toTexture(canvas);
}

export function buildCloudTexture(seed: number): THREE.CanvasTexture {
  const tex = toTexture(buildCloudCanvas(seed));
  return tex;
}

/* ── rings ──────────────────────────────────────────────────────────────── */

export function buildRingTexture(kind: 'saturn' | 'uranus'): THREE.CanvasTexture {
  const w = 1024;
  const h = 8;
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  const rnd = mulberry32(kind === 'saturn' ? 424 : 777);
  // pre-compute a radial profile
  const profile: { a: number; rgb: [number, number, number] }[] = [];
  for (let x = 0; x < w; x++) {
    const t = x / w; // 0 inner → 1 outer
    let a = 0;
    let rgb: [number, number, number] = [216, 198, 160];
    if (kind === 'saturn') {
      // C ring (faint) → B ring (dense) → Cassini division → A ring → Encke gap
      if (t < 0.18) a = 0.16 + 0.1 * Math.sin(t * 60);
      else if (t < 0.55) a = 0.82 + 0.14 * Math.sin(t * 90) * rnd();
      else if (t < 0.63) a = 0.05; // Cassini division
      else if (t < 0.94) a = 0.6 + 0.16 * Math.sin(t * 120) * rnd();
      else a = 0.22;
      if (t > 0.86 && t < 0.885) a *= 0.15; // Encke gap
      const warm = 0.86 + 0.14 * Math.sin(t * 34 + 1.2);
      rgb = [216 * warm, 197 * warm, 158 * warm];
    } else {
      // Uranus — a handful of narrow charcoal ringlets
      const rings = [0.12, 0.3, 0.46, 0.63, 0.82, 0.95];
      for (const rc of rings) {
        const d = Math.abs(t - rc);
        if (d < 0.012) a = Math.max(a, 0.7 * (1 - d / 0.012));
      }
      rgb = [122, 134, 140];
    }
    // fine grain
    a *= 0.85 + rnd() * 0.15;
    profile.push({ a: Math.min(1, a), rgb });
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = profile[x];
      const i = (y * w + x) * 4;
      img.data[i] = p.rgb[0];
      img.data[i + 1] = p.rgb[1];
      img.data[i + 2] = p.rgb[2];
      img.data[i + 3] = Math.round(p.a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── sprites ────────────────────────────────────────────────────────────── */

export function buildGlowTexture(inner: string, outer: string): THREE.CanvasTexture {
  const s = 256;
  const { c, ctx } = makeCanvas(s, s);
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.25, inner.replace(/,\s*[\d.]+\)$/, ', 0.55)'));
  g.addColorStop(0.6, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

export function buildStarTexture(): THREE.CanvasTexture {
  const s = 64;
  const { c, ctx } = makeCanvas(s, s);
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}
