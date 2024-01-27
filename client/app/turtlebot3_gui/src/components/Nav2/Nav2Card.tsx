import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { PoseList } from './PoseList';
import { Pose } from "../interfaces";


export default function Nav2Card() {
  const [poses, setPoses] = useState<Pose[]>([]);

  useEffect(() => {
    fetch('l')
      .then((res) => res.json())
      .then((data : Pose[]) => {
         console.log(data);
         setPoses(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
  }, []);

  const handleButtonClick = (id: string) => {
    fetch('https://mywebsite.example/endpoint/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  };

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Nav2</Card.Title>

        <PoseList poses={poses} onButtonClick={handleButtonClick} />

      </Card.Body>
    </Card >
  )
}