"use client"

import { useRef, useMemo, useState, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line, Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface NeuralNetworkProps {
  className?: string
}

interface Node {
  id: number
  position: [number, number, number]
  layer: number
  active: boolean
  activation: number
}

interface Connection {
  from: number
  to: number
  weight: number
  pulse: number
}

function NetworkNode({
  node,
  onClick,
}: {
  node: Node
  onClick: (id: number) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Pulsing effect based on activation
      const scale = 0.5 + node.activation * 0.5
      meshRef.current.scale.setScalar(scale)

      // Glow effect
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      const intensity = 0.3 + node.activation * 0.7
      material.opacity = intensity
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onClick={() => onClick(node.id)}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial
        color={node.active ? "#00ff88" : "#0088ff"}
        transparent
        opacity={0.8}
      />
      {/* Glow effect */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={node.active ? "#00ff88" : "#0088ff"}
          transparent
          opacity={0.1}
        />
      </mesh>
    </mesh>
  )
}

function NetworkConnection({
  connection,
  nodes,
}: {
  connection: Connection
  nodes: Node[]
}) {
  const lineRef = useRef<unknown>(null)

  const fromNode = nodes.find((n) => n.id === connection.from)
  const toNode = nodes.find((n) => n.id === connection.to)

  useFrame((state) => {
    if (lineRef.current && fromNode && toNode) {
      // Animated pulse along connection
      const line = lineRef.current as THREE.Line & {
        material?: THREE.Material & { opacity?: number }
      }
      if (line.material) {
        const material = line.material as THREE.Material & { opacity?: number }
        const opacity =
          0.3 + Math.sin(state.clock.elapsedTime * 3 + connection.pulse) * 0.2
        material.opacity = Math.max(0.1, opacity * connection.weight)
      }
    }
  })

  if (!fromNode || !toNode) return null

  const points = [
    new THREE.Vector3(...fromNode.position),
    new THREE.Vector3(...toNode.position),
  ]

  return (
    <Line
      points={points}
      color={connection.weight > 0.5 ? "#00ff88" : "#ff4444"}
      lineWidth={2}
      transparent
      opacity={0.5}
    />
  )
}

function NeuralNetwork() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [, setPulseTime] = useState(0)

  // Generate network structure
  useMemo(() => {
    const newNodes: Node[] = []
    const newConnections: Connection[] = []
    let nodeId = 0

    // Create layers
    const layerSizes = [4, 6, 6, 3] // Input, hidden1, hidden2, output
    const layerPositions = [-6, -2, 2, 6]

    for (let layerIndex = 0; layerIndex < layerSizes.length; layerIndex++) {
      const layerSize = layerSizes[layerIndex]
      const x = layerPositions[layerIndex]

      for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
        const y = (nodeIndex - layerSize / 2) * 2
        newNodes.push({
          id: nodeId++,
          position: [x, y, 0],
          layer: layerIndex,
          active: false,
          activation: Math.random() * 0.5,
        })
      }
    }

    // Create connections between layers
    for (let layerIndex = 0; layerIndex < layerSizes.length - 1; layerIndex++) {
      const currentLayerNodes = newNodes.filter((n) => n.layer === layerIndex)
      const nextLayerNodes = newNodes.filter((n) => n.layer === layerIndex + 1)

      currentLayerNodes.forEach((fromNode) => {
        nextLayerNodes.forEach((toNode) => {
          if (Math.random() > 0.3) {
            // Don't connect all nodes
            newConnections.push({
              from: fromNode.id,
              to: toNode.id,
              weight: Math.random(),
              pulse: Math.random() * Math.PI * 2,
            })
          }
        })
      })
    }

    setNodes(newNodes)
    setConnections(newConnections)
  }, [])

  // Handle node clicks - trigger activation pulse
  const handleNodeClick = useCallback(
    (nodeId: number) => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId ? { ...node, active: true, activation: 1 } : node
        )
      )

      // Propagate activation
      setTimeout(() => {
        const propagateActivation = (
          currentNodeId: number,
          delay: number = 0
        ) => {
          const connectedNodes = connections
            .filter((c) => c.from === currentNodeId)
            .map((c) => c.to)

          setTimeout(() => {
            setNodes((prev) =>
              prev.map((node) =>
                connectedNodes.includes(node.id)
                  ? {
                      ...node,
                      active: true,
                      activation: Math.random() * 0.8 + 0.2,
                    }
                  : node
              )
            )

            connectedNodes.forEach((nextNodeId) => {
              propagateActivation(nextNodeId, 200)
            })
          }, delay)
        }

        propagateActivation(nodeId, 100)
      }, 100)

      // Reset after animation
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((node) => ({
            ...node,
            active: false,
            activation: Math.random() * 0.3,
          }))
        )
      }, 2000)
    },
    [connections]
  )

  useFrame((state) => {
    setPulseTime(state.clock.elapsedTime)
  })

  return (
    <group>
      {/* Connections */}
      {connections.map((connection, index) => (
        <NetworkConnection
          key={`connection-${index}`}
          connection={connection}
          nodes={nodes}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <NetworkNode
          key={`node-${node.id}`}
          node={node}
          onClick={handleNodeClick}
        />
      ))}

      {/* Layer labels */}
      <Text position={[-6, -5, 0]} fontSize={0.5} color="#888888">
        Input Layer
      </Text>
      <Text position={[-2, -5, 0]} fontSize={0.5} color="#888888">
        Hidden Layer 1
      </Text>
      <Text position={[2, -5, 0]} fontSize={0.5} color="#888888">
        Hidden Layer 2
      </Text>
      <Text position={[6, -5, 0]} fontSize={0.5} color="#888888">
        Output Layer
      </Text>
    </group>
  )
}

export function NeuralNetworkViz({ className }: NeuralNetworkProps) {
  return (
    <div className={cn("h-full min-h-[600px] w-full bg-gray-900", className)}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NeuralNetwork />

        {/* Instructions */}
        <Html position={[0, 6, 0]} center>
          <div className="rounded bg-black/50 p-2 text-sm text-white backdrop-blur">
            Click nodes to trigger neural activations
          </div>
        </Html>
      </Canvas>
    </div>
  )
}
