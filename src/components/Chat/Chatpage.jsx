import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import { baseURL } from "../../config/AxiosHelper";
import { getMessagess } from "../../services/RoomService";
import { timeAgo } from "../../config/helper";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChatPage = () => {
    const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);
    const stompClientRef = useRef(null);
    // Redirect to home if not connected
    useEffect(() => {
        if (!roomId) {
            navigate("/dashboard/college-chat"); //changed
        }
    }, [connected, roomId, currentUser]);

    // Load previous messages once
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

    // Scroll down when messages update
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // Initialize WebSocket connection
    useEffect(() => {
        if (stompClientRef.current || !connected) return; // Prevent duplicate connections

        const sock = new SockJS(`${baseURL}/chat`);
        console.log(sock);

        const client = Stomp.over(() => new SockJS(`${baseURL}/chat`));

        client.connect({}, () => {
            stompClientRef.current = client;
            toast.success("Connected");

            client.subscribe(`/api/v1/topic/rooms/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);

                // Avoid adding duplicate messages
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

    // Send message
    const sendMessage = async () => {
        if (stompClientRef.current && connected && input.trim()) {
            const message = {
                sender: currentUser,
                content: input,
                roomId: roomId,
                timestamp: new Date().toISOString(),
            };

            stompClientRef.current.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
            setInput("");
        }
    };

    // // Handle logout
    // function handleLogout() {
    //     if (stompClientRef.current) {
    //         stompClientRef.current.disconnect();
    //         stompClientRef.current = null;
    //     }
    //     setConnected(false);
    //     navigate("/dashboard");
    // }

    const handleCollegeClick = () => {
        navigate(`/dashboard/college-chat/${roomId}/users`);
    };

    return (
        <div>
            {/* Header */}
            <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center pt-28">
                <div>
                    <h1 className="text-xl font-semibold">College Name: <span onClick={() => handleCollegeClick()}>{roomId}</span></h1>
                </div>
                {/* <div>
                    <h1 className="text-xl font-semibold">User: <span>{currentUser}</span></h1>
                </div> */}
                {/* <div>
                    <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
                        Leave Room
                    </button>
                </div> */}
            </header>

            {/* Chat Messages */}
            <main ref={chatBoxRef} className="py-20 px-10 w-full dark:bg-slate-600 mx-auto h-screen overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
                        <div className={`my-2 ${message.sender === currentUser ? "bg-green-800" : "bg-gray-800"} p-2 max-w-xs rounded`}>
                            <div className="flex flex-row gap-2">
                                <Link to={`/dashboard/profile/${message.sender}`}>
                                    <img className="h-10 w-10" src={`https://github.com/${message.sender}.png`} alt="" />
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold">{message.sender}</p>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-gray-400">{timeAgo(message.timestamp)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* Input Box */}
            <div className="fixed bottom-4 w-full h-16">
                <div className="h-full pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        type="text"
                        placeholder="Type your message here..."
                        className="w-full dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-full focus:outline-none"
                    />
                    <div className="flex gap-1">
                        <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
                            <MdAttachFile size={20} />
                        </button>
                        <button onClick={sendMessage} className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full">
                            <MdSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
