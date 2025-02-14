import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const [roomId, setRoomId] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const clg = localStorage.getItem("college");
    const user = localStorage.getItem("username")

    clg ? setRoomId(clg) : setRoomId(null)
    console.log(roomId);
    clg ? setConnected(true) : setConnected(false)
    console.log(connected);
    user ? setCurrentUser(user) : setCurrentUser(null)
    console.log(currentUser);

  }, [])
  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        connected,
        setRoomId,
        setCurrentUser,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
