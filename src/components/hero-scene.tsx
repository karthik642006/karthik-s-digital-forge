import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points as ThreePoints } from "three";

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const targetX = reducedMotion ? 0 : pointer.x * 0.34;
    const targetY = reducedMotion ? 0 : pointer.y * 0.2;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (inner.current) {
      inner.current.rotation.x = state.clock.elapsedTime * 0.18;
      inner.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial color="#0b1822" wireframe emissive="#05d9ff" emissiveIntensity={0.28} />
        </mesh>
        <mesh scale={0.72}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#38d8f5" metalness={0.8} roughness={0.18} emissive="#047ca0" emissiveIntensity={0.7} />
        </mesh>
      </Float>
      {[1.9, 2.6, 3.25].map((radius, index) => (
        <Orbit key={radius} radius={radius} speed={(index + 1) * 0.11} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

function Orbit({ radius, speed, reducedMotion }: { radius: number; speed: number; reducedMotion: boolean }) {
  const node = useRef<Group>(null);
  const points = useMemo(() => {
    return Array.from({ length: 65 }, (_, index) => {
      const angle = (index / 64) * Math.PI * 2;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.44, Math.sin(angle) * 0.22] as [number, number, number];
    });
  }, [radius]);

  useFrame((_, delta) => {
    if (!reducedMotion && node.current) node.current.rotation.z += delta * speed;
  });

  return (
    <group ref={node} rotation={[0.45, radius * 0.18, radius * 0.22]}>
      <Line points={points} color="#169fba" transparent opacity={0.25} lineWidth={0.7} />
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#b8f5ff" />
      </mesh>
    </group>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(240 * 3);
    for (let index = 0; index < 240; index += 1) {
      const angle = index * 2.39996;
      const radius = 1.8 + ((index * 37) % 100) / 22;
      data[index * 3] = Math.cos(angle) * radius;
      data[index * 3 + 1] = (((index * 53) % 100) / 100 - 0.5) * 6;
      data[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!reducedMotion && points.current) points.current.rotation.y += delta * 0.018;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#56dff7" size={0.018} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
}

export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.4], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 4, 5]} intensity={16} color="#4ee3ff" />
        <pointLight position={[-4, -2, 2]} intensity={8} color="#1c70ff" />
        <Core reducedMotion={reducedMotion} />
        <ParticleField reducedMotion={reducedMotion} />
        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}