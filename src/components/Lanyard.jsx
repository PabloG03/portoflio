/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import './Lanyard.css'

import pokeballImg from '../pics/Pokebola-pokeball-png-0.png'

extend({ MeshLineGeometry, MeshLineMaterial })

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const createPremiumWeaveTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#181818'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#0b0b0b'
  ctx.fillRect(0, 0, canvas.width, 16)
  ctx.fillRect(0, canvas.height - 16, canvas.width, 16)

  ctx.strokeStyle = '#222222'
  ctx.lineWidth = 2.5
  for (let x = 0; x < canvas.width; x += 8) {
    ctx.beginPath()
    ctx.moveTo(x, 16)
    ctx.lineTo(x + 6, canvas.height - 16)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + 4, 16)
    ctx.lineTo(x, canvas.height - 16)
    ctx.stroke()
  }

  for (let i = 0; i < 3000; i++) {
    const rx = Math.random() * canvas.width
    const ry = 16 + Math.random() * (canvas.height - 32)
    ctx.fillStyle = Math.random() > 0.5 ? '#2a2a2a' : '#0a0a0a'
    ctx.fillRect(rx, ry, 2, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.repeat.set(4, 1)
  return texture
}

export default function Lanyard({
  position = [0, 0.1, 9.2],
  gravity = [0, -45, 0],
  fov = 25,
  transparent = true,
  frontImage = pokeballImg,
  backImage = pokeballImg,
  lanyardImage = null,
  lanyardWidth = 0.9,
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={0.55} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>

        <Environment blur={0.65}>
          <Lightformer intensity={6} color="#ffffff" position={[0, 4, 5]} scale={[12, 1, 1]} />
          <Lightformer intensity={3} color="#ffffff" position={[-4, 1, 2]} scale={[5, 5, 1]} />
          <Lightformer intensity={4.5} color="#ffffff" position={[4, -1, 4]} scale={[3, 12, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({
  maxSpeed = 45,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  lanyardImage = null,
  lanyardWidth,
}) {
  const band = useRef(null)
  const fixed = useRef(null)
  const j1 = useRef(null)
  const j2 = useRef(null)
  const j3 = useRef(null)
  const card = useRef(null)
  const dragOffset = useRef(new THREE.Vector3())
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)

  const frontTex = useTexture(frontImage || BLANK_PIXEL)
  const backTex = useTexture(backImage || BLANK_PIXEL)

  const proceduralTex = useMemo(() => createPremiumWeaveTexture(), [])
  const customTex = useTexture(lanyardImage || BLANK_PIXEL)

  const fabricTex = useMemo(() => {
    if (lanyardImage && lanyardImage !== BLANK_PIXEL) {
      customTex.wrapS = THREE.RepeatWrapping
      customTex.wrapT = THREE.ClampToEdgeWrapping
      customTex.repeat.set(6, 1)
      return customTex
    }
    return proceduralTex
  }, [lanyardImage, customTex, proceduralTex])

  const vec = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const rot = useMemo(() => new THREE.Vector3(), [])

  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]), [])

  const cardGeometryWithHole = useMemo(() => {
    const w = 0.74, h = 1.02, r = 0.06
    const shape = new THREE.Shape()
    const x = -w / 2, y = -h / 2

    shape.moveTo(x, y + r)
    shape.lineTo(x, y + h - r)
    shape.quadraticCurveTo(x, y + h, x + r, y + h)
    shape.lineTo(x + w - r, y + h)
    shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r)
    shape.lineTo(x + w, y + r)
    shape.quadraticCurveTo(x + w, y, x + w - r, y)
    shape.lineTo(x + r, y)
    shape.quadraticCurveTo(x, y, x, y + r)

    const holePath = new THREE.Path()
    holePath.absarc(0, 0.43, 0.025, 0, Math.PI * 2, true)
    shape.holes.push(holePath)

    return new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.005, bevelThickness: 0.005 })
  }, [])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.95])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.95])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.95])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 0.46, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({
        x: vec.x - dragOffset.current.x,
        y: vec.y - dragOffset.current.y,
        z: vec.z - dragOffset.current.z,
      })
    }

    if (band.current && fixed.current && j1.current && j2.current && j3.current) {
      ;[j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped || j2.current.translation())
      curve.points[2].copy(j1.current.lerped || j1.current.translation())
      curve.points[3].copy(j1.current.translation()).lerp(fixed.current.translation(), 0.5)
      curve.points[4].copy(fixed.current.translation())

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 24 : 48))

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x * 0.88, y: (ang.y - rot.y * 0.45), z: ang.z * 0.88 })
    }
  })

  return (
    <>
      <group position={[0, 3.6, 0]}>
        <RigidBody ref={fixed} type="fixed" />

        <RigidBody ref={j1} position={[0, -0.6, 0]} type="dynamic" colliders={false} linearDamping={8.0} angularDamping={8.0}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody ref={j2} position={[0, -1.2, 0]} type="dynamic" colliders={false} linearDamping={6.0} angularDamping={6.0}><BallCollider args={[0.05]} /></RigidBody>
        <RigidBody ref={j3} position={[0, -1.8, 0]} type="dynamic" colliders={false} linearDamping={5.0} angularDamping={5.0}><BallCollider args={[0.05]} /></RigidBody>

        <RigidBody
          ref={card}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          position={[0, -2.4, 0]}
          angularDamping={4.5}
          linearDamping={4.5}
          colliders={false}
        >
          <CuboidCollider args={[0.7, 1.0, 0.02]} />

          <group
            scale={[1.95, 1.95, 1.95]}
            position={[0, -0.4, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e) => {
              e.stopPropagation()
              e.target.setPointerCapture(e.pointerId)
              const point = new THREE.Vector3().copy(e.point)
              dragOffset.current.copy(point).sub(card.current.translation())
              setDragged(true)
            }}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              setDragged(false)
            }}
          >
            {/* Tarjeta sólida premium */}
            <mesh geometry={cardGeometryWithHole} position={[0, 0, -0.01]}>
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.02}
                roughness={0.2}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
              />
            </mesh>

            {/* Gráfica frontal */}
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[0.72, 1.0]} />
              <meshStandardMaterial
                map={frontTex}
                roughness={0.25}
                transparent={true}
                alphaTest={0.01}
              />
            </mesh>

            {/* Gráfica trasera */}
            <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.72, 1.0]} />
              <meshStandardMaterial
                map={backTex}
                roughness={0.25}
                transparent={true}
                alphaTest={0.01}
              />
            </mesh>

            {/* Enganche */}
            <group position={[0, 0.43, 0]}>
              <mesh><torusGeometry args={[0.035, 0.008, 16, 32, Math.PI * 1.6]} /><meshStandardMaterial color="#1e1e1e" metalness={0.8} roughness={0.2} /></mesh>
              <mesh position={[0, 0.035, 0]}><cylinderGeometry args={[0.01, 0.01, 0.02, 16]} /><meshStandardMaterial color="#111111" metalness={0.7} roughness={0.3} /></mesh>
              <mesh position={[0, 0.075, 0]}><cylinderGeometry args={[0.04, 0.04, 0.05, 24]} /><meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} /></mesh>
              <mesh position={[0, 0.1, 0]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} /></mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* CINTA DINÁMICA */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={true}
          useMap={true}
          map={fabricTex}
          lineWidth={lanyardWidth}
          alphaTest={0.4}
          transparent={false}
        />
      </mesh>
    </>
  )
}