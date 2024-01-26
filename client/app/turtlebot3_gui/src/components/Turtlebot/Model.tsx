import { useGLTF } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF('assets/burger_base.glb')
  return <primitive object={scene} />
}

export default Model