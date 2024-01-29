import './App.css'
import ThreeScene from './components/Visualizer/ThreeScene';
import Nav2Card from './components/Nav2/Nav2Card';
import { SocketContext, socket } from './components/RosConnection/RosContext';

function App() {

  return (
    <SocketContext.Provider value={socket}>
      <div className='rowC'>
        <ThreeScene />
        <div className='rowR'>
          {/* <RosConnection /> */}
          <Nav2Card />
        </div>
      </div>
    </SocketContext.Provider>
  )

}

export default App

