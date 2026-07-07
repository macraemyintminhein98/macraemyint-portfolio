/**
 * /solar-system — Live orbital simulator.
 *
 * A real-time ephemeris, not an animation: planet positions are computed each
 * frame by solving Kepler's equation (Newton–Raphson) against JPL J2000
 * orbital elements, so the layout on screen matches the actual sky for the
 * simulated date. Every surface is procedurally generated — zero image assets.
 */

import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Rewind, FastForward, RotateCcw } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  PLANETS,
  SUN,
  SUN_RADIUS,
  J2000_MS,
  auToScene,
  planetRadius,
  moonRadius,
  bodyInfo,
  type OrbitalElements,
} from '@/data/solarSystem';
import {
  buildSurfaceTexture,
  buildCloudTexture,
  buildRingTexture,
  buildGlowTexture,
  buildStarTexture,
} from '@/lib/solar/proceduralTextures';

/* ── time model ─────────────────────────────────────────────────────────── */

const DAY_MS = 86400000;
const daysNow = () => (Date.now() - J2000_MS) / DAY_MS;

export const SPEEDS = [
  { v: 1 / 86400, label: 'REAL-TIME' },
  { v: 1 / 1440, label: '1 MIN / S' },
  { v: 1 / 24, label: '1 HR / S' },
  { v: 1, label: '1 DAY / S' },
  { v: 7, label: '1 WK / S' },
  { v: 30.44, label: '1 MO / S' },
  { v: 365.25, label: '1 YR / S' },
];
const DEFAULT_SPEED_IDX = 4;

const DEG = Math.PI / 180;
const GOLD = '#c8a94c';

/* ── Kepler ─────────────────────────────────────────────────────────────── */

