import './App.css'
import Teleop from './components/Teleop/TeleopCard'
import SocketPanel from "./components/Socket/SocketCard";
import ThreeScene from './components/Visualizer/ThreeScene';

function App() {

  return (
    <div className='rowC'>
      <ThreeScene />
      <div className='rowR'>
        <SocketPanel />
        <Teleop />
      </div>

    </div>
  )

}

export default App

