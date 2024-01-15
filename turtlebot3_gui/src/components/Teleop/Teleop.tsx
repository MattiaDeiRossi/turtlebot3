import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUp, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { SocketContext } from '../../socket/Client';
import Slider from './Slider';
import './Teleop.css';

export default function Teleop() {
  const socket = useContext(SocketContext);
  const [sliderValue, setSliderValue] = useState(50);

  const move = (direction) => {
    socket.emit('move',
      {
        'direction': direction,
        'percentuage': sliderValue / 100
      });
  }

  return (
    <div className="teleop">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Slider sliderValue={sliderValue} setSliderValue={setSliderValue} ></Slider>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <button onClick={() => move('left')} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={() => move('fwd')} >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button onClick={() => move('right')} >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button onClick={() => move('bwd')} >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>

    </div >
  )
}