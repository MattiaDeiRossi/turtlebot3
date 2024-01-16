import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, OrbitControls, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { TFMessage, TransformStamped, Transform, Tf } from '../interfaces';
import { socket } from '../Socket/socket';
import './Render.css';

const Render = () => {
  const [fooEvents, setFooEvents] = useState([]);
  const box = useRef();

  useEffect(() => {
    function onFooEvent(msg: Tf) {
      // box.current.position.x = msg.x
      // box.position.set

      

      // box.current.rotation.x = msg.xx
      // box.current.rotation.y = msg.yy
      // box.current.rotation.z = msg.zz
      // box.current.rotation.w = msg.ww
      // console.log(msg.x)
      // setFooEvents(fooEvents.concat(msg));
      box.position.set(msg.translation.x, msg.translation.y, msg.translation.z);
      // box.quaternion.set(msg.rotation.x, msg.rotation.y, msg.rotation.z, msg.rotation.w);
  
    }
  
    socket.on('tf', onFooEvent);
  
    return () => {
      socket.off('tf', onFooEvent);
    };
  }, [fooEvents]);

  return (
    <Canvas className="visualizer" style={{ width: '100%', height: '95vh' }}
      camera={{ position: [-5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Grid position={[0, -0.01, 0]} args={[10, 10]}/>

      <Box ref={box} args={[1.0, 1.0, 1.0]} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={'red'} />
      </Box>

      <OrbitControls makeDefault />
      <axesHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
      </GizmoHelper>
    </Canvas >

  )
}

export default Render;