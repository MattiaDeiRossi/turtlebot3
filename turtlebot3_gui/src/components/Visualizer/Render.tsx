import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, OrbitControls, GizmoHelper, GizmoViewport, Box, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { TFMessage, TransformStamped, Transform, Tf } from '../interfaces';
import { socket } from '../Socket/socket';
import './Render.css';
import * as THREE from 'three';
// import Model from '../Turtlebot/Model';

function Model() {
  const { scene } = useGLTF('/burger_base.glb')
  return <primitive object={scene} />
}

const Render = () => {
  const box = useRef<THREE.Mesh>(null);
  const root = new THREE.Group();
  const XZYMatrix = new THREE.Matrix4().set(
    0, 1, 0, 0,
    0, 0, 1, 0,
    1, 0, 0, 0,
    0, 0, 0, 1
  );
  root.applyMatrix4(XZYMatrix);
  useEffect(() => {
    function onFooEvent(msg: Tf) {
      if(box){
        box.position.set(100, 100, 100)
        box.current.position.x = msg.x;
        box.current.position.y = msg.y;
        box.current.position.z = msg.z;
  
        box.current.rotation.x = msg.xx;
        box.current.rotation.y = msg.yy;
        box.current.rotation.z = msg.zz;
      }

      box.current.rotation.w = msg.ww; 
    }
  
    socket.on('tf', onFooEvent);
  
    return () => {
      socket.off('tf', onFooEvent);
    };
  }, [box]);

  return (
    <Canvas className="visualizer" style={{ width: '100%', height: '95vh' }}
      camera={{ position: [-5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Grid position={[0, -0.01, 0]} args={[10, 10]}/>

      <mesh ref={box} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={'red'} />
      </mesh>

      <Model></Model>

      <OrbitControls makeDefault />
      <axesHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
      </GizmoHelper>
    </Canvas >

  )
}

export default Render;