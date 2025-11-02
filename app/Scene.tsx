'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { useState } from 'react'
import * as THREE from 'three'

function Wall({ position, rotation, width, height, color }: any) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[width, height, 0.15]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Floor({ position, width, depth, color }: any) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Door({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1, 2.1, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.3, 0, 0.06]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Window({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.6, 0.05, 0.12]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.12]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.12]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  )
}

function Furniture({ type, position, rotation, color }: any) {
  switch (type) {
    case 'sofa':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[2, 0.6, 0.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.6, -0.25]} castShadow>
            <boxGeometry args={[2, 0.6, 0.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.95, 0.45, 0]} castShadow>
            <boxGeometry args={[0.1, 0.5, 0.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.95, 0.45, 0]} castShadow>
            <boxGeometry args={[0.1, 0.5, 0.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      )
    case 'bed':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[2, 0.4, 2.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.6, -1]} castShadow>
            <boxGeometry args={[2, 0.6, 0.2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </group>
      )
    case 'table':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.2, 0.05, 0.8]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.5, 0.2, -0.35]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.5, 0.2, -0.35]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.5, 0.2, 0.35]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.5, 0.2, 0.35]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      )
    case 'chair':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.45, 0.05, 0.45]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.4, -0.2]} castShadow>
            <boxGeometry args={[0.45, 0.3, 0.05]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.18, 0.125, -0.18]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.25]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.18, 0.125, -0.18]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.25]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.18, 0.125, 0.18]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.25]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.18, 0.125, 0.18]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.25]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      )
    case 'kitchen':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[3, 0.9, 0.6]} />
            <meshStandardMaterial color="#E0E0E0" />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <boxGeometry args={[3, 0.05, 0.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-0.8, 0.5, 0.2]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>
      )
    case 'tv':
      return (
        <group position={position} rotation={rotation}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.9, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[1.4, 0.8, 0.01]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#1a1a2e" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )
    case 'wardrobe':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[1.5, 2, 0.6]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
          <mesh position={[-0.35, 1, 0.31]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.05]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
          <mesh position={[0.35, 1, 0.31]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.05]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        </group>
      )
    case 'bath':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.7, 0.6, 0.8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )
    case 'sink':
      return (
        <group position={position} rotation={rotation}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.15]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
          </mesh>
        </group>
      )
    default:
      return null
  }
}

function RoomLabel({ text, position }: any) {
  return (
    <Text
      position={position}
      fontSize={0.3}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
    </Text>
  )
}

