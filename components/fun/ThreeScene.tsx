"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  geometry,
  speed = 1,
  rotSpeed = [0.4, 0.6, 0.2],
}: {
  position: [number, number, number];
  color: string;
  geometry: React.ReactNode;
  speed?: number;
  rotSpeed?: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotSpeed[0] * speed;
    ref.current.rotation.y += delta * rotSpeed[1] * speed;
    ref.current.rotation.z += delta * rotSpeed[2] * speed;
  });

  return (
    <Float speed={speed} floatIntensity={1.2} rotationIntensity={0}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#ffd6a5" />

      {/* Pastel pink octahedron */}
      <FloatingShape
        position={[-3, 0.8, 0]}
        color="#FFB3C6"
        geometry={<octahedronGeometry args={[1, 0]} />}
        speed={0.7}
        rotSpeed={[0.3, 0.5, 0.2]}
      />

      {/* Mint torus */}
      <FloatingShape
        position={[3.2, -0.4, 0]}
        color="#B5EAD7"
        geometry={<torusGeometry args={[0.75, 0.28, 16, 64]} />}
        speed={0.9}
        rotSpeed={[0.6, 0.4, 0.3]}
      />

      {/* Lavender icosahedron */}
      <FloatingShape
        position={[0.5, 2, -1]}
        color="#C7B8EA"
        geometry={<icosahedronGeometry args={[0.7, 0]} />}
        speed={0.6}
        rotSpeed={[0.4, 0.7, 0.1]}
      />

      {/* Peach dodecahedron */}
      <FloatingShape
        position={[-1.5, -2, 0.5]}
        color="#FFDAC1"
        geometry={<dodecahedronGeometry args={[0.65, 0]} />}
        speed={0.8}
        rotSpeed={[0.5, 0.3, 0.4]}
      />

      {/* Lemon torus knot */}
      <FloatingShape
        position={[2.2, 2.2, -0.5]}
        color="#FDFFB6"
        geometry={<torusKnotGeometry args={[0.4, 0.14, 64, 8]} />}
        speed={1.1}
        rotSpeed={[0.6, 0.8, 0.3]}
      />
    </Canvas>
  );
}
