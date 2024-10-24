import React, {useEffect, useLayoutEffect, useState} from 'react';
import io from 'socket.io-client'
import {useSearchParams} from "react-router-dom";
import './chat.scss'
import {Col, Row} from "antd";
import UserMessage from "./UserMessage.jsx";
import Title from "./Title.jsx";
import SendMessage from "./SendMessage.jsx";

export const socket = io.connect('http://localhost:5000/')

const Chat = () => {
    const [searchParams, _] = useSearchParams()
    const [heightBlockContent, setHeightBlockContent] = useState('80vh')
    const [data, setData] = useState([])
    const [userCount, setUserCount] = useState(1)

    const calculateChatHeight = () => {
        const headerHeight = document.getElementsByClassName('chat-header')[0]?.clientHeight
        const footerHeight = document.getElementsByClassName('chat-footer')[0]?.clientHeight
        setHeightBlockContent(`calc(95vh - ${headerHeight}px - ${footerHeight}px)`)
    }

    useLayoutEffect(() => {
        calculateChatHeight()
        window.addEventListener('resize', () => calculateChatHeight())
        return () => window.removeEventListener('resize', () => calculateChatHeight())
    }, [])

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries())
        socket
            .emit('join', params)
            .on('message', (data) => {
                setData(data)
                calculateUserCount(data)
            })
        return () => {
            socket.disconnect()
        }
    }, [])

    console.log(data)

    const calculateUserCount = (data) => {
        setUserCount(Object.keys(data?.reduce((acc, {userName}) => acc[userName] ? {
                ...acc,
                [userName]: acc[userName] + 1
            } : {...acc, [userName]: 1}
            , {})).length);
    }

    return (
        <div className='chat-wrapper'>
            {!socket.connected && <div>Loading...</div>}
            <Row>
                <Col lg={4} xs={1}/>
                <Col lg={16} xs={22}>
                    <div className='chat-header'>
                        <Title userCount={userCount}/>
                    </div>
                    <div className='chat-wallpaper' style={{height: heightBlockContent}}>
                        {data?.map((msg) => <UserMessage msg={msg}/>
                        )}
                    </div>
                    <div className='chat-footer'>
                        <SendMessage/>
                    </div>
                </Col>
                <Col lg={4} xs={1}/>
            </Row>
        </div>
    );
};

export {Chat};