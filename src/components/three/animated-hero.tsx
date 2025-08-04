"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Mesh } from "three"
import { cn } from "@/lib/utils"

interface AnimatedHeroProps {
  className?: string
}

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#f59e0b"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <AnimatedSphere />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// TODO: Use this loader component for Three.js Suspense fallback
// function Loader() {
//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
//     </div>
//   )
// }

export function AnimatedHero({ className }: AnimatedHeroProps) {
  return (
    <div className={cn("h-full min-h-[400px] w-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default AnimatedHero
