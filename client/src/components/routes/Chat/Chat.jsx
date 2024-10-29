import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import './chat.scss'
import {Col, Row, Spin} from "antd";
import {initSocket} from "../../../App.jsx";
import UserMassageList from "./Main/UserMassageList.jsx";
import Title from "./Title/Title.jsx";
import Footer from "./Footer/Footer.jsx";

const Chat = () => {
    const socket = initSocket()
    const [searchParams, _] = useSearchParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const params = Object.fromEntries(searchParams.entries())


    useEffect(() => {
        socket
            .emit('join', params)
            .on('message', (data) => {
                setData(data)
            })
            .on("disconnect", () => {
                setLoading(true)
            })
            .on("connect", () => {
                setLoading(false)
            })
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className='chat-wrapper'>
            <Row>
                <Col lg={4} xs={1}/>
                <Col lg={16} xs={22}>
                    <Title params={params} data={data}/>
                    <UserMassageList messages={data}/>
                    <Footer socket={socket} params={params}/>
                </Col>
                <Col lg={4} xs={1}/>
            </Row>
            {loading && <Spin fullscreen/>}
        </div>
    );
};

export {Chat};