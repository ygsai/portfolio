import { useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei' 
import * as THREE from 'three'

type PortfolioSceneProps = ThreeElements['group'] & {
  scrollProgress: MutableRefObject<number>
}

export default function PortfolioScene({ scrollProgress, ...props }: PortfolioSceneProps) {
  const eyeRef = useRef<THREE.Group>(null!)
  const spinRef = useRef<THREE.Group>(null!) 
  const envRef = useRef<THREE.Group>(null!) 
  
  // Pointing to your new 4MB optimized model
  const { nodes, materials } = useGLTF('/models/portfolio-scene-transformed.glb') as any
  
  const { viewport, size } = useThree()
  const isMobile = size.width < 768
  const responsiveScale = Math.min(1, viewport.aspect * 0.9)

  useFrame((_, delta) => {
    if (!eyeRef.current || !spinRef.current || !envRef.current) return

    spinRef.current.rotation.y += delta * 1.5

    const currentScroll = isMobile ? 0 : scrollProgress.current

    const START_POS = new THREE.Vector3(-1.1, 1.6, 0.0) 
    const TARGET_POS = new THREE.Vector3(0, 0, -1) 
    
    const pos = new THREE.Vector3().lerpVectors(START_POS, TARGET_POS, currentScroll)
    eyeRef.current.position.copy(pos)

    const scale = THREE.MathUtils.lerp(1, 40, currentScroll)
    eyeRef.current.scale.setScalar(scale)

    envRef.current.position.z = THREE.MathUtils.lerp(0, 60, currentScroll)
  })

  return (
    <group {...props} scale={responsiveScale} dispose={null} rotation={[0, Math.PI, 0]}>
      
      {/* ==========================================
          1. THE GIRL AND TREE ENVIRONMENT 
         ========================================== */}
      <group ref={envRef}>
        <mesh geometry={nodes.foliage_baked_flowers_0.geometry} material={materials.baked_flowers} />
        <mesh geometry={nodes.oreada_baked_oreada_0.geometry} material={materials.baked_oreada} />
        <mesh geometry={nodes.rocks_baked_rocks_0.geometry} material={materials.baked_rocks} />
        <mesh geometry={nodes.ropes_baked_rope_0.geometry} material={materials.baked_rope} />
        <mesh geometry={nodes.tree_baked_tree_0.geometry} material={materials.baked_tree} />
      </group>

      {/* ==========================================
          2. THE ANIMATED EYE (LENS OF TRUTH) 
         ========================================== */}
      <group ref={eyeRef}>
        <group ref={spinRef}>
          <Center>
            <mesh geometry={nodes.Cylinder002_LensGoldButton_Mat_0.geometry} material={materials.LensGoldButton_Mat} />
            <mesh geometry={nodes.Cylinder003_LensSpike_Mat_0.geometry} material={materials.LensSpike_Mat} />
            <mesh geometry={nodes.Sphere_LensGlass_Mat_0.geometry} material={materials.LensGlass_Mat} />
            <mesh geometry={nodes.Sphere001_LensEye_Mat_0.geometry} material={materials.LensEye_Mat} />
            <mesh geometry={nodes.Torus001_LensGrip_Mat_0.geometry} material={materials.LensGrip_Mat} />
            <mesh geometry={nodes.Torus001_LensGripGold_Mat_0.geometry} material={materials.LensGripGold_Mat} />
          </Center>
        </group>
      </group>

    </group>
  )
}

useGLTF.preload('/models/portfolio-scene-transformed.glb')