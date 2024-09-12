import { useEffect, useState } from 'react'
import useConversation from "../Store/useConversation"
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {

        const getMessage = async () => {

            try {
                setLoading(true)
                const res = await fetch(`/api/message/${selectedConversation._id}`)
                let data = await res.json()
                if (!res.ok) {
                    return toast.error(data.msg)
                }
                if (JSON.stringify(messages) !== JSON.stringify(data)) {
                    setMessages(data);
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessage()
    }, [selectedConversation?._id,messages,setMessages])
    return { loading, messages }
}

export default useGetMessages

