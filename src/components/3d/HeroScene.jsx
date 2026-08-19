import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import FloatingLaptop from './FloatingLaptop';
import FloatingTech from './FloatingTech';
import TechOrbit from './TechOrbit';
import Particles from './Particles';

// Camera & Scene Mouse Parallax Rig - Perfect Center Framing
function Rig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Smooth lerp camera position based on pointer while keeping object centered
    camera.position.lerp(
      vec.set(pointer.x * 0.4, pointer.y * 0.3, 4.0),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="hero-scene-container" style={{ width: '100%', height: '100%', minHeight: '260px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Ambient & Directional Lighting for Crisp Contrast & Metallic Highlights */}
          <ambientLight intensity={1.1} />
          <directionalLight position={[5, 8, 5]} intensity={2.0} color="#FFFFFF" />

          {/* Dynamic Cyan & Purple Rim Lights */}
          <pointLight position={[-4, 3, 3]} intensity={4.2} color="#00F0FF" distance={14} />
          <pointLight position={[4, -2, 3]} intensity={3.6} color="#A855F7" distance={14} />
          <pointLight position={[0, -3, 3]} intensity={2.2} color="#22C55E" distance={10} />
          <pointLight position={[0, 4, 2]} intensity={2.0} color="#FFFFFF" distance={10} />

          {/* 3D Floating Scene Elements - PROMINENT, FULLY VISIBLE & CENTERED (0.7x scale) */}
          <group scale={0.7}>
            <FloatingLaptop position={[0, 0, 0]} scale={1} />
            <FloatingTech />
            <TechOrbit />
          </group>
          <Particles count={160} color="#00F0FF" />
          <Particles count={100} color="#A855F7" />

          {/* Mouse Parallax Rig */}
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}
