import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingLaptop({ position = [0, 0, 0], scale = 1 }) {
  const laptopGroup = useRef();

  useFrame((state) => {
    if (!laptopGroup.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating hover & tilt
    laptopGroup.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
    laptopGroup.current.rotation.y = Math.sin(t * 0.5) * 0.12 - 0.18;
    laptopGroup.current.rotation.x = 0.08 + Math.cos(t * 0.7) * 0.04;
  });

  return (
    <group ref={laptopGroup} position={position} scale={scale}>
      {/* LAPTOP BASE */}
      <mesh position={[0, -0.04, 0.4]}>
        <boxGeometry args={[2.5, 0.08, 1.65]} />
        <meshStandardMaterial
          color="#0B0F19"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* KEYBOARD RECESS */}
      <mesh position={[0, -0.004, 0.45]}>
        <boxGeometry args={[2.2, 0.01, 0.85]} />
        <meshStandardMaterial
          color="#05070E"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* GLOWING TRACKPAD */}
      <mesh position={[0, -0.003, 0.95]}>
        <boxGeometry args={[0.75, 0.01, 0.45]} />
        <meshStandardMaterial
          color="#0F172A"
          metalness={0.8}
          roughness={0.2}
          emissive="#00F0FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* LAPTOP SCREEN LID (hinged at z= -0.42) */}
      <group position={[0, 0, -0.42]} rotation={[-0.26, 0, 0]}>
        {/* Screen back frame */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.5, 1.65, 0.05]} />
          <meshStandardMaterial
            color="#080C14"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Screen Glass Bezel */}
        <mesh position={[0, 0.85, 0.028]}>
          <boxGeometry args={[2.36, 1.52, 0.01]} />
          <meshStandardMaterial
            color="#000208"
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>

        {/* GLOWING CODE DISPLAY ON SCREEN */}
        <mesh position={[0, 0.85, 0.034]}>
          <planeGeometry args={[2.3, 1.45]} />
          <meshBasicMaterial color="#040814" />
          <Html
            transform
            distanceFactor={1.12}
            position={[0, 0, 0.01]}
            className="select-none pointer-events-none"
            style={{
              width: '380px',
              height: '240px',
              background: 'linear-gradient(135deg, rgba(3,7,18,0.98) 0%, rgba(7,14,32,0.98) 100%)',
              border: '1.5px solid rgba(0,240,255,0.45)',
              borderRadius: '10px',
              padding: '14px 18px',
              color: '#F8FAFC',
              fontFamily: 'monospace',
              fontSize: '12.5px',
              boxShadow: '0 0 35px rgba(0,240,255,0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '7px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '6px', letterSpacing: '0.04em' }}>saksham@mern-dev:~/portfolio</span>
              </div>
              <div style={{ color: '#00F0FF', fontWeight: 'bold', fontSize: '13px', marginBottom: '3px' }}>&gt; const developer = &#123;</div>
              <div style={{ paddingLeft: '14px', color: '#CBD5E1', margin: '2px 0' }}>
                name: <span style={{ color: '#FACC15' }}>"Saksham Agrahari"</span>,
              </div>
              <div style={{ paddingLeft: '14px', color: '#CBD5E1', margin: '2px 0' }}>
                role: <span style={{ color: '#38BDF8' }}>"MERN Stack Engineer"</span>,
              </div>
              <div style={{ paddingLeft: '14px', color: '#CBD5E1', margin: '2px 0' }}>
                stack: [<span style={{ color: '#4ADE80' }}>"MongoDB"</span>, <span style={{ color: '#818CF8' }}>"Express"</span>, <span style={{ color: '#00F0FF' }}>"React"</span>, <span style={{ color: '#22C55E' }}>"Node"</span>],
              </div>
              <div style={{ paddingLeft: '14px', color: '#CBD5E1', margin: '2px 0' }}>
                status: <span style={{ color: '#E879F9' }}>"Ready to innovate"</span>
              </div>
              <div style={{ color: '#00F0FF', fontWeight: 'bold', fontSize: '13px', marginTop: '3px' }}>&#125;;</div>
            </div>
            <div style={{ color: '#34D399', fontSize: '11px', fontWeight: '600', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5px' }}>
              ⚡ System active &bull; Three.js 3D Viewport
            </div>
          </Html>
        </mesh>
      </group>

      {/* NEON AMBIENT GLOW BARS */}
      <mesh position={[0, -0.09, 0.4]}>
        <boxGeometry args={[2.55, 0.02, 1.7]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
