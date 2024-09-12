import { useState, createContext, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from '../Context/authcontext';

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5000', {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Listen for online users from server
      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      // Clean up socket connection when component unmounts or user changes
      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    } else {
      // If authUser is null, close socket if it's still open
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
