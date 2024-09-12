import React,{useState} from 'react';
import useSendMessage from "./Hooks/useSendMessage"
import Spinner from "./Spinner"

const SendInput = () => {

    const [message, setMessage] = useState("")
    const {sendMessage,loading} = useSendMessage()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!message) return
        await sendMessage(message)
        setMessage("")
    }

    return (

        <form className='send-message-form' onSubmit={handleSubmit}>
            <input type="text" name='message' className='message-input' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message..." />
            <button type="submit" className='send-button'>
                {!loading ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg> : <Spinner /> }

            </button>
        </form>

    );
}

export default SendInput;
