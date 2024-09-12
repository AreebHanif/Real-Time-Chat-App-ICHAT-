import React, { useEffect, useRef, memo } from 'react'
import Message from "./Message"
import SendInput from './SendInput'
import useGetMessages from './Hooks/useGetMessages'
import { Skelet } from './Skeleton'
import useConversation from './Store/useConversation'
import useListenMessages from './Hooks/useListenMessages'

const MessageContainer = ({ user }) => {

    const {selectedConversation} = useConversation()
    useListenMessages()

    let { loading, messages } = useGetMessages()
    const lastMessageRef = useRef()
    useEffect(() => {

        setTimeout(() => {
            if (messages.length > 0) {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
        // setTimeout(() => {
        //     lastMessageRef.current?.scrollIntoView({ behaviour:"smooth" })
        // }, 100);
    }, [messages.length])
    
    return (
        <>
            <div className="chat-container">
                <div className="message-header">
                    <img src={selectedConversation.profilePic} alt="avatar" />
                    <span className="message-title">
                        <p className="title">To : {selectedConversation.name.split(' ')[0][0].toUpperCase() + selectedConversation.name.split(' ')[0].slice(1)}</p>
                    </span>
                </div>
                <div className="message-content">
                    {!loading && messages.length > 0 && messages.map((message) => (
                        <div key={message._id}
                            ref={lastMessageRef}
                        >
                            <Message message={message} />
                        </div>
                    ))}
                    {!loading && messages.length === 0 && <p className='no-convo-text'>Send a message to start conversation</p>}
                    {loading && [...Array(5)].map((_, idx) => <Skelet key={idx} />)}
                </div>
            </div>
            <SendInput />
        </>
    )
}

export default memo(MessageContainer, (prevProps, nextProps) => {
    const prevMessages = prevProps.messages || [];
    const nextMessages = nextProps.messages || [];

    return prevMessages.length === nextMessages.length;
});


// export default MessageContainer