import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function DeveloperDesk({ position = [0, -1.2, 0], scale = 1 }) {
  const groupRef = useRef();
  const fan1Ref = useRef();
  const fan2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (fan1Ref.current) fan1Ref.current.rotation.z = t * 4;
    if (fan2Ref.current) fan2Ref.current.rotation.z = t * 4;
    if (groupRef.current) {
      // Subtle floating breathing motion
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05 - 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* =========================================
          1. DESK SURFACE
      ========================================= */}
      <mesh position={[0, -0.15, 0.2]} receiveShadow>
        <boxGeometry args={[6.8, 0.16, 3.4]} />
        <meshStandardMaterial
          color="#0B0F19"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
      {/* Desk edge front neon strip */}
      <mesh position={[0, -0.15, 1.91]}>
        <boxGeometry args={[6.8, 0.02, 0.02]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
      </mesh>

      {/* =========================================
          2. LARGE ULTRAWIDE MONITOR & STAND
      ========================================= */}
      {/* Monitor Stand Base */}
      <mesh position={[-0.3, -0.06, -0.4]}>
        <boxGeometry args={[1.2, 0.03, 0.7]} />
        <meshStandardMaterial color="#080C14" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Monitor Stand Arm */}
      <mesh position={[-0.3, 0.45, -0.55]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.22, 1.0, 0.1]} />
        <meshStandardMaterial color="#0A0E1A" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Monitor Screen Frame & Display */}
      <group position={[-0.3, 0.95, -0.45]}>
        {/* Monitor Back Case */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[3.8, 2.2, 0.08]} />
          <meshStandardMaterial color="#070A12" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Screen Bezel */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[3.72, 2.12, 0.02]} />
          <meshStandardMaterial color="#020408" metalness={0.2} roughness={0.1} />
        </mesh>

        {/* SCREEN DISPLAY - INTERACTIVE VS CODE WORKSTATION */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.65, 2.05]} />
          <meshBasicMaterial color="#0D1117" />
          <Html
            transform
            distanceFactor={1.45}
            position={[0, 0, 0.01]}
            className="select-none pointer-events-none"
            style={{
              width: '540px',
              height: '304px',
              background: '#0D1117',
              borderRadius: '6px',
              color: '#C9D1D9',
              fontFamily: '"Fira Code", "Cascadia Code", monospace',
              fontSize: '12px',
              overflow: 'hidden',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              border: '1px solid rgba(0,240,255,0.3)'
            }}
          >
            {/* VS CODE TITLEBAR */}
            <div style={{ background: '#161B22', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid #21262D' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
                <span style={{ fontSize: '11px', color: '#8B949E', marginLeft: '10px' }}>Saksham — portfolio-rig [WSL: Ubuntu]</span>
              </div>
              <div style={{ fontSize: '10px', color: '#58A6FF', background: 'rgba(56,189,248,0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                React 19 &bull; Three.js
              </div>
            </div>

            {/* VS CODE MAIN BODY */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* SIDEBAR EXPLORER */}
              <div style={{ width: '115px', background: '#0D1117', borderRight: '1px solid #21262D', padding: '8px', fontSize: '11px', color: '#8B949E', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#58A6FF' }}>Explorer</div>
                <div style={{ color: '#E6EDF3', display: 'flex', alignItems: 'center', gap: '4px' }}>📂 src</div>
                <div style={{ paddingLeft: '10px', color: '#7EE787' }}>📄 Hero.jsx</div>
                <div style={{ paddingLeft: '10px', color: '#79C0FF' }}>📄 Zyppy.jsx</div>
                <div style={{ paddingLeft: '10px', color: '#FFA657' }}>📄 Server.js</div>
                <div style={{ paddingLeft: '10px', color: '#D2A8FF' }}>📄 Mongo.js</div>
              </div>

              {/* EDITOR AREA */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090D16' }}>
                {/* TABS */}
                <div style={{ display: 'flex', background: '#161B22', borderBottom: '1px solid #21262D', height: '24px', alignItems: 'center' }}>
                  <div style={{ background: '#090D16', color: '#E6EDF3', padding: '0 12px', fontSize: '11px', height: '100%', display: 'flex', alignItems: 'center', borderTop: '2px solid #58A6FF', gap: '5px' }}>
                    <span style={{ color: '#7EE787' }}>⚛</span> HeroScene.jsx
                  </div>
                  <div style={{ color: '#8B949E', padding: '0 10px', fontSize: '11px' }}>profile.json</div>
                </div>

                {/* CODE CONTENT */}
                <div style={{ padding: '10px 14px', lineHeight: '1.45', flex: 1, overflow: 'hidden' }}>
                  <div><span style={{ color: '#FF7B72' }}>import</span> React, &#123; Canvas &#125; <span style={{ color: '#FF7B72' }}>from</span> <span style={{ color: '#A5D6FF' }}>'@react-three/fiber'</span>;</div>
                  <div><span style={{ color: '#FF7B72' }}>const</span> <span style={{ color: '#FFA657' }}>Developer</span> = &#123;</div>
                  <div style={{ paddingLeft: '14px' }}>name: <span style={{ color: '#A5D6FF' }}>'Saksham Agrahari'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>role: <span style={{ color: '#79C0FF' }}>'MERN Stack Developer'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>skills: [<span style={{ color: '#7EE787' }}>'React'</span>, <span style={{ color: '#7EE787' }}>'Node'</span>, <span style={{ color: '#7EE787' }}>'MongoDB'</span>],</div>
                  <div style={{ paddingLeft: '14px' }}>passion: <span style={{ color: '#D2A8FF' }}>'Interactive 3D Web'</span></div>
                  <div>&#125;;</div>
                </div>

                {/* INTEGRATED TERMINAL */}
                <div style={{ height: '70px', background: '#0D1117', borderTop: '1px solid #21262D', padding: '6px 12px', fontSize: '10.5px' }}>
                  <div style={{ color: '#8B949E', fontSize: '9px', marginBottom: '3px' }}>TERMINAL — bash</div>
                  <div style={{ color: '#7EE787' }}>✓ vite v8.2.1 ready in 214 ms</div>
                  <div style={{ color: '#58A6FF' }}>➜  Local:   http://localhost:5173/</div>
                  <div style={{ color: '#3FB950' }}>⚡ Ready to build exceptional experiences.</div>
                </div>
              </div>
            </div>
          </Html>
        </mesh>
      </group>

      {/* =========================================
          3. PC TOWER WITH GLOWING RGB FANS (RIGHT)
      ========================================= */}
      <group position={[2.2, 0.6, -0.3]}>
        {/* Case Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 1.6, 1.8]} />
          <meshStandardMaterial color="#0A0E17" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glass Side Panel */}
        <mesh position={[-0.46, 0, 0]}>
          <boxGeometry args={[0.02, 1.5, 1.7]} />
          <meshPhysicalMaterial
            color="#00F0FF"
            transparent
            opacity={0.25}
            transmission={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Front Fan 1 (Top) */}
        <group position={[0, 0.35, 0.91]}>
          <mesh ref={fan1Ref}>
            <ringGeometry args={[0.15, 0.28, 16]} />
            <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#00F0FF" intensity={1.5} distance={1.8} />
        </group>

        {/* Front Fan 2 (Bottom) */}
        <group position={[0, -0.35, 0.91]}>
          <mesh ref={fan2Ref}>
            <ringGeometry args={[0.15, 0.28, 16]} />
            <meshBasicMaterial color="#A855F7" side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#A855F7" intensity={1.5} distance={1.8} />
        </group>

        {/* Internal GPU RGB Glow */}
        <mesh position={[-0.1, 0.05, 0]}>
          <boxGeometry args={[0.2, 0.08, 0.9]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* =========================================
          4. DESKTOP SPEAKERS (LEFT & RIGHT)
      ========================================= */}
      {/* Left Speaker */}
      <group position={[-2.4, 0.25, -0.4]}>
        <mesh>
          <boxGeometry args={[0.45, 0.8, 0.45]} />
          <meshStandardMaterial color="#090D16" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* RGB Woofer Ring */}
        <mesh position={[0, 0.05, 0.23]}>
          <ringGeometry args={[0.08, 0.16, 24]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </group>

      {/* Right Speaker (Between Monitor and PC) */}
      <group position={[1.45, 0.25, -0.4]}>
        <mesh>
          <boxGeometry args={[0.45, 0.8, 0.45]} />
          <meshStandardMaterial color="#090D16" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* RGB Woofer Ring */}
        <mesh position={[0, 0.05, 0.23]}>
          <ringGeometry args={[0.08, 0.16, 24]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>
      </group>

      {/* =========================================
          5. RGB MECHANICAL KEYBOARD & MOUSE
      ========================================= */}
      {/* Large Desk Gaming Pad */}
      <mesh position={[-0.3, -0.065, 0.75]}>
        <boxGeometry args={[3.2, 0.01, 1.4]} />
        <meshStandardMaterial color="#050811" roughness={0.9} />
      </mesh>

      {/* Mechanical Keyboard */}
      <group position={[-0.5, -0.045, 0.8]}>
        <mesh>
          <boxGeometry args={[1.7, 0.04, 0.6]} />
          <meshStandardMaterial color="#090D18" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* RGB Underglow */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.74, 0.01, 0.64]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Gaming Mouse */}
      <group position={[0.75, -0.045, 0.8]}>
        <mesh>
          <boxGeometry args={[0.22, 0.045, 0.38]} />
          <meshStandardMaterial color="#0A0E1A" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Mouse RGB light strip */}
        <mesh position={[0, 0.024, 0]}>
          <boxGeometry args={[0.03, 0.005, 0.25]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>
      </group>
    </group>
  );
}
