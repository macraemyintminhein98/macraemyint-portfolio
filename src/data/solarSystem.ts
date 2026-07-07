/**
 * Solar System dataset — real orbital mechanics, real physical data.
 *
 * Orbital elements are the JPL/Standish "approximate elements" (J2000 epoch,
 * valid 1800–2050 AD): [value at J2000, change per Julian century].
 * Angles in degrees, semi-major axis in AU.
 *
 * The engine solves Kepler's equation (Newton–Raphson) every frame, so the
 * planets on screen sit where they actually are for the simulated date.
 */

export const J2000_MS = 946728000000; // 2000-01-01T12:00:00Z

export type Elem = [number, number]; // [J2000 value, rate per Julian century]

export interface OrbitalElements {
  a: Elem; // semi-major axis (AU)
  e: Elem; // eccentricity
  i: Elem; // inclination (deg)
  L: Elem; // mean longitude (deg)
  lp: Elem; // longitude of perihelion (deg)
  node: Elem; // longitude of ascending node (deg)
}

export interface TextureSpec {
  kind: 'rocky' | 'gas' | 'earth' | 'venus' | 'ice';
  seed: number;
  palette: string[]; // dark → light stops
  craters?: number;
  caps?: { color: string; extent: number }; // polar caps, extent 0..1 from pole
  bands?: number; // band frequency for gas giants
  turbulence?: number;
  spot?: { u: number; v: number; ru: number; rv: number; color: string };
}

export interface MoonDef {
  id: string;
  name: string;
  radiusKm: number;
  periodDays: number;
  dist: number; // scene units from parent centre
  color: string;
  texture: TextureSpec;
  physical: { radiusKm: string; period: string; parent: string; type: string };
  fact: string;
}

export interface RingDef {
  kind: 'saturn' | 'uranus';
  inner: number; // × planet visual radius
  outer: number;
  opacity: number;
}

export interface PlanetDef {
  id: string;
  name: string;
  short: string; // 3-letter rail code
  color: string; // orbit line / label accent
  radiusKm: number;
  rotationHours: number; // signed — negative = retrograde
  axialTiltDeg: number;
  elements: OrbitalElements;
  texture: TextureSpec;
  ring?: RingDef;
  atmosphere?: { color: string; scale: number; intensity: number };
  clouds?: boolean;
  moons: MoonDef[];
  physical: {
    type: string;
    radiusKm: string;
    mass: string; // ×10²⁴ kg
    day: string;
    year: string;
    distance: string; // AU
    temp: string;
    moons: string;
    tilt: string;
  };
  fact: string;
}

/* ── scale model ───────────────────────────────────────────────────────────
 * True scale would make every planet sub-pixel, so:
 *  - distances compress on a power curve (au^0.7) — spacing stays honest
 *  - body radii sit on a cube-root scale — Jupiter still dwarfs Mercury
 * Orbit geometry (eccentricity, inclination, phase) is computed unscaled,
 * then compressed, so ellipse shape and real positions survive. */

export const SUN_RADIUS = 5;
export const auToScene = (au: number) => 18 * Math.pow(au, 0.78);
export const planetRadius = (km: number) => 0.11 * Math.cbrt(km);
export const moonRadius = (km: number) => Math.max(0.17, 0.062 * Math.cbrt(km));

export const SUN = {
  id: 'sun',
  name: 'The Sun',
  short: 'SUN',
  color: '#f6b64b',
  physical: {
    type: 'G2V main-sequence star',
    radiusKm: '696,340 km',
    mass: '1,989,000',
    day: '≈ 25.4 d (equator)',
    year: '≈ 230 Myr (galactic)',
    distance: '0 AU',
    temp: '5,505 °C surface',
    moons: '8 planets',
    tilt: '7.25°',
  },
  fact: "99.86% of the solar system's mass. It fuses roughly 600 million tons of hydrogen into helium every single second.",
};

