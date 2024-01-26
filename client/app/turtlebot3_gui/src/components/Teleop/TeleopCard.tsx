import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import Slider from './Slider';
import './Teleop.css';
import { socket } from '../Socket/socket';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Cmd {
  isPressed: boolean;
  direction: string;
}

export default function Teleop() {
  const [sliderValue, setSliderValue] = useState(1);
  const [cmd, setIsPressed] = useState<Cmd>({ isPressed: false, direction: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      if (cmd.isPressed) {
        move(cmd.direction);
      }
    }, 100); // Adjust the interval as needed

    return () => {
      move(cmd.direction);
      clearInterval(interval);
    };
  }, [cmd]);


  function move(direction: string) {
    socket.emit('move',
      {
        'direction': direction,
        'percentuage': sliderValue / 100
      });
  }

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Teleop</Card.Title>

        <div>
          <Slider sliderValue={sliderValue} setSliderValue={setSliderValue} ></Slider>
        </div>

        <div>
          <div className='rowR'>
            <Button variant="info"
              onMouseDown={() => setIsPressed({ isPressed: true, direction: 'fwd' })}
              onMouseUp={() => setIsPressed({ isPressed: false, direction: 'stop' })} >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
          </div>
          <div className='rowR'>
            <Button variant="info"
              onMouseDown={() => setIsPressed({ isPressed: true, direction: 'left' })}
              onMouseUp={() => setIsPressed({ isPressed: false, direction: 'stop' })} >
              <FontAwesomeIcon icon={faRotateLeft} />
            </Button>
            <Button variant="info"
              onMouseDown={() => setIsPressed({ isPressed: true, direction: 'bwd' })}
              onMouseUp={() => setIsPressed({ isPressed: false, direction: 'stop' })} >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button variant="info"
              onMouseDown={() => setIsPressed({ isPressed: true, direction: 'right' })}
              onMouseUp={() => setIsPressed({ isPressed: false, direction: 'stop' })} >
              <FontAwesomeIcon icon={faRotateRight} />
            </Button>

          </div>
        </div>
      </Card.Body>
    </Card >
  )
}