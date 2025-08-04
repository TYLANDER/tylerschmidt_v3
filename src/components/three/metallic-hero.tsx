"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, Float, useCursor } from "@react-three/drei"
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

function MetalBall({ 
  position, 
  index 
}: { 
  position: [number, number, number]
  index: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<THREE.Vector3>(new THREE.Vector3())
  const [currentPosition, setCurrentPosition] = useState<THREE.Vector3>(new THREE.Vector3(...position))
  const [velocity, setVelocity] = useState<THREE.Vector3>(new THREE.Vector3())
  const { viewport, camera, gl } = useThree()
  
  useCursor(hovered || isDragging)

  // Create unique animation parameters for each ball
  const animParams = useMemo(() => ({
    speed: 0.3 + Math.random() * 0.4,
    xOffset: Math.random() * Math.PI * 2,
    yOffset: Math.random() * Math.PI * 2,
    zOffset: Math.random() * Math.PI * 2,
    floatRange: 2 + Math.random() * 3,
    scale: 0.8 + Math.random() * 0.6,
    basePosition: new THREE.Vector3(...position),
  }), [position])

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * animParams.speed

      if (!isDragging) {
        // Gentle floating motion with unique patterns
        const baseX = animParams.basePosition.x + Math.sin(time + animParams.xOffset) * 0.5
        const baseY = animParams.basePosition.y + Math.cos(time + animParams.yOffset) * 0.3
        const baseZ = animParams.basePosition.z + Math.sin(time * 0.5 + animParams.zOffset) * 0.4

        // Spring back to floating position with physics
        const springForce = 0.02
        const damping = 0.95
        
        const targetPos = new THREE.Vector3(baseX, baseY, baseZ)
        const force = targetPos.clone().sub(currentPosition).multiplyScalar(springForce)
        
        velocity.add(force)
        velocity.multiplyScalar(damping)
        currentPosition.add(velocity.clone().multiplyScalar(delta * 60))

        meshRef.current.position.copy(currentPosition)
      }

      // Keep balls within viewport bounds
      const bounds = {
        x: viewport.width * 0.4,
        y: viewport.height * 0.3,
        z: 4
      }

      if (Math.abs(meshRef.current.position.x) > bounds.x) {
        meshRef.current.position.x = Math.sign(meshRef.current.position.x) * bounds.x
        currentPosition.x = meshRef.current.position.x
        velocity.x *= -0.5 // Bounce effect
      }
      if (Math.abs(meshRef.current.position.y) > bounds.y) {
        meshRef.current.position.y = Math.sign(meshRef.current.position.y) * bounds.y
        currentPosition.y = meshRef.current.position.y
        velocity.y *= -0.5 // Bounce effect
      }
      if (Math.abs(meshRef.current.position.z) > bounds.z) {
        meshRef.current.position.z = Math.sign(meshRef.current.position.z) * bounds.z
        currentPosition.z = meshRef.current.position.z
        velocity.z *= -0.5 // Bounce effect
      }

      // Rotation
      meshRef.current.rotation.x = Math.sin(time * 0.7) * 0.3
      meshRef.current.rotation.y += 0.005 + (hovered ? 0.02 : 0) + (isDragging ? 0.05 : 0)
      meshRef.current.rotation.z = Math.cos(time * 0.5) * 0.2

      // Scale on interaction with physics influence
      const dragScale = isDragging ? 1.3 : 1
      const targetScale = clicked ? animParams.scale * 1.4 * dragScale : (hovered ? animParams.scale * 1.2 * dragScale : animParams.scale * dragScale)
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  const handlePointerDown = (event: THREE.Event) => {
    if (meshRef.current) {
      event.stopPropagation()
      setIsDragging(true)
      setClicked(true)
      gl.domElement.style.cursor = 'grabbing'
      
      // Record the initial drag position
      setDragStart(meshRef.current.position.clone())
    }
  }

  const handlePointerMove = (event: THREE.Event) => {
    if (isDragging && meshRef.current) {
      event.stopPropagation()
      
      // Convert pointer movement to 3D world coordinates
      const pointer = new THREE.Vector2(
        (event.offsetX / gl.domElement.clientWidth) * 2 - 1,
        -(event.offsetY / gl.domElement.clientHeight) * 2 + 1
      )
      
      // Raycast to get world position
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(pointer, camera)
      
      // Project onto a plane at the ball's Z position
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -meshRef.current.position.z)
      const newPosition = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, newPosition)
      
      if (newPosition) {
        // Add some elastic resistance for more realistic feel
        const dragDistance = newPosition.distanceTo(dragStart)
        const resistance = Math.min(1, dragDistance / 3) // Increase resistance with distance
        
        newPosition.lerp(dragStart, resistance * 0.3)
        
        // Update position and velocity for physics
        const deltaPos = newPosition.clone().sub(currentPosition)
        setVelocity(deltaPos.multiplyScalar(2)) // Convert movement to velocity
        setCurrentPosition(newPosition)
        meshRef.current.position.copy(newPosition)
      }
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    setClicked(false)
    gl.domElement.style.cursor = 'auto'
  }

  return (
    <Float 
      speed={animParams.speed} 
      rotationIntensity={isDragging ? 0 : 0.3} 
      floatIntensity={isDragging ? 0 : 0.2}
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
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#E5E5E5"
          metalness={0.95}
          roughness={0.08}
          distort={0.15 + (hovered ? 0.25 : 0) + (isDragging ? 0.4 : 0)}
          speed={1 + (hovered ? 2 : 0) + (isDragging ? 3 : 0)}
        />
      </mesh>
    </Float>
  )
}

// We'll handle the text as HTML overlay for better compatibility

function Scene() {
  // Generate random number of balls (5-12)
  const ballCount = useMemo(() => Math.floor(Math.random() * 8) + 5, [])
  const ballPositions = useMemo(() => generateBallPositions(ballCount), [ballCount])

  return (
    <>
      <color attach="background" args={["#000000"]} />

      {/* Enhanced lighting for pure metal look */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        color="#ffffff"
        castShadow
      />
      <directionalLight 
        position={[-5, -5, 3]} 
        intensity={1.2} 
        color="#f0f0f0"
      />
      {/* Rim lighting for metallic edges */}
      <pointLight position={[0, 0, 10]} color="#ffffff" intensity={1.5} distance={20} />
      <pointLight position={[-8, 8, -5]} color="#E5E5E5" intensity={0.8} distance={15} />
      <pointLight position={[8, -8, -5]} color="#D4D4D8" intensity={0.8} distance={15} />

      {/* Text handled as HTML overlay */}

      {/* Floating metallic balls */}
      {ballPositions.map((position, index) => (
        <MetalBall key={index} position={position} index={index} />
      ))}

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#000000", 12, 30]} />
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