import { useState,useEffect } from 'react'
import { toast } from "react-hot-toast"

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [Conversations, setConversations] = useState([])
    useEffect(() => {
        setLoading(true)
        const getConversations = async () => {
            try {
                const res = await fetch("/api/users")
                let data = await res.json()
                if (!res.ok) {
                    toast.error(data.msg)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.msg)
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [])
    return {loading,Conversations}
}

export default useGetConversation