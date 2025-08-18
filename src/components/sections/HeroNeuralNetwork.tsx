"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface Node {
  id: string
  label: string
  category: 'skill' | 'project' | 'concept'
  position: THREE.Vector3
  connections: string[]
  activation: number
}

const nodes: Node[] = [
  // Core skills
  { id: 'design', label: 'Design', category: 'skill', position: new THREE.Vector3(0, 0, 0), connections: ['ui', 'ux', 'systems'], activation: 0 },
  { id: 'engineering', label: 'Engineering', category: 'skill', position: new THREE.Vector3(3, 0, 0), connections: ['frontend', 'backend', 'systems'], activation: 0 },
  { id: 'creative', label: 'Creative', category: 'skill', position: new THREE.Vector3(-3, 0, 0), connections: ['art', 'motion', 'interaction'], activation: 0 },
  
  // Sub-skills
  { id: 'ui', label: 'UI Design', category: 'skill', position: new THREE.Vector3(0, 2, 1), connections: ['project1', 'systems'], activation: 0 },
  { id: 'ux', label: 'UX Research', category: 'skill', position: new THREE.Vector3(-1, 2, -1), connections: ['project2', 'interaction'], activation: 0 },
  { id: 'frontend', label: 'Frontend', category: 'skill', position: new THREE.Vector3(3, 2, 1), connections: ['react', 'typescript', 'project1'], activation: 0 },
  { id: 'backend', label: 'Backend', category: 'skill', position: new THREE.Vector3(4, 2, -1), connections: ['node', 'database', 'project3'], activation: 0 },
  
  // Technologies
  { id: 'react', label: 'React', category: 'concept', position: new THREE.Vector3(3, 4, 0), connections: ['project1', 'project2'], activation: 0 },
  { id: 'typescript', label: 'TypeScript', category: 'concept', position: new THREE.Vector3(4, 4, 1), connections: ['project1', 'project3'], activation: 0 },
  { id: 'node', label: 'Node.js', category: 'concept', position: new THREE.Vector3(5, 4, -1), connections: ['project3'], activation: 0 },
  { id: 'database', label: 'Database', category: 'concept', position: new THREE.Vector3(6, 3, 0), connections: ['project3'], activation: 0 },
  
  // Design concepts
  { id: 'systems', label: 'Design Systems', category: 'concept', position: new THREE.Vector3(0, 4, 0), connections: ['project1', 'project2'], activation: 0 },
  { id: 'motion', label: 'Motion Design', category: 'concept', position: new THREE.Vector3(-3, 3, 1), connections: ['project2'], activation: 0 },
  { id: 'art', label: 'Generative Art', category: 'concept', position: new THREE.Vector3(-4, 3, -1), connections: ['project4'], activation: 0 },
  { id: 'interaction', label: 'Interaction', category: 'concept', position: new THREE.Vector3(-2, 4, 0), connections: ['project2', 'project4'], activation: 0 },
  
  // Projects
  { id: 'project1', label: 'Enterprise Platform', category: 'project', position: new THREE.Vector3(1.5, 6, 0), connections: [], activation: 0 },
  { id: 'project2', label: 'Design System', category: 'project', position: new THREE.Vector3(-1.5, 6, 0), connections: [], activation: 0 },
  { id: 'project3', label: 'SaaS Application', category: 'project', position: new THREE.Vector3(4.5, 6, 0), connections: [], activation: 0 },
  { id: 'project4', label: 'Interactive Experience', category: 'project', position: new THREE.Vector3(-4.5, 6, 0), connections: [], activation: 0 },
]

function NetworkNode({ node, onHover, onLeave }: { 
  node: Node
  onHover: (node: Node) => void
  onLeave: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame(() => {
    if (!meshRef.current) return
    
    // Pulsing effect based on activation
    const scale = 1 + node.activation * 0.5 + (hovered ? 0.2 : 0)
    meshRef.current.scale.setScalar(scale)
    
    // Rotation for active nodes
    if (node.activation > 0) {
      meshRef.current.rotation.y += 0.01 * node.activation
    }
  })
  
  const color = node.category === 'skill' ? '#4a9eff' : 
                node.category === 'project' ? '#4ade80' : 
                '#f59e0b'
  
  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onPointerOver={() => {
        setHovered(true)
        onHover(node)
      }}
      onPointerOut={() => {
        setHovered(false)
        onLeave()
      }}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={node.activation}
      />
    </mesh>
  )
}

