import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Shadow } from '@react-three/drei'
import { useContext, useEffect, useState } from 'react';
import './ThreeScene.css';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';
import { Topic } from 'roslib';
import { SocketContext } from '../RosConnection/RosContext';
let rb;

function TurtleBot() {
  const { scene } = useThree()
  const manager = new THREE.LoadingManager();
  const loader = new URDFLoader(manager);
  loader.load('/turtlebot3_description/urdf/turtlebot3_burger.urdf', robot => {
    robot.rotateX(-Math.PI / 2)
    scene.add(robot);
    rb = robot;
  });
  return (<></>)
}

const ThreeScene = () => {
  const ros = useContext(SocketContext);
  const [shadow, setShadow] = useState('green');

  useEffect(() => {
    const joint_states = new Topic({
      ros: ros,
      name: "joint_states",
      messageType: "sensor_msgs/JointState",
      throttle_rate: 500 // TOBE tested
    })

    joint_states.subscribe(onJointStates);


    function onJointStates(msg) {
      if (msg.velocity[0] != 0 || msg.velocity[1] != 0)
        setShadow('blue')
      else
        setShadow('green')
      if (rb.joints) {
        rb.joints['wheel_right_joint'].setJointValue(msg.position[0]);
        rb.joints['wheel_left_joint'].setJointValue(msg.position[1]);
      }

    }

    return () => {
      joint_states.unsubscribe();
    };
  }, []);

  return (
    <Canvas shadows className="visualizer" style={{ width: '100%', height: '95vh' }} camera={{ position: [-1, 1, 1], fov: 25 }}>
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />

      <Shadow
        color={shadow}
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