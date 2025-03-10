import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend, MdEmojiEmotions } from "react-icons/md";
import useChatContext from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import { baseURL } from "../../config/AxiosHelper";
import { getMessagess } from "../../services/RoomService";
import { timeAgo } from "../../config/helper";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected
  } = useChatContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!roomId) {
      navigate("/dashboard/college-chat");
    }
  }, [connected, roomId, currentUser]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const fetchedMessages = await getMessagess(roomId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, [roomId, connected]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (stompClientRef.current || !connected) return;

    const sock = new SockJS(`${baseURL}/chat`);
    console.log(sock);

    const client = Stomp.over(() => new SockJS(`${baseURL}/chat`));

    client.connect({}, () => {
      stompClientRef.current = client;
      toast.success("Connected");

      client.subscribe(`/api/v1/topic/rooms/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);

        setMessages((prev) => {
          if (!prev.find((msg) => msg.timestamp === newMessage.timestamp)) {
            return [...prev, newMessage];
          }
          return prev;
        });
      });
    });

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        stompClientRef.current = null;
      }
    };
  }, [roomId, connected]);

  const handleEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const sendMessage = async () => {
    if (stompClientRef.current && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
        timestamp: new Date().toISOString(),
      };

      stompClientRef.current.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Header */}
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center pt-28">
        <Link to={`/dashboard/college-chat/${roomId}/users`}>
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
              {roomId} College Community
            </h1>
          </div>
        </Link>
      </header>

      <main
        ref={chatBoxRef}
        className="flex-grow py-20 px-10 w-full dark:bg-slate-600 mx-auto overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`my-2 ${message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
                } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <Link to={`/dashboard/profile/${message.sender}`}>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://github.com/${message.sender}.png`}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="w-full px-10 py-4 bg-gray-900">
        <div className="flex items-center gap-4 w-full mx-auto max-w-2xl bg-gray-800 p-3 rounded-full relative">
          {/* Emoji Picker Button */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="dark:bg-yellow-600 h-10 w-10 flex justify-center items-center rounded-full"
          >
            <MdEmojiEmotions size={24} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-14 left-0 bg-white rounded-lg shadow-lg z-10">
              <EmojiPicker theme="dark" className="dark:bg-gray-900 dark:text-white" onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type your message here..."
            className="w-full bg-transparent text-white px-4 py-2 outline-none"
          />

          <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
            <MdAttachFile size={20} />
          </button>

          <button
            onClick={sendMessage}
            className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full"
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