function NetworkConnections({ nodes }: { nodes: Node[] }) {
  const linesRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (!linesRef.current) return
    
    // Animate connections
    linesRef.current.children.forEach((line, i) => {
      if (line instanceof THREE.Line) {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + i) * 0.1
      }
    })
  })
  
  return (
    <group ref={linesRef}>
      {nodes.flatMap(node => 
        node.connections.map(targetId => {
          const target = nodes.find(n => n.id === targetId)
          if (!target) return null
          
          const points = [node.position, target.position]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          return (
            <primitive 
              key={`${node.id}-${targetId}`} 
              object={new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({ 
                  color: 0xffffff, 
                  opacity: 0.2, 
                  transparent: true 
                })
              )} 
            />
          )
        }).filter(Boolean)
      )}
    </group>
  )
}

function ThoughtPulse({ from, to }: { from: Node; to: Node }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [progress, setProgress] = useState(0)
  
  useFrame((state, delta) => {
    setProgress(prev => {
      const next = prev + delta * 0.5
      return next > 1 ? 0 : next
    })
    
    if (meshRef.current) {
      const position = new THREE.Vector3().lerpVectors(
        from.position,
        to.position,
        progress
      )
      meshRef.current.position.copy(position)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#00ffff" />
    </mesh>
  )
}

function NeuralNetworkScene() {
  const [activeNode, setActiveNode] = useState<Node | null>(null)
  const [thoughts, setThoughts] = useState<Array<{ id: string; from: Node; to: Node }>>([])
  const [networkNodes, setNetworkNodes] = useState(nodes)
  
  // Trigger thoughts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = networkNodes[Math.floor(Math.random() * networkNodes.length)]
      if (randomNode.connections.length > 0) {
        const targetId = randomNode.connections[Math.floor(Math.random() * randomNode.connections.length)]
        const targetNode = networkNodes.find(n => n.id === targetId)
        
        if (targetNode) {
          const thoughtId = `${Date.now()}-${Math.random()}`
          setThoughts(prev => [...prev, { id: thoughtId, from: randomNode, to: targetNode }])
          
          // Update activations
          setNetworkNodes(prev => prev.map(n => ({
            ...n,
            activation: n.id === randomNode.id || n.id === targetId ? 1 : n.activation * 0.95
          })))
          
          // Remove thought after animation
          setTimeout(() => {
            setThoughts(prev => prev.filter(t => t.id !== thoughtId))
          }, 2000)
        }
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [networkNodes])
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} color="#4a9eff" />
      
      {/* Network nodes */}
      {networkNodes.map(node => (
        <NetworkNode
          key={node.id}
          node={node}
          onHover={(n) => {
            setActiveNode(n)
            // Activate connected nodes
            setNetworkNodes(prev => prev.map(node => ({
              ...node,
              activation: n.connections.includes(node.id) || node.id === n.id ? 1 : node.activation
            })))
          }}
          onLeave={() => setActiveNode(null)}
        />
      ))}
      
      {/* Connections */}
      <NetworkConnections nodes={networkNodes} />
      
      {/* Thought pulses */}
      {thoughts.map(thought => (
        <ThoughtPulse key={thought.id} from={thought.from} to={thought.to} />
      ))}
      
      {/* Labels */}
      {activeNode && (
        <group position={activeNode.position}>
          <mesh position={[0, 0.8, 0]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="black" opacity={0.8} transparent />
          </mesh>
        </group>
      )}
      
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function HeroNeuralNetwork() {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <NeuralNetworkScene />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full flex flex-col justify-between p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Tyler Schmidt
            </h1>
            <p className="text-xl text-gray-400">
              Neural Network of Skills & Experience
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4a9eff]" />
              <span className="text-gray-400">Core Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span className="text-gray-400">Concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
              <span className="text-gray-400">Projects</span>
            </div>
          </motion.div>
        </div>
        
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs text-gray-500">
            Drag to rotate • Hover nodes to explore connections
          </p>
        </motion.div>
      </div>
    </section>
  )
}
