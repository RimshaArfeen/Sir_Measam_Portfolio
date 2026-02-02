"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";
extend({ UnrealBloomPass });

const NODES = 80;
const CONNECT_THRESHOLD = 2.2;

const SCENE_COLORS = {
  nodePrimary: new THREE.Color(0.45, 0.85, 0.9),
  nodeSecondary: new THREE.Color(0.9, 0.75, 0.4),
  lineColor: new THREE.Color(0.3, 0.6, 0.7),
  ambient: 0.25,
  pointLight: 0.6,
};

function useSceneColors() {
  return SCENE_COLORS;
}

function useMouseRef() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

function NetworkNodes({
  colors,
  initialPos,
}: {
  colors: ReturnType<typeof useSceneColors>;
  initialPos: Float32Array;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { nodePrimary } = colors;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.15;
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    for (let i = 0; i < NODES; i++) {
      const ix = i * 3;
      pos.set(
        initialPos[ix] + Math.sin(time + i * 0.1) * 0.08,
        initialPos[ix + 1] + Math.cos(time * 0.7 + i * 0.07) * 0.08,
        initialPos[ix + 2] + Math.sin(time * 0.5 + i * 0.05) * 0.05
      );
      matrix.setPosition(pos);
      meshRef.current.setMatrixAt(i, matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODES]}>
      <sphereGeometry args={[0.04, 8, 6]} />
      <meshBasicMaterial color={nodePrimary} />
    </instancedMesh>
  );
}

function NetworkLines({
  colors,
  initialPos,
}: {
  colors: ReturnType<typeof useSceneColors>;
  initialPos: Float32Array;
}) {
  const { lineColor } = colors;
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < NODES; i++) {
      const ax = initialPos[i * 3];
      const ay = initialPos[i * 3 + 1];
      const az = initialPos[i * 3 + 2];
      for (let j = i + 1; j < NODES; j++) {
        const bx = initialPos[j * 3];
        const by = initialPos[j * 3 + 1];
        const bz = initialPos[j * 3 + 2];
        if (Math.hypot(ax - bx, ay - by, az - bz) < CONNECT_THRESHOLD) {
          points.push(ax, ay, az, bx, by, bz);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [initialPos]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={lineColor} transparent opacity={0.25} />
    </lineSegments>
  );
}

function BloomPass() {
  const { size } = useThree();
  const resolution = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size.width, size.height]
  );
  return (
    // @ts-expect-error extended primitive
    <unrealBloomPass args={[resolution, 0.35, 0.4, 0.85]} />
  );
}

function HeroSceneInner() {
  const colors = useSceneColors();
  const mouseRef = useMouseRef();
  const groupRef = useRef<THREE.Group>(null);
  const [initialPos] = useState(() => {
    const p = new Float32Array(NODES * 3);
    for (let i = 0; i < NODES; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  });

  useFrame(() => {
    if (!groupRef.current) return;
    const mx = mouseRef.current.x * 0.4;
    const my = mouseRef.current.y * 0.4;
    groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <>
      <ambientLight intensity={colors.ambient} />
      <pointLight position={[4, 4, 4]} intensity={colors.pointLight} decay={2} />
      <pointLight
        position={[-3, -2, 2]}
        intensity={0.3}
        color={colors.nodeSecondary}
      />
      <group ref={groupRef}>
        <NetworkNodes colors={colors} initialPos={initialPos} />
        <NetworkLines colors={colors} initialPos={initialPos} />
      </group>
      <Effects>
        <BloomPass />
      </Effects>
    </>
  );
}

/* --------------------------------------------------------------------------
   Scene wrapper: theme-aware, full-screen hero background
   -------------------------------------------------------------------------- */
export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full min-h-screen">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <HeroSceneInner />
      </Canvas>
    </div>
  );
}
