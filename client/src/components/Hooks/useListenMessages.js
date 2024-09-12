import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSocketContext } from '../Context/SocketContext'
import useConversation from "../Store/useConversation"
import NotificationSound from "../assets/sound/messenger.mp3";
import useGetConversation from './useGetConversation';

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages, selectedConversation } = useConversation()
    const { Conversations } = useGetConversation()
    

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            let newAudio = new Audio(NotificationSound)
            newAudio.play()

            toast(`New message`, {
                icon: '👋',
            });

            // If the message belongs to the currently selected conversation
            if (newMessage.receiverId === selectedConversation?._id || newMessage.senderId === selectedConversation?._id) {
                setMessages((prevMessages) => [...prevMessages, newMessage])
            }
            
        })
        return () => socket?.off("newMessage")
         // eslint-disable-next-line
    }, [ setMessages, messages, selectedConversation, Conversations])
}

export default useListenMessages