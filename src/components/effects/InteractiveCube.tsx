import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function InteractiveCube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.5, 2, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Controls ───────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.6;
    controls.minDistance = 2.5;
    controls.maxDistance = 9;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enablePan = false;

    // ── Cube body ──────────────────────────────────────────────────
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshPhongMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.55,
      shininess: 40,
    });
    const cube = new THREE.Mesh(boxGeo, boxMat);
    scene.add(cube);

    // Gold wireframe edges
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xc9a84c });
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), edgesMat);
    cube.add(wireframe);

    // ── Inner glow face ────────────────────────────────────────────
    const innerGeo = new THREE.BoxGeometry(1.96, 1.96, 1.96);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // ── Corner spheres ─────────────────────────────────────────────
    const cornerPositions = [
      [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [-1, 1,  1], [1, 1,  1],
    ];
    const dotGeo = new THREE.SphereGeometry(0.055, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xf0c060 });
    cornerPositions.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      cube.add(dot);
    });

    // ── Grid ───────────────────────────────────────────────────────
    const gridMat = new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.8 });
    const gridGeo = new THREE.BufferGeometry();
    const gridLines: number[] = [];
    for (let i = -5; i <= 5; i++) {
      gridLines.push(i, 0, -5, i, 0, 5);
      gridLines.push(-5, 0, i, 5, 0, i);
    }
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridLines, 3));
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    grid.position.y = -2.2;
    scene.add(grid);

    // ── Floating particles ─────────────────────────────────────────
    const PARTICLE_COUNT = 120;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pSpeeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      pSpeeds[i] = Math.random() * 0.002 + 0.0005;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Lights ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const goldLight = new THREE.PointLight(0xc9a84c, 3, 8);
    goldLight.position.set(3, 3, 3);
    scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x2244aa, 1.5, 8);
    blueLight.position.set(-3, -2, -3);
    scene.add(blueLight);

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      controls.update();

      // Pulse gold light
      goldLight.intensity = 2.5 + Math.sin(t * 1.5) * 0.5;

      // Slowly drift particles
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;

      // Grid subtle pulse
      (gridMat as THREE.LineBasicMaterial).opacity = 0.4 + Math.sin(t * 0.8) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing select-none" />
  );
}
