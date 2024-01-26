import Button from 'react-bootstrap/Button';
import { socket } from './socket';

export function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <div className='rowC mt-4'>
            <Button variant="primary" size="sm" onClick={connect}>Connect</Button>
            <Button variant="secondary" size="sm" onClick={disconnect}>Disconnect</Button>
        </div>
    );
}