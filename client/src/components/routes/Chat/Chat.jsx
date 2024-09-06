import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
import {useNavigate, useSearchParams} from "react-router-dom";
import './chat.scss'
import {Button, Col, Input, Row} from "antd";
import {LeftOutlined, SendOutlined} from "@ant-design/icons";

const socket = io.connect('http://localhost:5000/')

const Chat = () => {
    const [searchParams, _] = useSearchParams()
    const [heightBlockContent, setHeightBlockContent] = useState('80vh')
    const navigate = useNavigate()

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries())
        socket.emit('join', params)
    }, [searchParams])

    const calculateChatHeight = () => {
        const headerHeight = document.getElementsByClassName('chat-header')[0]?.clientHeight
        const footerHeight = document.getElementsByClassName('chat-footer')[0]?.clientHeight
        setHeightBlockContent(`calc(95vh - ${headerHeight}px - ${footerHeight}px)`)
    }

    useEffect(() => {
        calculateChatHeight()
        window.addEventListener('resize', () => calculateChatHeight())
        socket.on('message', ({data}) => {
            console.log(data)
        })
        return () => window.removeEventListener('resize', () => calculateChatHeight())
    }, [])

    return (
        <div className='chat-wrapper'>
            <Row>
                <Col lg={4} xs={1}/>
                <Col lg={16} xs={22}>
                    <div className='chat-header'>
                        <div className='back-btn'><Button type='link' onClick={() => navigate('/')}
                                                          icon={<LeftOutlined/>}/></div>
                        <div className='room-description'>
                            <div className='room-name'>{`Хлеборезка`}</div>
                            <div className='room-member'>{`1 members`}</div>
                        </div>
                    </div>
                    <div className='chat-wallpaper' style={{height: heightBlockContent}}>
                        <p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p><p className='send'>Hello</p>
                        <p className='receive'>Hello</p>
                    </div>
                    <div className='chat-footer'>
                        <div className='user-msg'>
                            <Input
                                addonAfter={
                                    <Button
                                        icon={<SendOutlined/>}
                                        type='primary'>
                                    </Button>}
                            />
                        </div>
                    </div>
                </Col>
                <Col lg={4} xs={1}/>
            </Row>
        </div>
    );
};

export {Chat};