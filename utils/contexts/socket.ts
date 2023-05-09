import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket = io('http://10.0.0.6:9090', {autoConnect: true});
export const SocketContext = createContext(null);