/** Heliocentric position (scene units) from JPL elements at `days` since J2000. */
function keplerPosition(el: OrbitalElements, days: number, out: THREE.Vector3) {
  const T = days / 36525;
  const a = el.a[0] + el.a[1] * T;
  const e = el.e[0] + el.e[1] * T;
  const i = (el.i[0] + el.i[1] * T) * DEG;
  const L = (el.L[0] + el.L[1] * T) * DEG;
  const lp = (el.lp[0] + el.lp[1] * T) * DEG;
  const node = (el.node[0] + el.node[1] * T) * DEG;

  let M = L - lp;
  M = ((M % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

  // Newton–Raphson: E − e·sinE = M
  let E = M + e * Math.sin(M);
  for (let k = 0; k < 6; k++) {
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }

  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const w = lp - node; // argument of perihelion

  const cw = Math.cos(w), sw = Math.sin(w);
  const cn = Math.cos(node), sn = Math.sin(node);
  const ci = Math.cos(i), si = Math.sin(i);

  // heliocentric ecliptic coordinates (AU)
  const x = (cw * cn - sw * sn * ci) * xp + (-sw * cn - cw * sn * ci) * yp;
  const y = (cw * sn + sw * cn * ci) * xp + (-sw * sn + cw * cn * ci) * yp;
  const z = sw * si * xp + cw * si * yp;

  // compress distances, keep direction — ecliptic → scene (y up = north)
  const r = Math.sqrt(x * x + y * y + z * z);
  const s = r > 1e-9 ? auToScene(r) / r : 0;
  return out.set(x * s, z * s, -y * s);
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ── engine ─────────────────────────────────────────────────────────────── */

interface EngineCallbacks {
  onSelect: (id: string | null) => void;
  onDate: (dateStr: string, deltaStr: string) => void;
  onReady: () => void;
  onTogglePause: () => void;
}

export interface SolarEngine {
  select: (id: string | null) => void;
  resetView: () => void;
  resetToday: () => void;
  setPaused: (p: boolean) => void;
  setSpeed: (daysPerSec: number) => void;
  setOrbits: (on: boolean) => void;
  setLabels: (on: boolean) => void;
  setBelt: (on: boolean) => void;
  dispose: () => void;
}

const HOME_CAM = new THREE.Vector3(0, 118, 268);

function createSolarEngine(
  mount: HTMLDivElement,
  cb: EngineCallbacks,
  initial: { paused: boolean; speed: number }
): SolarEngine {
  let width = mount.clientWidth;
  let height = mount.clientHeight;

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.75 : 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  mount.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(width, height);
  Object.assign(labelRenderer.domElement.style, {
    position: 'absolute',
    inset: '0',
    pointerEvents: 'none',
  } as CSSStyleDeclaration);
  mount.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 9000);
  camera.position.copy(HOME_CAM);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4;
  controls.maxDistance = 1800;
  controls.zoomSpeed = 0.9;

  // HDR pipeline → bloom threshold above 1.0 so only the Sun's shader blooms
  const composer = new EffectComposer(
    renderer,
    new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType })
  );
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.85, 0.55, 1.15);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  scene.add(new THREE.AmbientLight(0x3a4048, 0.55));
  const sunLight = new THREE.PointLight(0xfff1d6, 1.15, 0, 0);
  scene.add(sunLight);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T): T => {
    disposables.push(o);
    return o;
  };

  const rayTargets: THREE.Object3D[] = [];
  const bodyMap = new Map<string, { obj: THREE.Object3D; radius: number }>();
  const labelEls = new Map<string, { el: HTMLDivElement; group: string }>();
  const orbitLines: { line: THREE.Line; id: string; baseOpacity: number }[] = [];

  /* ── starfield ── */
  {
    const starTex = track(buildStarTexture());
    const N = 9000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const temps: [number, number, number][] = [
      [0.72, 0.8, 1.0],
      [1.0, 1.0, 1.0],
      [1.0, 0.93, 0.78],
      [1.0, 0.78, 0.58],
    ];
    for (let i = 0; i < N; i++) {
      const r = 1800 + Math.random() * 1600;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      const t = temps[Math.floor(Math.pow(Math.random(), 1.6) * temps.length)];
      const b = 0.35 + Math.random() * 0.65;
      col[i * 3] = t[0] * b;
      col[i * 3 + 1] = t[1] * b;
      col[i * 3 + 2] = t[2] * b;
    }
    const g = track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = track(
      new THREE.PointsMaterial({
        size: 2.1,
        sizeAttenuation: false,
        map: starTex,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(new THREE.Points(g, m));
  }

  /* ── the Sun — animated fbm shader, HDR output for bloom ── */
  const sunUniforms = { uTime: { value: 0 } };
  {
    const sunMat = track(
      new THREE.ShaderMaterial({
        uniforms: sunUniforms,
        vertexShader: /* glsl */ `
          varying vec3 vPos;
          varying vec3 vNormalV;
          varying vec3 vViewV;
          void main() {
            vPos = normalize(position);
            vNormalV = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vViewV = -mv.xyz;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vPos;
          varying vec3 vNormalV;
          varying vec3 vViewV;
          float hash(vec3 p) {
            p = fract(p * 0.3183099 + 0.1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }
          float noise(vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                  mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
              mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                  mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
              f.z);
          }
          float fbm(vec3 p) {
            float s = 0.0, a = 0.5;
            for (int i = 0; i < 4; i++) { s += a * noise(p); p *= 2.1; a *= 0.5; }
            return s;
          }
          void main() {
            vec3 p = vPos * 3.2 + vec3(uTime * 0.045, uTime * 0.03, -uTime * 0.02);
            float n = fbm(p);
            float g = fbm(vPos * 9.0 + n * 2.0 + uTime * 0.06); // granulation
            vec3 deep = vec3(1.0, 0.30, 0.02);
            vec3 hot  = vec3(1.0, 0.86, 0.46);
            vec3 col = mix(deep, hot, smoothstep(0.25, 0.8, n)) * (1.25 + g * 0.9);
            float rim = pow(1.0 - abs(dot(normalize(vViewV), vNormalV)), 2.2);
            col += vec3(1.0, 0.42, 0.08) * rim * 1.6;
            gl_FragColor = vec4(col * 1.35, 1.0);
          }`,
      })
    );
    const sunGeo = track(new THREE.SphereGeometry(SUN_RADIUS, 64, 48));
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData.bodyId = 'sun';
    scene.add(sunMesh);
    rayTargets.push(sunMesh);
    bodyMap.set('sun', { obj: sunMesh, radius: SUN_RADIUS });

    const glow1 = track(buildGlowTexture('rgba(255,214,140,1)', 'rgba(255,120,30,0.28)'));
    const s1 = new THREE.Sprite(
      track(new THREE.SpriteMaterial({ map: glow1, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.9 }))
    );
    s1.scale.setScalar(SUN_RADIUS * 6.5);
    scene.add(s1);
    const glow2 = track(buildGlowTexture('rgba(255,240,200,1)', 'rgba(255,170,60,0.35)'));
    const s2 = new THREE.Sprite(
      track(new THREE.SpriteMaterial({ map: glow2, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.95 }))
    );
    s2.scale.setScalar(SUN_RADIUS * 3.1);
    scene.add(s2);
  }

  /* ── labels ── */
  const makeLabel = (id: string, name: string, group: string, parentObj: THREE.Object3D, yOff: number) => {
    const el = document.createElement('div');
    el.textContent = name.toUpperCase();
    Object.assign(el.style, {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '10px',
      letterSpacing: '0.18em',
      color: 'rgba(255,255,255,0.55)',
      textShadow: '0 0 8px rgba(0,0,0,0.95)',
      cursor: 'pointer',
      pointerEvents: 'auto',
      padding: '3px 5px',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      transition: 'color 0.25s',
    });
    el.addEventListener('pointerdown', (e) => e.stopPropagation());
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      api.select(id);
    });
    const obj = new CSS2DObject(el);
    obj.position.set(0, yOff, 0);
    parentObj.add(obj);
    labelEls.set(id, { el, group });
    return obj;
  };

  /* ── planets ── */
  interface PlanetRT {
    id: string;
    anchor: THREE.Object3D;
    spin: THREE.Mesh;
    clouds?: THREE.Mesh;
    rotationHours: number;
    elements: OrbitalElements;
    radius: number;
    moons: { pivot: THREE.Object3D; mesh: THREE.Mesh; periodDays: number }[];
  }
  const planetsRT: PlanetRT[] = [];
  const tmpV = new THREE.Vector3();

  for (const p of PLANETS) {
    const r = planetRadius(p.radiusKm);
    const anchor = new THREE.Object3D();
    scene.add(anchor);

    const tiltGroup = new THREE.Object3D();
    tiltGroup.rotation.z = -p.axialTiltDeg * DEG;
    anchor.add(tiltGroup);

    const surface = track(buildSurfaceTexture(p.texture));
    const mat = track(new THREE.MeshLambertMaterial({ map: surface }));
    const geo = track(new THREE.SphereGeometry(r, 48, 32));
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.bodyId = p.id;
    tiltGroup.add(mesh);
    rayTargets.push(mesh);
    bodyMap.set(p.id, { obj: anchor, radius: r });

    let cloudsMesh: THREE.Mesh | undefined;
    if (p.clouds) {
      const cTex = track(buildCloudTexture(p.texture.seed + 300));
      const cMat = track(
        new THREE.MeshLambertMaterial({ map: cTex, transparent: true, depthWrite: false })
      );
      cloudsMesh = new THREE.Mesh(track(new THREE.SphereGeometry(r * 1.015, 48, 32)), cMat);
      tiltGroup.add(cloudsMesh);
    }

    if (p.atmosphere) {
      const aMat = track(
        new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color(p.atmosphere.color) },
            uIntensity: { value: p.atmosphere.intensity },
          },
          vertexShader: /* glsl */ `
            varying vec3 vN; varying vec3 vV;
            void main() {
              vN = normalize(normalMatrix * normal);
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              vV = -mv.xyz;
              gl_Position = projectionMatrix * mv;
            }`,
          fragmentShader: /* glsl */ `
            uniform vec3 uColor; uniform float uIntensity;
            varying vec3 vN; varying vec3 vV;
            void main() {
              float f = pow(1.0 - abs(dot(normalize(vV), normalize(vN))), 3.0);
              gl_FragColor = vec4(uColor, f * uIntensity);
            }`,
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const aMesh = new THREE.Mesh(
        track(new THREE.SphereGeometry(r * p.atmosphere.scale, 48, 32)),
        aMat
      );
      tiltGroup.add(aMesh);
    }

    if (p.ring) {
      const rTex = track(buildRingTexture(p.ring.kind));
      const inner = r * p.ring.inner;
      const outer = r * p.ring.outer;
      const rGeo = track(new THREE.RingGeometry(inner, outer, 128, 1));
      // remap UVs so u runs along the radius (RingGeometry defaults are planar)
      const posAttr = rGeo.attributes.position;
      const uvAttr = rGeo.attributes.uv;
      for (let vi = 0; vi < posAttr.count; vi++) {
        const vx = posAttr.getX(vi);
        const vy = posAttr.getY(vi);
        const rr = Math.sqrt(vx * vx + vy * vy);
        uvAttr.setXY(vi, (rr - inner) / (outer - inner), 0.5);
      }
      const rMat = track(
        new THREE.MeshBasicMaterial({
          map: rTex,
          transparent: true,
          opacity: p.ring.opacity,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      const ringMesh = new THREE.Mesh(rGeo, rMat);
      ringMesh.rotation.x = -Math.PI / 2;
      tiltGroup.add(ringMesh);
    }

    /* moons */
    const moonsRT: PlanetRT['moons'] = [];
    for (const m of p.moons) {
      const pivot = new THREE.Object3D();
      pivot.userData.phase = Math.random() * Math.PI * 2;
      anchor.add(pivot);
      const mr = moonRadius(m.radiusKm);
      const mTex = track(buildSurfaceTexture(m.texture));
      const mMesh = new THREE.Mesh(
        track(new THREE.SphereGeometry(mr, 24, 16)),
        track(new THREE.MeshLambertMaterial({ map: mTex }))
      );
      mMesh.position.x = m.dist;
      mMesh.userData.bodyId = m.id;
      pivot.add(mMesh);
      rayTargets.push(mMesh);
      bodyMap.set(m.id, { obj: mMesh, radius: mr });
      makeLabel(m.id, m.name, `moons:${p.id}`, mMesh, mr * 1.5 + 0.45);

      // faint moon orbit circle
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 72; k++) {
        const a = (k / 72) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * m.dist, 0, Math.sin(a) * m.dist));
      }
      const og = track(new THREE.BufferGeometry().setFromPoints(pts));
      const om = track(
        new THREE.LineBasicMaterial({ color: new THREE.Color(m.color), transparent: true, opacity: 0.16 })
      );
      const oline = new THREE.Line(og, om);
      anchor.add(oline);
      orbitLines.push({ line: oline, id: m.id, baseOpacity: 0.16 });

      moonsRT.push({ pivot, mesh: mMesh, periodDays: m.periodDays });
    }

    makeLabel(p.id, p.name, 'planets', anchor, r * 1.4 + 0.8);

    /* orbit line — true ellipse from the same elements, sampled over E */
    {
      const T0 = daysNow() / 36525;
      const a = p.elements.a[0] + p.elements.a[1] * T0;
      const e = p.elements.e[0] + p.elements.e[1] * T0;
      const i = (p.elements.i[0] + p.elements.i[1] * T0) * DEG;
      const lp = (p.elements.lp[0] + p.elements.lp[1] * T0) * DEG;
      const node = (p.elements.node[0] + p.elements.node[1] * T0) * DEG;
      const w = lp - node;
      const cw = Math.cos(w), sw = Math.sin(w);
      const cn = Math.cos(node), sn = Math.sin(node);
      const ci = Math.cos(i), si = Math.sin(i);
      const b = a * Math.sqrt(1 - e * e);
      const pts: THREE.Vector3[] = [];
      const SEG = 256;
      for (let k = 0; k < SEG; k++) {
        const E = (k / SEG) * Math.PI * 2;
        const xp = a * (Math.cos(E) - e);
        const yp = b * Math.sin(E);
        const x = (cw * cn - sw * sn * ci) * xp + (-sw * cn - cw * sn * ci) * yp;
        const y = (cw * sn + sw * cn * ci) * xp + (-sw * sn + cw * cn * ci) * yp;
        const z = sw * si * xp + cw * si * yp;
        const rr = Math.sqrt(x * x + y * y + z * z);
        const s = auToScene(rr) / rr;
        pts.push(new THREE.Vector3(x * s, z * s, -y * s));
      }
      const og = track(new THREE.BufferGeometry().setFromPoints(pts));
      const om = track(
        new THREE.LineBasicMaterial({ color: new THREE.Color(p.color), transparent: true, opacity: 0.3 })
      );
      const line = new THREE.LineLoop(og, om);
      scene.add(line);
      orbitLines.push({ line, id: p.id, baseOpacity: 0.3 });
    }

    planetsRT.push({
      id: p.id,
      anchor,
      spin: mesh,
      clouds: cloudsMesh,
      rotationHours: p.rotationHours,
      elements: p.elements,
      radius: r,
      moons: moonsRT,
    });
  }
  makeLabel('sun', 'Sun', 'planets', bodyMap.get('sun')!.obj, SUN_RADIUS * 1.5);

  /* ── asteroid belt (instanced) + Kuiper belt (points) ── */
  const beltGroup = new THREE.Group();
  scene.add(beltGroup);
  const BELT_N = 1300;
  const beltGeo = track(new THREE.IcosahedronGeometry(0.14, 0));
  const beltMat = track(new THREE.MeshLambertMaterial({ color: 0x97897b }));
  const beltMesh = new THREE.InstancedMesh(beltGeo, beltMat, BELT_N);
  beltMesh.frustumCulled = false;
  beltGroup.add(beltMesh);
  const beltR = new Float32Array(BELT_N);
  const beltY = new Float32Array(BELT_N);
  const beltPhase = new Float32Array(BELT_N);
  const beltPeriod = new Float32Array(BELT_N);
  const beltQuat: THREE.Quaternion[] = [];
  const beltScale = new Float32Array(BELT_N);
  {
    const gauss = () => Math.random() + Math.random() + Math.random() - 1.5;
    for (let i = 0; i < BELT_N; i++) {
      const au = 2.1 + Math.pow(Math.random(), 1.15) * 1.3;
      beltR[i] = auToScene(au);
      beltY[i] = gauss() * 1.5;
      beltPhase[i] = Math.random() * Math.PI * 2;
      beltPeriod[i] = 365.25 * Math.pow(au, 1.5); // Kepler's third law
      beltQuat.push(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        )
      );
      beltScale[i] = 0.35 + Math.pow(Math.random(), 2) * 1.5;
    }
  }
  {
    const KN = 2400;
    const pos = new Float32Array(KN * 3);
    for (let i = 0; i < KN; i++) {
      const au = 30 + Math.random() * 18;
      const rr = auToScene(au);
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * rr;
      pos[i * 3 + 1] = (Math.random() + Math.random() - 1) * 5;
      pos[i * 3 + 2] = -Math.sin(a) * rr;
    }
    const g = track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = track(
      new THREE.PointsMaterial({
        size: 1.5,
        sizeAttenuation: false,
        color: 0x6d7f94,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    beltGroup.add(new THREE.Points(g, m));
  }
  /* ── simulation + interaction state ── */
  let api: SolarEngine;
  let simDays = daysNow();
  let paused = initial.paused;
  let speed = initial.speed;
  let showOrbits = true;
  let showLabels = true;
  let showBelt = true;
  let selectedId: string | null = null;
  let readySent = false;
  let disposed = false;

  const moonParent = new Map<string, string>();
  for (const p of PLANETS) for (const m of p.moons) moonParent.set(m.id, p.id);

  const prevTarget = new THREE.Vector3();
  const curTarget = new THREE.Vector3();
  const curOffset = new THREE.Vector3();
  const followDelta = new THREE.Vector3();
  const worldPos = new THREE.Vector3();
  const ORIGIN = new THREE.Vector3(0, 0, 0);

  let flight: {
    t: number;
    dur: number;
    startOffset: THREE.Vector3;
    endOffset: THREE.Vector3;
    startTarget: THREE.Vector3;
  } | null = null;
  let homeFlight: { t: number; dur: number; fromCam: THREE.Vector3; fromTarget: THREE.Vector3 } | null = null;

  function refreshLabels() {
    const selParent = moonParent.get(selectedId ?? '');
    for (const [id, rec] of labelEls) {
      let visible = showLabels;
      if (rec.group.startsWith('moons:')) {
        const parent = rec.group.slice(6);
        visible = showLabels && (selectedId === parent || selectedId === id || selParent === parent);
      } else if (selectedId) {
        // focused: only the selected body (or the parent of a selected moon) keeps its label
        visible = showLabels && (id === selectedId || id === selParent);
      }
      rec.el.style.display = visible ? '' : 'none';
      rec.el.style.color = id === selectedId ? '#c8a94c' : 'rgba(255,255,255,0.55)';
    }
  }

  function refreshOrbits() {
    const selParent = moonParent.get(selectedId ?? '');
    for (const o of orbitLines) {
      o.line.visible = showOrbits;
      const mat = o.line.material as THREE.LineBasicMaterial;
      if (!selectedId) {
        mat.opacity = o.baseOpacity;
      } else if (o.id === selectedId) {
        mat.opacity = Math.min(0.9, o.baseOpacity * 2.9);
      } else if (moonParent.get(o.id) === selectedId || o.id === selParent || moonParent.get(o.id) === selParent) {
        mat.opacity = o.baseOpacity; // sibling moons of the focused system stay readable
      } else {
        mat.opacity = 0.06; // everything else recedes
      }
    }
  }

  function select(id: string) {
    const rec = bodyMap.get(id);
    if (!rec) return;
    selectedId = id;
    homeFlight = null;
    rec.obj.getWorldPosition(worldPos);
    prevTarget.copy(worldPos);
    const dir = camera.position.clone().sub(worldPos);
    if (dir.lengthSq() < 1e-6) dir.set(0.4, 0.35, 0.85);
    dir.normalize();
    if (dir.y < 0.26) dir.y = 0.26;
    dir.normalize();
    const endDist = id === 'sun' ? rec.radius * 4.2 : Math.max(rec.radius * 6.5, rec.radius + 4);
    flight = {
      t: 0,
      dur: 1.4,
      startOffset: camera.position.clone().sub(worldPos),
      endOffset: dir.multiplyScalar(endDist),
      startTarget: controls.target.clone(),
    };
    controls.enabled = false;
    cb.onSelect(id);
    refreshLabels();
    refreshOrbits();
  }

  function deselect() {
    selectedId = null;
    flight = null;
    controls.enabled = true;
    cb.onSelect(null);
    refreshLabels();
    refreshOrbits();
  }

  function resetView() {
    selectedId = null;
    flight = null;
    cb.onSelect(null);
    homeFlight = { t: 0, dur: 1.5, fromCam: camera.position.clone(), fromTarget: controls.target.clone() };
    controls.enabled = false;
    refreshLabels();
    refreshOrbits();
  }

  /* ── picking ── */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let downX = 0;
  let downY = 0;
  let downT = 0;
  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
    downT = performance.now();
  };
  const onPointerUp = (e: PointerEvent) => {
    const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moved > 7 || performance.now() - downT > 600) return;
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(rayTargets, false);
    if (hits.length > 0) {
      const id = hits[0].object.userData.bodyId as string;
      if (id) select(id);
    }
  };
  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointerup', onPointerUp);

  /* ── keyboard ── */
  const onKey = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      cb.onTogglePause();
    } else if (e.code === 'Escape') {
      deselect();
    } else if (e.key === 'r' || e.key === 'R') {
      resetView();
    }
  };
  window.addEventListener('keydown', onKey);

  /* ── resize ── */
  const ro = new ResizeObserver(() => {
    width = mount.clientWidth;
    height = mount.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    labelRenderer.setSize(width, height);
  });
  ro.observe(mount);

  /* ── main loop ── */
  const clock = new THREE.Clock();
  const beltM = new THREE.Matrix4();
  const beltPos = new THREE.Vector3();
  const beltS = new THREE.Vector3();
  let dateAcc = 1;
  let raf = 0;

  function emitDate() {
    const d = new Date(J2000_MS + simDays * DAY_MS);
    const dateStr =
      d.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }) +
      ' · ' +
      d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) +
      ' UTC';
    const delta = simDays - daysNow();
    const ad = Math.abs(delta);
    let deltaStr: string;
    if (ad < 0.02) deltaStr = 'LIVE — REAL SKY';
    else {
      const sign = delta > 0 ? 'T+' : 'T−';
      if (ad < 1) deltaStr = `${sign}${(ad * 24).toFixed(1)} HR`;
      else if (ad < 365.25) deltaStr = `${sign}${ad < 10 ? ad.toFixed(1) : Math.round(ad)} DAYS`;
      else deltaStr = `${sign}${(ad / 365.25).toFixed(1)} YEARS`;
    }
    cb.onDate(dateStr, deltaStr);
  }

  function animate() {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!paused) simDays += speed * dt;
    sunUniforms.uTime.value += dt; // the Sun keeps boiling even when time is frozen

    const TAU = Math.PI * 2;
    for (const p of planetsRT) {
      keplerPosition(p.elements, simDays, tmpV);
      p.anchor.position.copy(tmpV);
      const spin = ((simDays * 24) / p.rotationHours) * TAU;
      p.spin.rotation.y = spin % TAU;
      if (p.clouds) p.clouds.rotation.y = (spin * 1.08) % TAU;
      for (const m of p.moons) {
        m.pivot.rotation.y = (m.pivot.userData.phase + (simDays / m.periodDays) * TAU) % TAU;
      }
    }

    if (showBelt) {
      for (let i = 0; i < BELT_N; i++) {
        const ang = beltPhase[i] + (simDays / beltPeriod[i]) * TAU;
        beltPos.set(Math.cos(ang) * beltR[i], beltY[i], -Math.sin(ang) * beltR[i]);
        beltM.compose(beltPos, beltQuat[i], beltS.setScalar(beltScale[i]));
        beltMesh.setMatrixAt(i, beltM);
      }
      beltMesh.instanceMatrix.needsUpdate = true;
    }

    /* camera follow / flights */
    if (selectedId) {
      const rec = bodyMap.get(selectedId);
      if (rec) {
        rec.obj.getWorldPosition(worldPos);
        if (flight) {
          flight.t += dt;
          const k = easeInOutCubic(Math.min(1, flight.t / flight.dur));
          curTarget.lerpVectors(flight.startTarget, worldPos, k);
          curOffset.lerpVectors(flight.startOffset, flight.endOffset, k);
          camera.position.copy(curTarget).add(curOffset);
          controls.target.copy(curTarget);
          if (flight.t >= flight.dur) {
            flight = null;
            controls.enabled = true;
          }
        } else {
          followDelta.subVectors(worldPos, prevTarget);
          camera.position.add(followDelta);
          controls.target.copy(worldPos);
        }
        prevTarget.copy(worldPos);
      }
    }
    if (homeFlight) {
      homeFlight.t += dt;
      const k = easeInOutCubic(Math.min(1, homeFlight.t / homeFlight.dur));
      camera.position.lerpVectors(homeFlight.fromCam, HOME_CAM, k);
      controls.target.lerpVectors(homeFlight.fromTarget, ORIGIN, k);
      if (homeFlight.t >= homeFlight.dur) {
        homeFlight = null;
        controls.enabled = true;
      }
    }

    controls.update();
    composer.render();
    labelRenderer.render(scene, camera);

    dateAcc += dt;
    if (dateAcc > 0.15) {
      dateAcc = 0;
      emitDate();
    }
    if (!readySent) {
      readySent = true;
      cb.onReady();
    }
  }
  refreshLabels();
  refreshOrbits();
  animate();

  api = {
    select: (id) => (id ? select(id) : deselect()),
    resetView,
    resetToday: () => {
      simDays = daysNow();
      emitDate();
    },
    setPaused: (p) => {
      paused = p;
    },
    setSpeed: (v) => {
      speed = v;
    },
    setOrbits: (on) => {
      showOrbits = on;
      refreshOrbits();
    },
    setLabels: (on) => {
      showLabels = on;
      refreshLabels();
    },
    setBelt: (on) => {
      showBelt = on;
      beltGroup.visible = on;
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('keydown', onKey);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      disposables.forEach((d) => d.dispose());
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      if (labelRenderer.domElement.parentElement === mount) mount.removeChild(labelRenderer.domElement);
    },
  };
  return api;
}

