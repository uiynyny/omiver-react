import React from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox } from 'react-chat-elements'

const Message = ({ m }: { m: string }) => {
    return (
        <MessageBox
            position='right'
            type='text'
            text={m}
        />
    )
}

export default Message
