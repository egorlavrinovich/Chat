import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import './chat.scss'
import {Col, Row, Spin} from "antd";
import UserMessage from "./UserMessage.jsx";
import Title from "./Title.jsx";
import SendMessage from "./SendMessage.jsx";
import {initSocket} from "../../../App.jsx";
import {calculateUserCount} from "../../../helpers/chat.js";
import {UseCalculateLayoutHeight} from "../../../hooks/UseCalculateLayoutHeight.js";

const Chat = () => {
    const socket = initSocket()
    const [searchParams, _] = useSearchParams()
    const [heightBlockContent] = UseCalculateLayoutHeight()
    const [data, setData] = useState()
    const [userCount, setUserCount] = useState(1)
    const [loading, setLoading] = useState(false)
    const params = Object.fromEntries(searchParams.entries())


    useEffect(() => {
        socket
            .emit('join', params)
            .on('message', (data) => {
                console.log(data)
                setData(data)
                setUserCount(calculateUserCount(data))
            })
        return () => {
            socket.disconnect()
        }
    }, [])

    socket.on("disconnect", () => {
        setLoading(true)
    });

    socket.on("connect", () => {
        setLoading(false)
    });

    return (
        <div className='chat-wrapper'>
            <Row>
                <Col lg={4} xs={1}/>
                <Col lg={16} xs={22}>
                    <div className='chat-header'>
                        <Title title={params?.room} userCount={userCount}/>
                    </div>
                    <div className='chat-wallpaper' style={{height: heightBlockContent}}>
                        {data?.map((msg) => <UserMessage key={msg?.date} msg={msg}/>
                        )}
                    </div>
                    <div className='chat-footer'>
                        <SendMessage socket={socket}/>
                    </div>
                </Col>
                <Col lg={4} xs={1}/>
            </Row>
            {loading && <Spin fullscreen/>}
        </div>
    );
};

export {Chat};