export const PLANETS: PlanetDef[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    short: 'MER',
    color: '#9c8f7f',
    radiusKm: 2439.7,
    rotationHours: 1407.6,
    axialTiltDeg: 0.03,
    elements: {
      a: [0.38709927, 0.00000037],
      e: [0.20563593, 0.00001906],
      i: [7.00497902, -0.00594749],
      L: [252.2503235, 149472.67411175],
      lp: [77.45779628, 0.16047689],
      node: [48.33076593, -0.12534081],
    },
    texture: { kind: 'rocky', seed: 11, palette: ['#4d453c', '#7a6f61', '#a2988a', '#c7bcae'], craters: 90 },
    moons: [],
    physical: {
      type: 'Terrestrial',
      radiusKm: '2,439.7 km',
      mass: '0.330',
      day: '175.9 d (solar)',
      year: '88.0 d',
      distance: '0.39 AU',
      temp: '−173 to 427 °C',
      moons: '0',
      tilt: '0.03°',
    },
    fact: 'Its solar day outlasts its year — sunrise to sunrise takes 176 Earth days, while a full orbit takes just 88.',
  },
  {
    id: 'venus',
    name: 'Venus',
    short: 'VEN',
    color: '#dcb877',
    radiusKm: 6051.8,
    rotationHours: -5832.5,
    axialTiltDeg: 177.4,
    elements: {
      a: [0.72333566, 0.0000039],
      e: [0.00677672, -0.00004107],
      i: [3.39467605, -0.0007889],
      L: [181.9790995, 58517.81538729],
      lp: [131.60246718, 0.00268329],
      node: [76.67984255, -0.27769418],
    },
    texture: { kind: 'venus', seed: 23, palette: ['#8a6a3c', '#c19a5b', '#e0c07f', '#f2e3b3'], turbulence: 0.16 },
    atmosphere: { color: '#e8c987', scale: 1.03, intensity: 0.55 },
    moons: [],
    physical: {
      type: 'Terrestrial',
      radiusKm: '6,051.8 km',
      mass: '4.87',
      day: '243 d (retrograde)',
      year: '224.7 d',
      distance: '0.72 AU',
      temp: '464 °C',
      moons: '0',
      tilt: '177.4°',
    },
    fact: 'Spins backwards, so slowly that one rotation takes 243 Earth days — on Venus, the Sun rises in the west.',
  },
  {
    id: 'earth',
    name: 'Earth',
    short: 'EAR',
    color: '#5b9bd5',
    radiusKm: 6371,
    rotationHours: 23.93,
    axialTiltDeg: 23.44,
    elements: {
      a: [1.00000261, 0.00000562],
      e: [0.01671123, -0.00004392],
      i: [-0.00001531, -0.01294668],
      L: [100.46457166, 35999.37244981],
      lp: [102.93768193, 0.32327364],
      node: [0.0, 0.0],
    },
    texture: { kind: 'earth', seed: 7, palette: ['#0a2a4f', '#155d8f', '#2d6a2f', '#8a7a4a'] },
    atmosphere: { color: '#4a9eff', scale: 1.035, intensity: 1.0 },
    clouds: true,
    moons: [
      {
        id: 'moon',
        name: 'The Moon',
        radiusKm: 1737.4,
        periodDays: 27.32,
        dist: 5.4,
        color: '#b8b2a8',
        texture: { kind: 'rocky', seed: 41, palette: ['#5a564f', '#8b867c', '#b5afa4', '#d8d3c8'], craters: 70 },
        physical: { radiusKm: '1,737.4 km', period: '27.32 d', parent: 'Earth', type: 'Natural satellite' },
        fact: 'Drifting away from Earth at 3.8 cm per year — early on, it loomed 15× larger in the sky.',
      },
    ],
    physical: {
      type: 'Terrestrial',
      radiusKm: '6,371 km',
      mass: '5.97',
      day: '23.93 h',
      year: '365.25 d',
      distance: '1.00 AU',
      temp: '15 °C mean',
      moons: '1',
      tilt: '23.44°',
    },
    fact: 'The densest planet in the solar system — and the only confirmed address for life, anywhere.',
  },
  {
    id: 'mars',
    name: 'Mars',
    short: 'MAR',
    color: '#d1683f',
    radiusKm: 3389.5,
    rotationHours: 24.62,
    axialTiltDeg: 25.19,
    elements: {
      a: [1.52371034, 0.00001847],
      e: [0.0933941, 0.00007882],
      i: [1.84969142, -0.00813131],
      L: [-4.55343205, 19140.30268499],
      lp: [-23.94362959, 0.44441088],
      node: [49.55953891, -0.29257343],
    },
    texture: {
      kind: 'rocky',
      seed: 31,
      palette: ['#6e3420', '#a34c2a', '#c96b3c', '#e39a63'],
      craters: 40,
      caps: { color: '#f2ede4', extent: 0.1 },
    },
    atmosphere: { color: '#e8a06a', scale: 1.025, intensity: 0.35 },
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        radiusKm: 11.1,
        periodDays: 0.319,
        dist: 2.9,
        color: '#8a8078',
        texture: { kind: 'rocky', seed: 111, palette: ['#3a3631', '#5c564e', '#7d766c', '#9c948a'], craters: 14 },
        physical: { radiusKm: '11.1 km', period: '7.66 h', parent: 'Mars', type: 'Moon — likely captured asteroid' },
        fact: 'Orbits faster than Mars rotates, so it rises in the west — and it is spiraling inward, doomed to break apart in ~50 million years.',
      },
      {
        id: 'deimos',
        name: 'Deimos',
        radiusKm: 6.2,
        periodDays: 1.263,
        dist: 3.9,
        color: '#9a9288',
        texture: { kind: 'rocky', seed: 113, palette: ['#494540', '#6d675f', '#8f887d', '#aaa298'], craters: 8 },
        physical: { radiusKm: '6.2 km', period: '30.3 h', parent: 'Mars', type: 'Moon — likely captured asteroid' },
        fact: 'Escape velocity is about 5.6 m/s — a sprinting human could very nearly jump off it.',
      },
    ],
    physical: {
      type: 'Terrestrial',
      radiusKm: '3,389.5 km',
      mass: '0.642',
      day: '24.62 h',
      year: '687.0 d',
      distance: '1.52 AU',
      temp: '−65 °C mean',
      moons: '2',
      tilt: '25.19°',
    },
    fact: 'Home to Olympus Mons, a volcano nearly three times the height of Everest and as wide as France.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    short: 'JUP',
    color: '#d9a97c',
    radiusKm: 69911,
    rotationHours: 9.93,
    axialTiltDeg: 3.13,
    elements: {
      a: [5.202887, -0.00011607],
      e: [0.04838624, -0.00013253],
      i: [1.30439695, -0.00183714],
      L: [34.39644051, 3034.74612775],
      lp: [14.72847983, 0.21252668],
      node: [100.47390909, 0.20469106],
    },
    texture: {
      kind: 'gas',
      seed: 53,
      palette: ['#8c6a4c', '#c9a97e', '#e8d7b8', '#a5743f', '#ddc19a'],
      bands: 11,
      turbulence: 0.05,
      spot: { u: 0.62, v: 0.66, ru: 0.055, rv: 0.035, color: '#c4623e' },
    },
    moons: [
      {
        id: 'io',
        name: 'Io',
        radiusKm: 1821.6,
        periodDays: 1.77,
        dist: 7.3,
        color: '#e0c05a',
        texture: { kind: 'rocky', seed: 61, palette: ['#8a6a1f', '#c8a83b', '#e6d275', '#f4ecb8'], craters: 20 },
        physical: { radiusKm: '1,821.6 km', period: '1.77 d', parent: 'Jupiter', type: 'Galilean moon' },
        fact: 'The most volcanically active body in the solar system — hundreds of erupting volcanoes at any moment.',
      },
      {
        id: 'europa',
        name: 'Europa',
        radiusKm: 1560.8,
        periodDays: 3.55,
        dist: 8.8,
        color: '#cfc4b2',
        texture: { kind: 'ice', seed: 67, palette: ['#8a7f6d', '#c4b9a5', '#e6ded0', '#f7f3ea'] },
        physical: { radiusKm: '1,560.8 km', period: '3.55 d', parent: 'Jupiter', type: 'Galilean moon' },
        fact: 'Hides a global saltwater ocean beneath its ice shell — a prime target in the search for life.',
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        radiusKm: 2634.1,
        periodDays: 7.15,
        dist: 10.5,
        color: '#9a8f80',
        texture: { kind: 'rocky', seed: 71, palette: ['#4f4a42', '#7a7266', '#a59a89', '#cbc1b0'], craters: 45 },
        physical: { radiusKm: '2,634.1 km', period: '7.15 d', parent: 'Jupiter', type: 'Galilean moon' },
        fact: 'Larger than the planet Mercury — and the only moon known to generate its own magnetic field.',
      },
      {
        id: 'callisto',
        name: 'Callisto',
        radiusKm: 2410.3,
        periodDays: 16.69,
        dist: 12.4,
        color: '#7d7468',
        texture: { kind: 'rocky', seed: 73, palette: ['#3d3833', '#645c52', '#8d8375', '#b3a996'], craters: 110 },
        physical: { radiusKm: '2,410.3 km', period: '16.69 d', parent: 'Jupiter', type: 'Galilean moon' },
        fact: 'One of the most heavily cratered surfaces known — a four-billion-year-old record of impacts.',
      },
    ],
    physical: {
      type: 'Gas giant',
      radiusKm: '69,911 km',
      mass: '1,898',
      day: '9.93 h',
      year: '11.86 yr',
      distance: '5.20 AU',
      temp: '−110 °C',
      moons: '95',
      tilt: '3.13°',
    },
    fact: 'More than twice the mass of every other planet combined. The Great Red Spot has been raging for centuries.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    short: 'SAT',
    color: '#e3cf9d',
    radiusKm: 58232,
    rotationHours: 10.7,
    axialTiltDeg: 26.73,
    elements: {
      a: [9.53667594, -0.0012506],
      e: [0.05386179, -0.00050991],
      i: [2.48599187, 0.00193609],
      L: [49.95424423, 1222.49362201],
      lp: [92.59887831, -0.41897216],
      node: [113.66242448, -0.28867794],
    },
    texture: {
      kind: 'gas',
      seed: 83,
      palette: ['#b39158', '#d8bd87', '#efe0b4', '#c9a86a', '#e9d9a8'],
      bands: 9,
      turbulence: 0.03,
    },
    ring: { kind: 'saturn', inner: 1.35, outer: 2.35, opacity: 0.92 },
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        radiusKm: 2574.7,
        periodDays: 15.95,
        dist: 12.6,
        color: '#d3a75c',
        texture: { kind: 'venus', seed: 89, palette: ['#8a6432', '#c2924a', '#e0b76c', '#f0d79a'], turbulence: 0.1 },
        physical: { radiusKm: '2,574.7 km', period: '15.95 d', parent: 'Saturn', type: 'Moon — dense atmosphere' },
        fact: 'Rivers, lakes and seas of liquid methane flow beneath a thick orange haze — the only moon with a dense atmosphere.',
      },
    ],
    physical: {
      type: 'Gas giant',
      radiusKm: '58,232 km',
      mass: '568',
      day: '10.7 h',
      year: '29.4 yr',
      distance: '9.54 AU',
      temp: '−140 °C',
      moons: '274',
      tilt: '26.73°',
    },
    fact: 'The rings span 280,000 km edge to edge, yet in places are only about ten metres thick.',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    short: 'URA',
    color: '#9fd8dc',
    radiusKm: 25362,
    rotationHours: -17.24,
    axialTiltDeg: 97.77,
    elements: {
      a: [19.18916464, -0.00196176],
      e: [0.04725744, -0.00004397],
      i: [0.77263783, -0.00242939],
      L: [313.23810451, 428.48202785],
      lp: [170.9542763, 0.40805281],
      node: [74.01692503, 0.04240589],
    },
    texture: { kind: 'ice', seed: 97, palette: ['#4f9aa3', '#7cc3c9', '#a8dde0', '#d3f0f1'] },
    ring: { kind: 'uranus', inner: 1.5, outer: 1.85, opacity: 0.35 },
    moons: [],
    physical: {
      type: 'Ice giant',
      radiusKm: '25,362 km',
      mass: '86.8',
      day: '17.24 h (retrograde)',
      year: '84.0 yr',
      distance: '19.19 AU',
      temp: '−195 °C',
      moons: '28',
      tilt: '97.77°',
    },
    fact: 'Rolls around the Sun on its side — its axis is tipped 98°, so each pole gets 42 years of daylight, then 42 of night.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    short: 'NEP',
    color: '#5a7fd6',
    radiusKm: 24622,
    rotationHours: 16.11,
    axialTiltDeg: 28.32,
    elements: {
      a: [30.06992276, 0.00026291],
      e: [0.00859048, 0.00005105],
      i: [1.77004347, 0.00035372],
      L: [-55.12002969, 218.45945325],
      lp: [44.96476227, -0.32241464],
      node: [131.78422574, -0.00508664],
    },
    texture: {
      kind: 'gas',
      seed: 101,
      palette: ['#26418f', '#3a5cc0', '#5a7fd6', '#2f4aa0', '#7d9be6'],
      bands: 6,
      turbulence: 0.06,
      spot: { u: 0.3, v: 0.42, ru: 0.045, rv: 0.03, color: '#1d2f6e' },
    },
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        radiusKm: 1353.4,
        periodDays: -5.88,
        dist: 6.6,
        color: '#cfd8da',
        texture: { kind: 'ice', seed: 127, palette: ['#7e8a8c', '#a9b6b6', '#cdd8d6', '#eef4f1'] },
        physical: { radiusKm: '1,353.4 km', period: '5.88 d (retrograde)', parent: 'Neptune', type: 'Moon — captured Kuiper Belt object' },
        fact: 'Orbits backwards — the only large moon that does — almost certainly a captured Kuiper Belt world, with active geysers of nitrogen ice.',
      },
    ],
    physical: {
      type: 'Ice giant',
      radiusKm: '24,622 km',
      mass: '102',
      day: '16.11 h',
      year: '164.8 yr',
      distance: '30.07 AU',
      temp: '−200 °C',
      moons: '16',
      tilt: '28.32°',
    },
    fact: 'The fastest winds ever measured on a planet — supersonic gusts up to 2,100 km/h, powered by almost no sunlight.',
  },
];

