import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios } = useContext(AuthContext);

    const getUsers = async () => {
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.users){
                console.log('Setting users:', data.users.length, 'users');
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages || {});
            } else {
                console.log('No users in response:', data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error fetching users");
        }
    };

    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const sendMessage = async (messageData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessages((prevMessages) => [...prevMessages, data.message]);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const subscribeToMessages = async () =>{
        if(!socket) return;
        socket.on("newMessage", (newMessage) => {
           if(selectedUser && newMessage.senderId === selectedUser._id){
              newMessage.seen = true;
              setMessages((prevMessages) => [...prevMessages, newMessage]);
              axios.put(`/api/messages/mark/${newMessage._id}`);
           }else{
               setUnseenMessages((prevUnseenMessages) => ({
                   ...prevUnseenMessages,
                   [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
               }));
           }
        });
    }

    const unSubscribeFromMessages = () => {
        if(socket) socket.off("newMessage");
    };

    useEffect(() => {
        subscribeToMessages();
        return () => unSubscribeFromMessages();
    }, [socket, selectedUser]);

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        setMessages,
        sendMessage,
        getMessages,
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
