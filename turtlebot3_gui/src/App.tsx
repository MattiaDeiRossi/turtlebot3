import './App.css'
import { SocketContext, socket } from './socket/Client'
import Teleop from './components/Teleop/Teleop'
import Visualizer from './components/Visualizer/Visualizer'

function App() {
  return (
    <div className='rowC'>
      <Visualizer />
      <Teleop />
    </div>
  )

}

export default App

