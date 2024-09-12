import React from 'react'
import Conversation from './Conversation'
import useGetConversation from './Hooks/useGetConversation'
import { Skelet } from './Skeleton'

export default function Conversations() {
  const { loading, Conversations } = useGetConversation()
  return (
    <>
      <div className="chat-users-headers">
        <h1>Chat Users</h1>
      </div>
      <div className="chat-container">
        {Conversations.map((conversation)=>(
          <Conversation key={conversation._id || conversation.createdAt} user={conversation} />
        ))}
        {loading && [...Array(6)].map((_, idx) => <Skelet key={idx} />)}
      </div>
    </>
  )
}
