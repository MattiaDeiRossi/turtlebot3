import './App.css'
import TeleopCard from './components/Teleop/TeleopCard'
import SocketCard from "./components/Socket/SocketCard";
import ThreeScene from './components/Visualizer/ThreeScene';
import Nav2Card from './components/Nav2/Nav2Card';

function App() {

  return (
    <div className='rowC'>
      <ThreeScene />
      <div className='rowR'>
        <SocketCard />
        <TeleopCard />
        <Nav2Card/>
      </div>

    </div>
  )

}

export default App