export interface BodyInfo {
  name: string;
  type: string;
  rows: [string, string][];
  fact: string;
  color: string;
}

/** Flat lookup for the HUD info panel — planets, moons, and the Sun. */
export function bodyInfo(id: string): BodyInfo | null {
  if (id === 'sun') {
    return {
      name: SUN.name,
      type: SUN.physical.type,
      color: SUN.color,
      fact: SUN.fact,
      rows: [
        ['Radius', SUN.physical.radiusKm],
        ['Mass ×10²⁴ kg', SUN.physical.mass],
        ['Rotation', SUN.physical.day],
        ['Surface temp', SUN.physical.temp],
        ['Axial tilt', SUN.physical.tilt],
        ['Orbiting bodies', SUN.physical.moons],
      ],
    };
  }
  for (const p of PLANETS) {
    if (p.id === id) {
      return {
        name: p.name,
        type: p.physical.type,
        color: p.color,
        fact: p.fact,
        rows: [
          ['Radius', p.physical.radiusKm],
          ['Mass ×10²⁴ kg', p.physical.mass],
          ['Day length', p.physical.day],
          ['Year length', p.physical.year],
          ['Distance', p.physical.distance],
          ['Mean temp', p.physical.temp],
          ['Moons', p.physical.moons],
          ['Axial tilt', p.physical.tilt],
        ],
      };
    }
    for (const m of p.moons) {
      if (m.id === id) {
        return {
          name: m.name,
          type: m.physical.type,
          color: m.color,
          fact: m.fact,
          rows: [
            ['Radius', m.physical.radiusKm],
            ['Orbital period', m.physical.period],
            ['Orbits', m.physical.parent],
          ],
        };
      }
    }
  }
  return null;
}
