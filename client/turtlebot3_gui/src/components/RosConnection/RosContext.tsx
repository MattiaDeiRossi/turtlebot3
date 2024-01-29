import { createContext } from 'react';
import ROSLIB from 'roslib'

export const socket = new ROSLIB.Ros({});
socket.connect('ws://localhost:9090');

export const SocketContext = createContext(null);