"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface ParticleFireProps {
  className?: string
}

class FireParticle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
  maxLife: number
  size: number
  temperature: number

  constructor() {
    this.position = new THREE.Vector3()
    this.velocity = new THREE.Vector3()
    this.life = 0
    this.maxLife = 1
    this.size = 1
    this.temperature = 1
    this.reset()
  }

  reset() {
    // Start at base of fire
    this.position.set(
      (Math.random() - 0.5) * 2,
      -2,
      (Math.random() - 0.5) * 2
    )
    
    // Upward velocity with some randomness
    this.velocity.set(
      (Math.random() - 0.5) * 2,
      Math.random() * 8 + 2,
      (Math.random() - 0.5) * 2
    )
    
    this.life = 0
    this.maxLife = Math.random() * 2 + 1
    this.size = Math.random() * 0.5 + 0.5
    this.temperature = Math.random() * 0.5 + 0.5
  }

  update(deltaTime: number, mouseInfluence: THREE.Vector3) {
    // Age the particle
    this.life += deltaTime
    
    if (this.life >= this.maxLife) {
      this.reset()
      return
    }
    
    // Apply physics
    this.velocity.y -= deltaTime * 2 // Gravity effect
    this.velocity.multiplyScalar(0.99) // Drag
    
    // Add turbulence
    const time = this.life * 2
    this.velocity.x += Math.sin(time + this.position.y * 0.1) * deltaTime
    this.velocity.z += Math.cos(time + this.position.y * 0.1) * deltaTime
    
    // Mouse influence
    if (mouseInfluence.length() > 0) {
      const distance = this.position.distanceTo(mouseInfluence)
      if (distance < 5) {
        const force = mouseInfluence.clone().sub(this.position).normalize()
        force.multiplyScalar((5 - distance) * deltaTime * 2)
        this.velocity.add(force)
      }
    }
    
    // Update position
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime))
    
    // Cool down over time
    this.temperature = Math.max(0, this.temperature - deltaTime * 0.5)
  }
}

function FireSystem({ mousePosition }: { mousePosition: THREE.Vector3 }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<FireParticle[]>([])
  const timeRef = useRef(0)

  // Initialize particles
  useMemo(() => {
    const particleCount = 1000
    const newParticles = Array.from({ length: particleCount }, () => new FireParticle())
    particlesRef.current = newParticles
  }, [])

  const [positions, colors] = useMemo(() => {
    const particleCount = 1000
    return [
      new Float32Array(particleCount * 3),
      new Float32Array(particleCount * 3)
    ]
  }, [])

  useFrame((state) => {
    const deltaTime = state.clock.getDelta()
    timeRef.current += deltaTime
    
    if (!pointsRef.current) return
    
    const particles = particlesRef.current
    
    // Update particles
    particles.forEach((particle, i) => {
      particle.update(deltaTime, mousePosition)
      
      // Update position buffer
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      
      // Update color buffer based on temperature and life
      const lifeRatio = 1 - (particle.life / particle.maxLife)
      const temp = particle.temperature * lifeRatio
      
      if (temp > 0.8) {
        // White/yellow (hottest)
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 0.8
      } else if (temp > 0.5) {
        // Yellow/orange
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.6 + temp * 0.4
        colors[i * 3 + 2] = 0.2
      } else if (temp > 0.2) {
        // Orange/red
        colors[i * 3] = 1
        colors[i * 3 + 1] = temp * 0.8
        colors[i * 3 + 2] = 0.1
      } else {
        // Dark red/black (cooled)
        colors[i * 3] = temp * 2
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0
      }
    })
    
    // Update buffers
    if (pointsRef.current.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
    if (pointsRef.current.geometry.attributes.color) {
      pointsRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.1}
      />
    </points>
  )
}

// Heat distortion effect using custom shader
function HeatDistortion() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    intensity: { value: 0.02 }
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create heat distortion
      float heat = exp(-distance(uv, vec2(0.5, 0.1)) * 3.0);
      
      // Add noise for heat waves
      float distortion = noise(uv * 10.0 + time * 2.0) * intensity * heat;
      
      gl_FragColor = vec4(1.0, 0.3, 0.1, distortion);
    }
  `

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0.1]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function InteractiveFireScene() {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector3())
  const { camera, raycaster, pointer } = useThree()

  const handlePointerMove = () => {
    // Convert mouse position to world coordinates
    raycaster.setFromCamera(pointer, camera)
    const intersectPoint = raycaster.ray.origin.clone().add(
      raycaster.ray.direction.clone().multiplyScalar(10)
    )
    setMousePosition(intersectPoint)
  }

  return (
    <group onPointerMove={handlePointerMove}>
      <FireSystem mousePosition={mousePosition} />
      <HeatDistortion />
      
      {/* Ground plane */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
    </group>
  )
}

export function ParticleFire({ className }: ParticleFireProps) {
  return (
    <div className={cn("w-full h-full min-h-[500px] bg-black", className)}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 5, 0]} intensity={2} color="#ff4400" distance={15} />
        
        <InteractiveFireScene />
        
        {/* Instructions */}
        <Html position={[0, 4, 0]} center>
          <div className="text-white text-sm bg-black/50 p-2 rounded backdrop-blur pointer-events-none">
            Move mouse to influence the flames
          </div>
        </Html>
        
        {/* Fog for atmosphere */}
        <fog attach="fog" args={["#000", 8, 25]} />
      </Canvas>
    </div>
  )
} 