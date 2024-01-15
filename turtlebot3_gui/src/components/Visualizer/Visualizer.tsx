import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Grid, OrbitControls, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { useRef } from 'react';

const Visualizer = () => {
  const box = useRef();
  function updatePose() {
    box.current.position.x += 1.0
    box.current.position.y += 1.0
  }

  return (
    <Canvas className="visualizer" style={{ width: '100%', height: '100vh' }}
      camera={{ position: [-5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Grid position={[0, -0.01, 0]} args={[10, 10]} />

      <Box ref={box} args={[1.0, 1.0, 1.0]} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={'red'} />
      </Box>

      <OrbitControls makeDefault />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
      </GizmoHelper>
    </Canvas >

  )
}

export default Visualizer;