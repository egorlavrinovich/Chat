import React, {useState} from 'react';
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useSearchParams} from "react-router-dom";

const SendMessage = ({socket}) => {
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
                placeholder={'Введите сообщение'}
            />
        </div>
    );
};

export default SendMessage;