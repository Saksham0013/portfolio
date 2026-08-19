import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import FloatingLaptop from './FloatingLaptop';
import FloatingTech from './FloatingTech';
import TechOrbit from './TechOrbit';
import Particles from './Particles';

// Camera & Scene Mouse Parallax Rig
function Rig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Smooth lerp camera position based on pointer - Close-up for Large Prominent 3D Object
    camera.position.lerp(
      vec.set(pointer.x * 0.35, 0.2 + pointer.y * 0.25, 2.6),
      0.05
    );
    camera.lookAt(0.05, 0.05, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="hero-scene-container" style={{ width: '100%', height: '100%', minHeight: '520px' }}>
      <Canvas
        camera={{ position: [0, 0.2, 2.6], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-3, 2.5, 2]} intensity={3.5} color="#00F0FF" distance={10} />
          <pointLight position={[3, -1.5, 2]} intensity={2.8} color="#A855F7" distance={10} />
          <pointLight position={[0, -2, 2.5]} intensity={2.0} color="#22C55E" distance={8} />

          {/* 3D Floating Scene Elements - 2.5x to 3x LARGER VISUAL SCALE */}
          <FloatingLaptop position={[0.05, -0.1, 0]} scale={1.4} />
          <FloatingTech />
          <TechOrbit />
          <Particles count={150} color="#00F0FF" />
          <Particles count={90} color="#A855F7" />

          {/* Mouse Parallax Rig */}
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}
