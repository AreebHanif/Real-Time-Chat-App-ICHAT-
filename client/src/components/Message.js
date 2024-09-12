import React from 'react';
import { useAuthContext } from './Context/authcontext';

export default function Message({ message }) {
    let { authUser } = useAuthContext()
    const fromMe = message.senderId === authUser._id
    return (
        <div className='message-container'>
            <span className={`message ${fromMe ? "sent" : "recieved"}`} >{message.message}</span>
        </div>
    );
}
