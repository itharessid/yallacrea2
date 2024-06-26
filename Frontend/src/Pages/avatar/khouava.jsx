import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, useFBX, useGLTF } from '@react-three/drei';
import { AnimationMixer, Euler } from 'three';
import './av.css';

function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/avatar/6647468570a01e271f0d2bbb.glb');
  const fbx = useFBX('/animation/Standing Greeting.fbx');
  const mixer = useRef(null);

  useEffect(() => {
    if (fbx.animations && group.current) {
      mixer.current = new AnimationMixer(group.current);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [fbx, group]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[1.5, 1.5, 1.5]}
      position={[0, -0.2, 0]} // Ajuster la position verticale
      rotation={[2, Math.PI, 3]} // Ajuster la rotation pour orienter l'avatar
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={nodes.EyeLeft.material}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={nodes.EyeRight.material}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

function CameraControls() {
  const { camera, gl: { domElement } } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 4); // Position de la caméra
    camera.lookAt(0, 0, 0); // Point vers lequel la caméra regarde
  }, [camera]);

  return <OrbitControls target={[0, 0.5, 0]} enablePan={true} enableZoom={true} enableRotate={true} args={[camera, domElement]} />;
}

function Khouava() {
  return (
    <div className='avakhou' style={{ width: '400px', height: '700px', position: 'relative' }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <spotLight intensity={1.5} angle={0.3} penumbra={1} position={[10, 15, 10]} castShadow />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 10, 10]} intensity={1.5} />
          <Model />
          <CameraControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Khouava;
