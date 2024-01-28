import Card from 'react-bootstrap/Card';
import PoseCreator from './PoseCreator';


export default function Nav2Card() {

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Nav2</Card.Title>

        <PoseCreator />

      </Card.Body>
    </Card >
  )
}