import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket = io('https://purrviews-api.onrender.com:10000', {autoConnect: true});
export const SocketContext = createContext(null);