import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import { baseURL } from "../../config/AxiosHelper";
import { timeAgo } from "../../config/helper";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMessagesOfAStudyGroup } from "../../services/StudyGroupService";

const StudyGroupChat = ({ studyGroupName }) => {
    const [connected, setConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [groupName, setGroupName] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const chatBoxRef = useRef(null);
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Set user and group name from props/localStorage
    useEffect(() => {
        const user = localStorage.getItem("username");
        setCurrentUser(user || "");
        setGroupName(studyGroupName || "");
        setConnected(!!studyGroupName);
    }, [studyGroupName]);

    // Redirect if no group is selected
    useEffect(() => {
        if (!groupName) {
            navigate("/dashboard/study-groups");
        }
    }, [groupName, navigate]);

    // Load previous messages
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const fetchedMessages = await getMessagesOfAStudyGroup(groupName);
                setMessages(fetchedMessages); // ✅ No reverse, store in original order
            } catch (error) {
                console.error("Error loading messages:", error);
            }
        };

        if (connected) {
            loadMessages();
        }
    }, [groupName, connected]);

    // Auto-scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // WebSocket connection setup
    useEffect(() => {
        if (!groupName || stompClientRef.current) return;

        const sock = new SockJS(`${baseURL}/chat`);
        const client = Stomp.over(() => new SockJS(`${baseURL}/chat`));

        client.connect({}, () => {
            stompClientRef.current = client;
            toast.success("Connected to chat");

            client.subscribe(`/api/v1/topic/studyGroup/${studyGroupName}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]); // ✅ Append new messages at bottom
            });
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
                stompClientRef.current = null;
            }
        };
    }, [groupName]);

    // Send message
    const sendMessage = () => {
        if (stompClientRef.current && connected && input.trim()) {
            const message = {
                sender: currentUser,
                content: input,
                groupName,
                timestamp: new Date().toISOString(),
            };

            stompClientRef.current.send(
                `/app/studyGroup/sendMessage/${groupName}`,
                {},
                JSON.stringify(message)
            );

            setInput("");
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="dark:border-gray-700 py-5 shadow flex justify-center items-center dark:bg-gray-900">
                <Link to={`/dashboard/study-group/${groupName}/users`}>
                    <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
                        {groupName} Group
                    </h1>
                </Link>
            </header>

            {/* Chat Messages */}
            <main
                ref={chatBoxRef}
                className="flex-1 px-10 py-4 dark:bg-slate-600 overflow-y-auto h-full max-h-[calc(100vh-160px)]"
            >
                <div className="flex flex-col gap-3">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`my-2 ${message.sender === currentUser ? "bg-green-800" : "bg-gray-800"} p-3 max-w-xs rounded-lg`}
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
                                        <p className="text-xs text-gray-400">{timeAgo(message.timestamp)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Auto-scroll to latest message */}
                    <div ref={messagesEndRef} />
                </div>
            </main>


            {/* Input Box */}
            <div className="w-full px-10 py-4 bg-gray-900">
                <div className="flex items-center gap-4 w-full mx-auto max-w-2xl bg-gray-800 p-3 rounded-full">
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

export default StudyGroupChat;
