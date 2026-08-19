import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TechOrbit() {
  const orbit1 = useRef();
  const orbit2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbit1.current) {
      orbit1.current.rotation.z = t * 0.15;
      orbit1.current.rotation.x = Math.sin(t * 0.2) * 0.1 + 0.2;
    }
    if (orbit2.current) {
      orbit2.current.rotation.z = -t * 0.12;
      orbit2.current.rotation.y = Math.cos(t * 0.2) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -0.8]}>
      {/* Outer Orbit Ring */}
      <group ref={orbit1}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[3.0, 0.009, 16, 100]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} />
        </mesh>
        {/* Orbital Node */}
        <mesh position={[3.0, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </group>

      {/* Inner Orbit Ring */}
      <group ref={orbit2}>
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.3, 0.008, 16, 100]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.2} />
        </mesh>
        {/* Orbital Node */}
        <mesh position={[-2.3, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>
      </group>
    </group>
  );
}
