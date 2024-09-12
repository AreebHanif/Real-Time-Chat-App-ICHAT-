import React from 'react'
import useConversation from './Store/useConversation'
import { useSocketContext } from './Context/SocketContext'

export default function Conversation({ user }) {
    
    const { selectedConversation, setSelectedConversation } = useConversation()
    const isSelected = selectedConversation?._id === user._id
    const {onlineUsers=[]} = useSocketContext()
    const isOnline = onlineUsers.includes(user._id)
    

    const changeName = (name)=>{
        const newName =  name.split(' ')[0][0].toUpperCase() + name.split(' ')[0].slice(1)
        return newName
    }

    return (
        <div className={`user ${isSelected ? "sec-user" : ""} `}
        onClick={()=> setSelectedConversation(user)}
        >
            <img src={user.profilePic} alt="avatar" />
            <span className="user-info">
                <p className={`title `}>{changeName(user.name)}</p>
            </span>
            <span className="status"><p className={isOnline ? 'online' : "offline"}>{isOnline ? "Online" : "Offline"}</p></span>
        </div>
    )
}

