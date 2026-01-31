"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  AdditiveBlending,
} from "three";

const PARTICLE_COUNT = 100;
const GRADIENT_START = "#0f172a";
const GRADIENT_END = "#020617";

export function GlobalParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointsRef = useRef<Points | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);
  const mouseThrottleRef = useRef<number>(0);
  const initRef = useRef(false);

  const init = useCallback(() => {
    if (initRef.current || typeof window === "undefined") return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originals = new Float32Array(PARTICLE_COUNT * 3);
    const rand = () => (Math.random() - 0.5) * 18;
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      const x = rand();
      const y = rand();
      const z = rand();
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
      originals[i] = x;
      originals[i + 1] = y;
      originals[i + 2] = z;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    const material = new PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    (points as Points & { _originals?: Float32Array })._originals = originals;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    pointsRef.current = points;
    initRef.current = true;

    const handleResize = () => {
      const c = containerRef.current;
      const cam = cameraRef.current;
      const rend = rendererRef.current;
      if (!c || !cam || !rend) return;
      const w = c.clientWidth;
      const h = c.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      rend.setSize(w, h);
      rend.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 1.5));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottleRef.current) return;
      mouseThrottleRef.current = requestAnimationFrame(() => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseThrottleRef.current = 0;
      });
    };

    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    (window as unknown as { __globalParticleCleanup?: () => void }).__globalParticleCleanup = () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mouseThrottleRef.current) cancelAnimationFrame(mouseThrottleRef.current);
    };

    let time = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      time += 0.003;
      const pts = pointsRef.current;
      if (pts) {
        const pos = pts.geometry.attributes.position.array as Float32Array;
        const orig = (pts as Points & { _originals?: Float32Array })._originals;
        const mx = mouseRef.current.x * 0.15;
        const my = mouseRef.current.y * 0.15;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          const drift = Math.sin(i * 0.13 + time) * 0.04 + Math.cos(i * 0.09 + time * 1.2) * 0.03;
          if (orig) {
            pos[i3] = orig[i3] + drift + mx;
            pos[i3 + 1] = orig[i3 + 1] + Math.cos(i * 0.11 + time * 0.9) * 0.04 + my;
            pos[i3 + 2] = orig[i3 + 2] + Math.sin(i * 0.07 + time * 1.1) * 0.03;
          }
        }
        pts.geometry.attributes.position.needsUpdate = true;
        pts.rotation.y = time * 0.04 + mx * 0.08;
        pts.rotation.x = time * 0.02 + my * 0.08;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();
  }, []);

  useEffect(() => {
    const useIdle = typeof requestIdleCallback !== "undefined";
    const id = useIdle
      ? requestIdleCallback(() => init(), { timeout: 300 })
      : (setTimeout(init, 0) as unknown as number);
    const clear = () => (useIdle ? cancelIdleCallback(id) : clearTimeout(id));
    return () => {
      clear();
      initRef.current = false;
      cancelAnimationFrame(rafRef.current);
      const cleanup = (window as unknown as { __globalParticleCleanup?: () => void }).__globalParticleCleanup;
      if (cleanup) {
        cleanup();
        delete (window as unknown as { __globalParticleCleanup?: () => void }).__globalParticleCleanup;
      }
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as PointsMaterial).dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      pointsRef.current = null;
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
