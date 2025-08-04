"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, Float, useCursor, Environment } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface MetallicHeroProps {
  className?: string
}

// Generate random positions for metallic balls
function generateBallPositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = []
  
  for (let i = 0; i < count; i++) {
    positions.push([
      (Math.random() - 0.5) * 16, // X: -8 to 8
      (Math.random() - 0.5) * 8,  // Y: -4 to 4
      (Math.random() - 0.5) * 12, // Z: -6 to 6
    ])
  }
  
  return positions
}

function T1000Sphere({ 
  position, 
  index 
}: { 
  position: [number, number, number]
  index: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<THREE.Vector3>(new THREE.Vector3())
  const targetPositionRef = useRef<THREE.Vector3>(new THREE.Vector3(...position))
  const currentPositionRef = useRef<THREE.Vector3>(new THREE.Vector3(...position))
  const velocityRef = useRef<THREE.Vector3>(new THREE.Vector3())
  const { viewport, camera, gl, pointer } = useThree()
  
  useCursor(hovered || isDragging)

  // Create unique animation parameters for each sphere
  const animParams = useMemo(() => ({
    speed: 0.2 + Math.random() * 0.3,
    xOffset: Math.random() * Math.PI * 2,
    yOffset: Math.random() * Math.PI * 2,
    zOffset: Math.random() * Math.PI * 2,
    scale: 0.7 + Math.random() * 0.5,
    basePosition: new THREE.Vector3(...position),
  }), [position])

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime

      if (!isDragging) {
        // Smooth floating motion
        const baseX = animParams.basePosition.x + Math.sin(time * animParams.speed + animParams.xOffset) * 0.3
        const baseY = animParams.basePosition.y + Math.cos(time * animParams.speed + animParams.yOffset) * 0.2
        const baseZ = animParams.basePosition.z + Math.sin(time * animParams.speed * 0.5 + animParams.zOffset) * 0.3

        targetPositionRef.current.set(baseX, baseY, baseZ)
        
        // Smooth interpolation to target
        currentPositionRef.current.lerp(targetPositionRef.current, delta * 2)
        meshRef.current.position.copy(currentPositionRef.current)
      }

      // Boundary constraints with smooth bounce
      const bounds = { x: viewport.width * 0.35, y: viewport.height * 0.25, z: 3 }
      
      if (Math.abs(meshRef.current.position.x) > bounds.x) {
        const newX = Math.sign(meshRef.current.position.x) * bounds.x
        meshRef.current.position.x = newX
        currentPositionRef.current.x = newX
        if (isDragging) velocityRef.current.x *= -0.3
      }
      if (Math.abs(meshRef.current.position.y) > bounds.y) {
        const newY = Math.sign(meshRef.current.position.y) * bounds.y
        meshRef.current.position.y = newY
        currentPositionRef.current.y = newY
        if (isDragging) velocityRef.current.y *= -0.3
      }

      // Subtle rotation for liquid metal effect
      meshRef.current.rotation.y += (0.002 + (hovered ? 0.01 : 0)) * delta * 60
      
      // Scale animation
      const targetScale = isDragging ? animParams.scale * 1.15 : (hovered ? animParams.scale * 1.08 : animParams.scale)
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)

      // T1000 liquid ripple effect
      if (materialRef.current.distort !== undefined) {
        const baseDistort = 0.05
        const hoverDistort = hovered ? 0.15 : 0
        const dragDistort = isDragging ? 0.25 : 0
        const timeDistort = Math.sin(time * 2) * 0.02
        
        materialRef.current.distort = baseDistort + hoverDistort + dragDistort + timeDistort
        materialRef.current.speed = 0.5 + (hovered ? 1 : 0) + (isDragging ? 2 : 0)
      }
    }
  })

  const handlePointerDown = (event: THREE.Event) => {
    if (meshRef.current) {
      event.stopPropagation()
      setIsDragging(true)
      dragStartRef.current.copy(meshRef.current.position)
      gl.domElement.style.cursor = 'grabbing'
    }
  }

  const handlePointerMove = (event: THREE.Event) => {
    if (isDragging && meshRef.current) {
      event.stopPropagation()
      
      // Smooth drag with liquid-like following
      const mousePos = new THREE.Vector2(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5)
      const newPos = new THREE.Vector3(mousePos.x, mousePos.y, meshRef.current.position.z)
      
      // Smooth interpolation for liquid movement
      meshRef.current.position.lerp(newPos, 0.1)
      currentPositionRef.current.copy(meshRef.current.position)
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    gl.domElement.style.cursor = 'auto'
  }

  return (
    <Float 
      speed={animParams.speed * 0.5} 
      rotationIntensity={isDragging ? 0 : 0.1} 
      floatIntensity={isDragging ? 0 : 0.1}
      position={position}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        scale={animParams.scale}
      >
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#C0C0C0"
          metalness={1.0}
          roughness={0.02}
          envMapIntensity={2.0}
          distort={0.05}
          speed={0.5}
          transparent={false}
        />
      </mesh>
    </Float>
  )
}

// We'll handle the text as HTML overlay for better compatibility

function Scene() {
  // Generate random number of T1000 spheres (6-10)
  const sphereCount = useMemo(() => Math.floor(Math.random() * 5) + 6, [])
  const spherePositions = useMemo(() => generateBallPositions(sphereCount), [sphereCount])

  return (
    <>
      <color attach="background" args={["#000000"]} />

      {/* T1000 Chrome Environment - Essential for liquid metal reflections */}
      <Environment preset="city" background={false} />

      {/* Optimized lighting for liquid chrome effect */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Key light for chrome highlights */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={3} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light for chrome depth */}
      <directionalLight 
        position={[-10, -10, -5]} 
        intensity={1.5} 
        color="#e0e0e0"
      />
      
      {/* Rim lighting for liquid metal edges */}
      <pointLight position={[0, 0, 15]} color="#ffffff" intensity={2} distance={25} />
      <pointLight position={[-12, 12, -8]} color="#f0f0f0" intensity={1.2} distance={20} />
      <pointLight position={[12, -12, -8]} color="#f0f0f0" intensity={1.2} distance={20} />

      {/* T1000 Liquid Metal Spheres */}
      {spherePositions.map((position, index) => (
        <T1000Sphere key={index} position={position} index={index} />
      ))}

      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={["#000000", 15, 35]} />
    </>
  )
}

export function MetallicHero({ className }: MetallicHeroProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  )
}