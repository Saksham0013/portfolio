import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function TechBadge({ label, color, initialPos, speed = 1, rotationSpeed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * rotationSpeed;
    meshRef.current.rotation.y = Math.cos(t * 0.4) * rotationSpeed;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Float speed={speed * 1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={initialPos}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Glow Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.4, 0.012, 16, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.65} />
        </mesh>

        {/* 3D Label */}
        <Text
          position={[0, -0.48, 0]}
          fontSize={0.16}
          color="#F8FAFC"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

// React Atom Ring Component
function ReactAtom({ position = [0, 0, 0] }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.x = t * 1.2;
    if (ring2.current) ring2.current.rotation.y = t * 1.0;
    if (ring3.current) ring3.current.rotation.z = t * 0.8;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.0}>
      <group position={position} scale={0.58}>
        {/* Core */}
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.85}
            roughness={0.1}
          />
        </mesh>

        {/* Orbit Rings */}
        <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.6, 0.016, 16, 64]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.75} />
        </mesh>
        <mesh ref={ring2} rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.6, 0.016, 16, 64]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.75} />
        </mesh>
        <mesh ref={ring3} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.6, 0.016, 16, 64]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.75} />
        </mesh>

        <Text
          position={[0, -0.75, 0]}
          fontSize={0.19}
          color="#00F0FF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          React
        </Text>
      </group>
    </Float>
  );
}

export default function FloatingTech() {
  return (
    <group>
      {/* React Atom (Top Left) */}
      <ReactAtom position={[-2.1, 1.2, 0.2]} />

      {/* Node.js (Top Right) */}
      <TechBadge
        label="Node.js"
        color="#22C55E"
        initialPos={[2.1, 1.3, -0.2]}
        speed={1.2}
      />

      {/* MongoDB (Bottom Left) */}
      <TechBadge
        label="MongoDB"
        color="#10B981"
        initialPos={[-2.0, -1.1, 0.5]}
        speed={0.9}
      />

      {/* Express (Bottom Right) */}
      <TechBadge
        label="Express"
        color="#A855F7"
        initialPos={[2.0, -1.0, 0.3]}
        speed={1.1}
      />
    </group>
  );
}
