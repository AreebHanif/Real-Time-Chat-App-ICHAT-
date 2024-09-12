import React from 'react';
import { useAuthContext } from './Context/authcontext';

export default function NotSelected() {
    const { authUser } = useAuthContext();

    return (
        <div className="chat-container">
            <div className='not-select'>
                <h1>🖐 Welcome {authUser.name}</h1>
                <p>Select a chat to start messaging✨</p>
            </div>
        </div>
    );
}
