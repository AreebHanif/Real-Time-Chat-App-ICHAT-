import { useState } from 'react'
import useConversation from '../Store/useConversation'
import { toast } from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const sendMessage = async (message) => {
        try {
            setLoading(true)
            console.log("before fetch")
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ message })
            })
            console.log("after fetch")
            let data = await res.json()
            if (!res.ok) {
                toast.error(data.status)
            }
            else {
                setMessages([ ...messages, data ])
            }
        } catch (error) {
            toast.error(error.msg)
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }

}

export default useSendMessage
