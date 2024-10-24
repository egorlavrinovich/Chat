import React, {useState} from 'react';
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useSearchParams} from "react-router-dom";
import {socket} from "./Chat.jsx";

const SendMessage = () => {
    const [searchParams, _] = useSearchParams()
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        socket.emit('sendMessage', {message, date: Date.now(), params: Object.fromEntries(searchParams.entries())})
        setMessage('')
    }
    return (
        <div className='user-msg'>
            <Input
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                addonAfter={
                    <Button
                        disabled={!message}
                        icon={<SendOutlined/>}
                        type='primary'
                        onClick={sendMessage}
                    >
                    </Button>}
                placeHolder={'Введите сообщение'}
            />
        </div>
    );
};

export default SendMessage;