function Apartment({ showLabels, floorColor, wallColor }: any) {
  const roomWidth = 8
  const roomDepth = 10
  const wallHeight = 2.8

  return (
    <group>
      <Floor position={[0, 0, 0]} width={roomWidth} depth={roomDepth} color={floorColor} />

      <Wall position={[0, wallHeight / 2, -roomDepth / 2]} rotation={[0, 0, 0]} width={roomWidth} height={wallHeight} color={wallColor} />
      <Wall position={[0, wallHeight / 2, roomDepth / 2]} rotation={[0, 0, 0]} width={roomWidth} height={wallHeight} color={wallColor} />
      <Wall position={[-roomWidth / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} width={roomDepth} height={wallHeight} color={wallColor} />
      <Wall position={[roomWidth / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} width={roomDepth} height={wallHeight} color={wallColor} />

      <Wall position={[0, wallHeight / 2, -1.5]} rotation={[0, Math.PI / 2, 0]} width={3} height={wallHeight} color={wallColor} />
      <Wall position={[-1.5, wallHeight / 2, 2]} rotation={[0, 0, 0]} width={5} height={wallHeight} color={wallColor} />

      <Door position={[-1, 0, -1.5]} rotation={[0, 0, 0]} />
      <Door position={[-1, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
      <Door position={[1.2, 0, 2]} rotation={[0, Math.PI / 2, 0]} />

      <Window position={[-roomWidth / 2, 1.5, -3]} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[-roomWidth / 2, 1.5, 3.5]} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[roomWidth / 2, 1.5, -3]} rotation={[0, Math.PI / 2, 0]} />

      <Furniture type="sofa" position={[2.5, 0, -3]} rotation={[0, -Math.PI / 2, 0]} color="#4A5568" />
      <Furniture type="tv" position={[-3.5, 1.2, -3]} rotation={[0, Math.PI / 2, 0]} color="#000000" />
      <Furniture type="table" position={[2, 0, -1]} rotation={[0, 0, 0]} color="#8B4513" />
      <Furniture type="chair" position={[1.5, 0, -1.5]} rotation={[0, Math.PI / 4, 0]} color="#654321" />
      <Furniture type="chair" position={[2.5, 0, -0.5]} rotation={[0, -Math.PI / 4, 0]} color="#654321" />

      <Furniture type="bed" position={[-2.3, 0, -3]} rotation={[0, Math.PI / 2, 0]} color="#8B7D6B" />
      <Furniture type="wardrobe" position={[-3.2, 0, 0.5]} rotation={[0, Math.PI / 2, 0]} color="#8B4513" />

      <Furniture type="kitchen" position={[2.3, 0, 3.5]} rotation={[0, Math.PI, 0]} color="#E0E0E0" />

      <Furniture type="bath" position={[-2.5, 0, 3.5]} rotation={[0, 0, 0]} color="#FFFFFF" />
      <Furniture type="sink" position={[-1, 0, 4.5]} rotation={[0, 0, 0]} color="#FFFFFF" />

      {showLabels && (
        <>
          <RoomLabel text="Wohnzimmer" position={[2, 2.5, -2.5]} />
          <RoomLabel text="Schlafzimmer" position={[-2, 2.5, -2]} />
          <RoomLabel text="Küche" position={[2, 2.5, 3.5]} />
          <RoomLabel text="Bad" position={[-2, 2.5, 3.5]} />
        </>
      )}
    </group>
  )
}

export default function Scene() {
  const [showLabels, setShowLabels] = useState(true)
  const [floorColor, setFloorColor] = useState('#D2B48C')
  const [wallColor, setWallColor] = useState('#F5F5DC')
  const [viewMode, setViewMode] = useState('perspective')

  return (
    <div className="container">
      <div className="title">
        <h1>3D Raumplan - Moderne Europäische Wohnung</h1>
        <p>Interaktive 3D-Visualisierung | Rotieren mit Maus | Zoom mit Mausrad</p>
      </div>

      <div className="info">
        <h3>Räume</h3>
        <ul>
          <li>Wohnzimmer mit Sofa & TV</li>
          <li>Schlafzimmer mit Bett</li>
          <li>Küche modern ausgestattet</li>
          <li>Badezimmer mit Badewanne</li>
        </ul>
      </div>

      <div className="controls">
        <p>Steuerung & Anpassungen</p>
        <div className="button-group">
          <button onClick={() => setShowLabels(!showLabels)} className={showLabels ? 'active' : ''}>
            {showLabels ? 'Labels ausblenden' : 'Labels einblenden'}
          </button>
          <button onClick={() => setFloorColor('#D2B48C')} className={floorColor === '#D2B48C' ? 'active' : ''}>
            Holzboden
          </button>
          <button onClick={() => setFloorColor('#E8E8E8')} className={floorColor === '#E8E8E8' ? 'active' : ''}>
            Heller Boden
          </button>
          <button onClick={() => setFloorColor('#696969')} className={floorColor === '#696969' ? 'active' : ''}>
            Dunkler Boden
          </button>
          <button onClick={() => setWallColor('#F5F5DC')} className={wallColor === '#F5F5DC' ? 'active' : ''}>
            Beige Wände
          </button>
          <button onClick={() => setWallColor('#FFFFFF')} className={wallColor === '#FFFFFF' ? 'active' : ''}>
            Weiße Wände
          </button>
          <button onClick={() => setWallColor('#E6E6FA')} className={wallColor === '#E6E6FA' ? 'active' : ''}>
            Lila Wände
          </button>
        </div>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={60} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <pointLight position={[0, 2, 0]} intensity={0.5} />
        <pointLight position={[-3, 2, -3]} intensity={0.3} color="#FFA500" />
        <pointLight position={[3, 2, 3]} intensity={0.3} color="#87CEEB" />

        <Apartment showLabels={showLabels} floorColor={floorColor} wallColor={wallColor} />
      </Canvas>
    </div>
  )
}
