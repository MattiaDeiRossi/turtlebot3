import React from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  autoConnect: true,
  // transports: ['websocket']
});
export const SocketContext = React.createContext();
