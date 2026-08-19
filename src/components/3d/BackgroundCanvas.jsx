import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Particles from './Particles';

function AmbientGeometry() {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.1;
      mesh1.current.rotation.y = t * 0.15;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y = -t * 0.08;
      mesh2.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group>
      {/* Subtle floating wireframe Icosahedron */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={mesh1} position={[-5, 2, -4]}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>

      {/* Subtle floating Torus Knot */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={mesh2} position={[5, -3, -5]}>
          <torusKnotGeometry args={[1.2, 0.25, 64, 16]} />
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function BackgroundCanvas() {
  return (
    <div
      className="global-3d-bg"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.75
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <AmbientGeometry />
          <Particles count={120} color="#38BDF8" />
        </Suspense>
      </Canvas>
    </div>
  );
}
