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
            <button className='btn btn-info sm'  onClick={connect}>Connect</button>
            <button className='btn btn-info sm' onClick={disconnect}>Disconnect</button>
        </div>
    );
}