/* ═════════════════════════ React component / HUD ════════════════════════ */
/* Geometry (position/size) is set with inline styles — deterministic across
   zoom levels, motion transforms, and utility-class edge cases. Tailwind is
   used only for typography and color. */

const RAIL_BODIES = [{ id: 'sun', short: 'SUN', name: SUN.name }].concat(
  PLANETS.map((p) => ({ id: p.id, short: p.short, name: p.name }))
);

const PANEL_BG: CSSProperties = {
  background: 'rgba(9, 9, 11, 0.88)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
};

function HudToggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`font-mono text-[10px] tracking-[0.22em] px-2 py-1 transition-colors ${
        on ? 'text-primary' : 'text-white/30 hover:text-white/60'
      }`}
    >
      {label}
    </button>
  );
}

export default function SolarSystem() {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<SolarEngine | null>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const deltaRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);
  const isMobile = useIsMobile();

  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paused, setPaused] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [dir, setDir] = useState<1 | -1>(1);
  const [speedIdx, setSpeedIdx] = useState(DEFAULT_SPEED_IDX);
  const [orbits, setOrbits] = useState(true);
  const [labels, setLabels] = useState(true);
  const [belt, setBelt] = useState(true);

  pausedRef.current = paused;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let engine: SolarEngine | null = null;
    // defer one tick so the boot veil paints before texture generation blocks
    const timer = window.setTimeout(() => {
      engine = createSolarEngine(
        mount,
        {
          onSelect: (id) => setSelectedId(id),
          onDate: (d, dl) => {
            if (dateRef.current) dateRef.current.textContent = d;
            if (deltaRef.current) deltaRef.current.textContent = dl;
          },
          onReady: () => setReady(true),
          onTogglePause: () => setPaused((p) => !p),
        },
        { paused: pausedRef.current, speed: SPEEDS[DEFAULT_SPEED_IDX].v }
      );
      engineRef.current = engine;
    }, 30);
    return () => {
      window.clearTimeout(timer);
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => { engineRef.current?.setPaused(paused); }, [paused]);
  useEffect(() => { engineRef.current?.setSpeed(SPEEDS[speedIdx].v * dir); }, [speedIdx, dir]);
  useEffect(() => { engineRef.current?.setOrbits(orbits); }, [orbits]);
  useEffect(() => { engineRef.current?.setLabels(labels); }, [labels]);
  useEffect(() => { engineRef.current?.setBelt(belt); }, [belt]);

  const selectBody = useCallback((id: string | null) => {
    engineRef.current?.select(id);
  }, []);

  const info = selectedId ? bodyInfo(selectedId) : null;

  /* deterministic HUD geometry */
  const panelStyle: CSSProperties = isMobile
    ? { ...PANEL_BG, position: 'absolute', left: 10, right: 10, bottom: 118, maxHeight: '42%', zIndex: 30, overflowY: 'auto', padding: 16 }
    : { ...PANEL_BG, position: 'absolute', right: 24, top: 88, width: 300, maxHeight: 'calc(100% - 150px)', zIndex: 30, overflowY: 'auto', padding: 20 };

  const barStyle: CSSProperties = {
    ...PANEL_BG,
    position: 'absolute',
    bottom: isMobile ? 10 : 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
    maxWidth: '96vw',
    padding: isMobile ? '6px 10px' : '8px 16px',
  };

  return (
    <>
      <SEOHead
        title="Solar System — Live Orbital Simulator"
        description="A real-time 3D ephemeris of the solar system. Kepler's equation solved every frame against JPL J2000 orbital elements — planets shown where they actually are right now. Built with Three.js, WebGL and GLSL; every surface procedurally generated."
      />

      <div className="relative w-full overflow-hidden bg-black" style={{ height: 'calc(100dvh - 4rem)' }}>
        <div ref={mountRef} className="absolute inset-0" style={{ zIndex: 0 }} />

        {/* boot veil */}
        <AnimatePresence>
          {!ready && (
            <motion.div
              key="boot"
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-4"
              style={{ zIndex: 50 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="font-mono text-[11px] tracking-[0.35em] text-white/50">INITIALIZING EPHEMERIS</p>
              <p className="font-mono text-[9px] tracking-[0.3em] text-white/25 text-center px-6">
                SOLVING KEPLER · GENERATING WORLDS · J2000 ELEMENTS
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* header block — hidden on mobile while the info sheet is open */}
        {!(isMobile && info) && (
          <div style={{ position: 'absolute', top: 14, left: isMobile ? 16 : 32, zIndex: 10, pointerEvents: 'none' }}>
            <Link
              to="/portfolio"
              style={{ pointerEvents: 'auto' }}
              className="font-mono text-[10px] tracking-[0.25em] text-white/35 hover:text-primary transition-colors"
            >
              ← BACK TO WORK
            </Link>
            <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-primary">LAB — 001</p>
            <h1 className="font-serif-display italic text-2xl md:text-4xl text-foreground leading-tight">
              Solar System
            </h1>
            {!isMobile && (
              <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-white/35">
                REAL-TIME KEPLERIAN EPHEMERIS · JPL J2000 ELEMENTS
              </p>
            )}
          </div>
        )}

        {/* body picker — vertical rail on desktop, chip row on mobile */}
        {isMobile ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 70,
              zIndex: 20,
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              padding: '0 12px',
            }}
            className="no-scrollbar"
          >
            {RAIL_BODIES.map((b) => (
              <button
                key={b.id}
                onClick={() => selectBody(selectedId === b.id ? null : b.id)}
                style={{ ...PANEL_BG, flexShrink: 0, borderRadius: 999, padding: '5px 12px' }}
                className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                  selectedId === b.id ? 'text-primary' : 'text-white/55'
                }`}
              >
                {b.short}
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {RAIL_BODIES.map((b) => (
              <button
                key={b.id}
                onClick={() => selectBody(selectedId === b.id ? null : b.id)}
                title={b.name}
                className={`font-mono text-[11px] tracking-[0.25em] text-left px-3 py-1.5 border-l transition-colors ${
                  selectedId === b.id
                    ? 'text-primary border-primary'
                    : 'text-white/35 border-white/10 hover:text-white hover:border-white/40'
                }`}
              >
                {b.short}
              </button>
            ))}
          </div>
        )}

        {/* info panel — right column on desktop, bottom sheet on mobile */}
        <AnimatePresence>
          {info && (
            <motion.aside
              key={selectedId}
              initial={{ opacity: 0, y: isMobile ? 24 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isMobile ? 24 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={panelStyle}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: info.color }} />
                  <p className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase truncate">{info.type}</p>
                </div>
                <button
                  onClick={() => selectBody(null)}
                  aria-label="Close"
                  className="font-mono text-white/40 hover:text-primary transition-colors text-sm leading-none px-1"
                >
                  ✕
                </button>
              </div>
              <h2 className="font-serif-display text-3xl md:text-4xl text-foreground mt-2 leading-none">{info.name}</h2>
              <div className="border-t border-white/10 my-3 md:my-4" />
              <dl className={isMobile ? 'grid grid-cols-2 gap-x-6 gap-y-1.5' : 'space-y-2'}>
                {info.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase">{k}</dt>
                    <dd className="font-mono text-[11px] md:text-xs text-foreground text-right whitespace-nowrap">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-sans-body text-[13px] md:text-sm text-white/70 leading-relaxed mt-3 md:mt-4">
                {info.fact}
              </p>
              {!isMobile && (
                <button
                  onClick={() => selectBody(null)}
                  className="mt-5 w-full font-mono text-[10px] tracking-[0.25em] text-white/50 border border-white/15 rounded px-3 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  RELEASE FOCUS — ESC
                </button>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* control bar */}
        <div style={barStyle}>
          <div className="flex items-center gap-1.5 md:gap-3 flex-nowrap">
            <button
              onClick={() => setSpeedIdx((i) => Math.max(0, i - 1))}
              aria-label="Slower"
              className="p-1.5 rounded text-white/60 hover:text-primary transition-colors"
            >
              <Rewind size={14} />
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play' : 'Pause'}
              className="p-1.5 rounded text-foreground hover:text-primary transition-colors"
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <button
              onClick={() => setSpeedIdx((i) => Math.min(SPEEDS.length - 1, i + 1))}
              aria-label="Faster"
              className="p-1.5 rounded text-white/60 hover:text-primary transition-colors"
            >
              <FastForward size={14} />
            </button>
            {!isMobile && (
              <button
                onClick={() => setDir((d) => (d === 1 ? -1 : 1))}
                aria-pressed={dir === -1}
                className={`font-mono text-[10px] tracking-[0.2em] px-2 py-1 rounded transition-colors ${
                  dir === -1 ? 'text-primary' : 'text-white/30 hover:text-white/60'
                }`}
              >
                REV
              </button>
            )}
            {!isMobile && (
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 text-center" style={{ minWidth: 68 }}>
                {SPEEDS[speedIdx].label}
              </span>
            )}

            <span style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)' }} />

            <div className="flex flex-col items-center leading-tight" style={{ minWidth: isMobile ? 128 : 168 }}>
              <span ref={dateRef} className="font-mono text-[10px] md:text-xs text-foreground tabular-nums whitespace-nowrap" />
              <span ref={deltaRef} className="font-mono text-[8px] md:text-[9px] tracking-[0.18em] text-primary/80 whitespace-nowrap" />
            </div>
            <button
              onClick={() => engineRef.current?.resetToday()}
              className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/50 border border-white/15 rounded px-2 py-1 hover:border-primary hover:text-primary transition-colors"
            >
              TODAY
            </button>

            {!isMobile && (
              <>
                <span style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)' }} />
                <div className="flex items-center">
                  <HudToggle label="ORBITS" on={orbits} onClick={() => setOrbits((v) => !v)} />
                  <HudToggle label="LABELS" on={labels} onClick={() => setLabels((v) => !v)} />
                  <HudToggle label="BELT" on={belt} onClick={() => setBelt((v) => !v)} />
                </div>
              </>
            )}
            <button
              onClick={() => engineRef.current?.resetView()}
              aria-label="Reset view"
              className="p-1.5 rounded text-white/60 hover:text-primary transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* hint — desktop only */}
        {!isMobile && (
          <p
            style={{ position: 'absolute', bottom: 24, right: 32, zIndex: 10 }}
            className="font-mono text-[9px] tracking-[0.25em] text-white/20"
          >
            DRAG — ORBIT · SCROLL — ZOOM · CLICK — FOCUS · SPACE — PAUSE
          </p>
        )}
      </div>

      {/* build notes */}
      <section className="bg-black border-t border-white/[0.06] px-5 md:px-8 lg:px-16 py-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">HOW THIS IS BUILT</p>
        <p className="font-sans-body text-sm text-white/60 leading-relaxed max-w-2xl">
          This is a live ephemeris, not an animation. Every frame, Kepler's equation is solved by
          Newton–Raphson iteration against JPL J2000 orbital elements — eccentricity, inclination and
          orbital phase are real, so the planets sit where they actually are for the simulated date
          (valid 1800–2050 AD). Every surface, ring and cloud layer is procedurally generated from
          seeded noise at load — the page ships zero image assets. Distances compress on a power
          curve and radii sit on a cube-root scale so all eight planets stay visible at once.
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/35 mt-4">
          THREE.JS · WEBGL · GLSL SHADERS · CUSTOM KEPLER SOLVER · PROCEDURAL TEXTURES · REACT + TYPESCRIPT ·{' '}
          <a
            href="https://github.com/macraemyintminhein98/macraemyint-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-primary transition-colors"
          >
            VIEW SOURCE →
          </a>
        </p>
      </section>
    </>
  );
}
