import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, useGLTF } from '@react-three/drei';
import { AnimationMixer } from 'three';
import './av.css'



function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('avatar/6647468570a01e271f0d2bbb.glb');
  
  const fbx = useFBX('animation/Standing Greeting.fbx');

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
    <group ref={group} {...props} dispose={null} scale={1.5}>
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


function Khouava() {

  const [showModel, setShowModel] = useState(false);

  const handleClick = () => {
    setShowModel(true);
  };

  const handleConfirm = () => {
    // Mettre ici la logique à exécuter lorsque l'utilisateur clique sur "Définir"
    alert("Votre photo est définie comme avatar !");
    setShowModel(false);
  };

  const handleCancel = () => {
    // Mettre ici la logique à exécuter lorsque l'utilisateur clique sur "Annuler"
    setShowModel(false);
  };

  return (
    <div className='avakhou' style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <spotLight intensity={1.5} angle={0.3} penumbra={1} position={[10, 15, 10]} castShadow />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 10, 10]} intensity={1.5} />
          <Model />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
      {showModel && (
  <div className='photo-modal-overlay'>
    <div className='photo-modal-content'>
      <p>Voulez-vous définir votre photo comme avatar ?</p>
      <button className="modal-button" onClick={handleConfirm}>Définir</button>
      <button className="modal-button" onClick={handleCancel}>Annuler</button>
    </div>
  </div>
)}

      <div style={{ textAlign: 'center', position: 'absolute', bottom: '20px', width: '100%' }}>
      <p style={{ marginTop: '-200px', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleClick}>Cliquez pour transformer votre photo en avatar</p>
      </div>
    </div>
  );
}


export default Khouava;
