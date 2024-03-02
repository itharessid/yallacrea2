import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[3517.17, -480.58, 1020.67]} rotation={[1.17, 0.73, 0.28]} />
        <lineSegments geometry={nodes.Material4.geometry} material={nodes.Material4.material} />
        <mesh geometry={nodes.Material3.geometry} material={materials.fuselaje1} />
        <lineSegments geometry={nodes.Material3_1.geometry} material={nodes.Material3_1.material} />
        <mesh geometry={nodes.Material2.geometry} material={materials.beacon} />
        <mesh geometry={nodes.Material3_2.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Material2_1.geometry} material={materials.material} />
        <mesh geometry={nodes.Material3_3.geometry} material={materials.material_8} />
        <mesh geometry={nodes.Material2_2.geometry} material={materials.wing} />
        <mesh geometry={nodes.Material2_3.geometry} material={materials.Translucent_Glass_Gray_8} />
        <mesh geometry={nodes.Material2_4.geometry} material={nodes.Material2_4.material} />
        <mesh geometry={nodes.Material2_5.geometry} material={nodes.Material2_5.material} />
        <mesh geometry={nodes.Material3_4.geometry} material={materials['0133_Gray']} />
        <lineSegments geometry={nodes.Material4_1.geometry} material={nodes.Material4_1.material} />
        <mesh geometry={nodes.Material3_5.geometry} material={materials.material_10} />
        <mesh geometry={nodes.Material2_6.geometry} material={nodes.Material2_6.material} />
        <mesh geometry={nodes.Material2_7.geometry} material={nodes.Material2_7.material} />
        <mesh geometry={nodes.Material2_8.geometry} material={nodes.Material2_8.material} />
        <mesh geometry={nodes.Material3_6.geometry} material={nodes.Material3_6.material} />
        <mesh geometry={nodes.Material3_7.geometry} material={nodes.Material3_7.material} />
        <mesh geometry={nodes.Material3_8.geometry} material={materials['0128_White_1']} />
        <mesh geometry={nodes.Material2_9.geometry} material={materials.NAV1} />
        <mesh geometry={nodes.Material2_10.geometry} material={materials.material_19} />
        <mesh geometry={nodes.Material2_11.geometry} material={materials['0131_Silver_1']} />
        <mesh geometry={nodes.Material2_12.geometry} material={materials.Color_000} />
        <mesh geometry={nodes.Material3_9.geometry} material={materials.Color_004_2} />
        <mesh geometry={nodes.Material3_10.geometry} material={materials.Color_003} />
        <lineSegments geometry={nodes.Material3_11.geometry} material={nodes.Material3_11.material} />
        <mesh geometry={nodes.Material2_13.geometry} material={materials.Translucent_Glass_Gray_6} />
        <mesh geometry={nodes.Material2_14.geometry} material={materials['0134_DimGray']} />
        <mesh geometry={nodes.Material2_15.geometry} material={materials['0137_Black']} />
        <lineSegments geometry={nodes.Material3_12.geometry} material={nodes.Material3_12.material} />
        <lineSegments geometry={nodes.Material4_2.geometry} material={nodes.Material4_2.material} />
        <mesh geometry={nodes.Material2_16.geometry} material={materials['0136_Charcoal']} />
        <lineSegments geometry={nodes.Material5.geometry} material={nodes.Material5.material} />
        <mesh geometry={nodes.Material3_13.geometry} material={materials.material_13} />
        <mesh geometry={nodes.Material2_17.geometry} material={materials.White} />
        <lineSegments geometry={nodes.Material5_1.geometry} material={nodes.Material5_1.material} />
        <lineSegments geometry={nodes.Material8.geometry} material={nodes.Material8.material} />
        <lineSegments geometry={nodes.Material9.geometry} material={nodes.Material9.material} />
        <lineSegments geometry={nodes.Material5_2.geometry} material={nodes.Material5_2.material} />
        <lineSegments geometry={nodes.Material6.geometry} material={nodes.Material6.material} />
        <mesh geometry={nodes.Material3_14.geometry} material={materials.material_12} />
        <mesh geometry={nodes.Material2_18.geometry} material={materials.LightSlateGray} />
        <mesh geometry={nodes.Material3_15.geometry} material={materials['0131_Silver']} />
        <mesh geometry={nodes.Material3_16.geometry} material={materials.material_1} />
        <mesh geometry={nodes.Material3_17.geometry} material={materials['00087']} />
        <lineSegments geometry={nodes.Material3_18.geometry} material={nodes.Material3_18.material} />
        <mesh geometry={nodes.Material3_19.geometry} material={materials['0135_DarkGray']} />
        <mesh geometry={nodes.Material2_19.geometry} material={materials.material_15} />
        <mesh geometry={nodes.Material3_20.geometry} material={materials.windows2} />
        <mesh geometry={nodes.Material3_21.geometry} material={materials.material_5} />
        <mesh geometry={nodes.Material2_20.geometry} material={materials.windows} />
        <mesh geometry={nodes.Material2_21.geometry} material={materials['0020_Red_1']} />
        <lineSegments geometry={nodes.Material7.geometry} material={nodes.Material7.material} />
        <lineSegments geometry={nodes.Material6_1.geometry} material={nodes.Material6_1.material} />
        <mesh geometry={nodes.Material3_22.geometry} material={materials['Off-White']} />
        <mesh geometry={nodes.Material2_22.geometry} material={materials.wippitot} />
        <lineSegments geometry={nodes.Material3_23.geometry} material={nodes.Material3_23.material} />
        <mesh geometry={nodes.Material2_23.geometry} material={materials.wheels} />
        <mesh geometry={nodes.Material3_24.geometry} material={materials.Silver} />
        <mesh geometry={nodes.Material3_25.geometry} material={materials.material_63} />
        <mesh geometry={nodes.Material3_26.geometry} material={materials.lightgear} />
        <lineSegments geometry={nodes.Material4_3.geometry} material={nodes.Material4_3.material} />
        <lineSegments geometry={nodes.Material3_27.geometry} material={nodes.Material3_27.material} />
        <lineSegments geometry={nodes.Material2_24.geometry} material={nodes.Material2_24.material} />
        <lineSegments geometry={nodes.Material4_4.geometry} material={nodes.Material4_4.material} />
        <lineSegments geometry={nodes.Material4_5.geometry} material={nodes.Material4_5.material} />
        <lineSegments geometry={nodes.Material4_6.geometry} material={nodes.Material4_6.material} />
        <lineSegments geometry={nodes.Material2_25.geometry} material={nodes.Material2_25.material} />
        <lineSegments geometry={nodes.Material3_28.geometry} material={nodes.Material3_28.material} />
        <lineSegments geometry={nodes.Material2_26.geometry} material={nodes.Material2_26.material} />
        <lineSegments geometry={nodes.Material2_27.geometry} material={nodes.Material2_27.material} />
        <lineSegments geometry={nodes.Material5_3.geometry} material={nodes.Material5_3.material} />
        <lineSegments geometry={nodes.Material2_28.geometry} material={nodes.Material2_28.material} />
        <lineSegments geometry={nodes.Material2_29.geometry} material={nodes.Material2_29.material} />
        <lineSegments geometry={nodes.Material2_30.geometry} material={nodes.Material2_30.material} />
      </group>
    </group>
  )
}