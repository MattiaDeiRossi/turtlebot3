import { useEffect, useState } from "react";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";
import { Events } from "./Events"
import { socket } from "./socket";

import Card from 'react-bootstrap/Card';

function SocketCard() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Connection</Card.Title>
                <div className="d-flex justify-content-center mb-3">
                    <ConnectionManager />
                </div>

                <ConnectionState isConnected={isConnected} />
                <Events events={fooEvents} />
            </Card.Body>

        </Card>
    )
}

export default SocketCard;