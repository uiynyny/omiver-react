"use client"
import React, { useState } from 'react'
import Message from './message'

const Messages = () => {
    const [messages, setMessages] = useState([])
    return (
        <div>
            <Message m={"message example"} />
        </div>
    )
}

export default Messages
