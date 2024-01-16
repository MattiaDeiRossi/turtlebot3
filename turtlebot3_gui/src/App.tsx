import './App.css'
import Teleop from './components/Teleop/TeleopCard'
import Render from './components/Visualizer/Render'
import { useEffect, useState } from 'react';
import SocketPanel from "./components/Socket/SocketCard";

function App() {

  return (
    <div className='rowC'>
      <Render />
      <div className='rowR'>
        <SocketPanel />
        <Teleop />
      </div>

    </div>
  )

}

export default App

