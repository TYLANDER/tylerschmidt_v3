"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

import * as THREE from "three"
import { cn } from "@/lib/utils"

interface WaveFieldProps {
  className?: string
}

function WaveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { pointer, viewport } = useThree()

  // Create a plane geometry with enough segments for smooth morphing
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(8, 8, 128, 128)
  }, [])

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      resolution: { value: new THREE.Vector2(1024, 1024) },
      amplitude: { value: 1.5 },
      frequency: { value: 2.0 },
      speed: { value: 1.0 },
      mouseInfluence: { value: 2.0 },
    }),
    []
  )

  const vertexShader = `
    uniform float time;
    uniform vec2 mouse;
    uniform float amplitude;
    uniform float frequency;
    uniform float speed;
    uniform float mouseInfluence;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vElevation;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vUv = uv;
      vPosition = position;
      
      // Base wave pattern
      vec2 pos = position.xy * frequency;
      float wave1 = sin(pos.x + time * speed) * cos(pos.y + time * speed * 0.7);
      float wave2 = sin(pos.x * 1.3 + time * speed * 0.8) * sin(pos.y * 0.9 + time * speed * 1.2);
      
      // Add noise for organic feel
      float noiseValue = noise(pos * 0.5 + time * 0.3);
      
      // Mouse influence
      vec2 mousePos = mouse * 4.0; // Scale mouse to geometry space
      float mouseDist = distance(position.xy, mousePos);
      float mouseEffect = exp(-mouseDist * 0.5) * mouseInfluence;
      
      // Combine all effects
      float elevation = (wave1 + wave2 * 0.5 + noiseValue * 0.3) * amplitude;
      elevation += mouseEffect * sin(time * 3.0 + mouseDist * 2.0);
      
      vElevation = elevation;
      
      vec3 newPosition = position;
      newPosition.z = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform vec2 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vElevation;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      // Create color based on elevation and position
      float hue = vElevation * 0.1 + vPosition.x * 0.05 + vPosition.y * 0.05 + time * 0.1;
      float saturation = 0.7 + sin(vElevation * 2.0 + time) * 0.3;
      float brightness = 0.6 + vElevation * 0.2;
      
      // Mouse proximity effect
      vec2 mousePos = mouse * 4.0;
      float mouseDist = distance(vPosition.xy, mousePos);
      float mouseGlow = exp(-mouseDist * 0.8) * 0.5;
      
      brightness += mouseGlow;
      
      vec3 color = hsv2rgb(vec3(hue, saturation, brightness));
      
      // Add rim lighting
      vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
      float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
      color += fresnel * 0.3;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
      materialRef.current.uniforms.mouse.value.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2
      )
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  )
}

function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const [positions, colors] = useMemo(() => {
    const particleCount = 200
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Spread particles around the wave field
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4

      // Random colors
      const hue = Math.random()
      col[i * 3] = hue
      col[i * 3 + 1] = 0.8
      col[i * 3 + 2] = 0.9
    }

    return [pos, col]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]

        // Orbital motion around mouse
        const mouseX = pointer.x * 6
        const mouseY = pointer.y * 6
        const distToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)

        if (distToMouse < 3) {
          const angle = Math.atan2(y - mouseY, x - mouseX)
          positions[i] += Math.cos(angle + time * 2) * 0.02
          positions[i + 1] += Math.sin(angle + time * 2) * 0.02
        }

        // Floating motion
        positions[i + 2] = Math.sin(time + x * 0.5 + y * 0.3) * 2
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ff6b6b" />

      {/* Main wave field */}
      <WaveGeometry />

      {/* Particle swarm */}
      <ParticleSwarm />
    </>
  )
}

export function WaveField({ className }: WaveFieldProps) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <div className={cn("relative h-full w-full bg-black", className)}>
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60 }}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
      >
        <Scene />
      </Canvas>

      {/* Info overlay */}
      <div className="absolute left-4 top-4 z-10 text-foreground/80">
        <h3 className="mb-2 font-medium">Morphing Wave Field</h3>
        <p className="max-w-xs text-sm text-foreground/60">
          Move your mouse to influence the wave patterns and particle swarm.
          Watch as the geometry flows and morphs in real-time.
        </p>
        {isInteracting && (
          <div className="mt-2 text-xs text-cyan-400">
            🌊 Waves responding to your movement
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 text-xs text-foreground/60">
        Move mouse to interact • Scroll to zoom
      </div>
    </div>
  )
}
