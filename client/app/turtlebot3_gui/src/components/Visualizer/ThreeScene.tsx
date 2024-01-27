import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Shadow } from '@react-three/drei'
import { useEffect } from 'react';
import { Tf } from '../interfaces';
import { socket } from '../Socket/socket';
import './ThreeScene.css';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';

function TurtleBot() {
  const { scene } = useThree()
  const manager = new THREE.LoadingManager();
  const loader = new URDFLoader(manager);
  loader.load('/turtlebot3_description/urdf/turtlebot3_burger.urdf', robot => {
    robot.rotateX(-Math.PI / 2)
    scene.add(robot);
  });
  return (<></>)
}

const ThreeScene = () => {


  useEffect(() => {
    function onFooEvent(msg: Tf) {
      console.log(msg)
      // if (box) {
      //   box.position.set(100, 100, 100)
      //   box.current.position.x = msg.x;
      //   box.current.position.y = msg.y;
      //   box.current.position.z = msg.z;

      //   box.current.rotation.x = msg.xx;
      //   box.current.rotation.y = msg.yy;
      //   box.current.rotation.z = msg.zz;
      // }

      // box.current.rotation.w = msg.ww;
    }

    socket.on('tf', onFooEvent);

    return () => {
      socket.off('tf', onFooEvent);
    };
  }, []);

  return (
    <Canvas shadows className="visualizer" style={{ width: '100%', height: '95vh' }} camera={{ position: [-1, 1, 1], fov: 25 }}>
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />

      <Shadow
        color="blue"
        colorStop={0}
        opacity={0.5}
        fog={false}
      />
      <TurtleBot />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    </Canvas >

  )
}

export default ThreeScene;