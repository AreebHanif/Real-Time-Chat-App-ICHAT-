import React from 'react'
import Sidebar from "./Sidebar"
import MessageContainer from "./MessageContainer"
import NotSelected from './NotSelected'
import useConversation from './Store/useConversation'

export default function Chat() {
  const { selectedConversation } = useConversation();
  return (
    <div className="container">
      <div className="chat-box">
        <Sidebar />
      </div>
      <div className="chat-box">
        {!selectedConversation ? <NotSelected /> : <MessageContainer user={selectedConversation} />}
      </div>
    </div>
  )
}
