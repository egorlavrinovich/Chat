import React from 'react';
import {Button, Col, Form, Input, InputNumber, Row, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import './main.css'
import {CHAT} from "../../../constants/routes.js";
import {rules} from "../../../constants/rules.js";

const {Title} = Typography;

const {REQUIRED} = rules

const Main = () => {
    const navigate = useNavigate()

    const onFinish = ({name, room}) => {
        const searchParams = new URLSearchParams({name, room})
        navigate(`${CHAT}/?${searchParams}`)
    }

    return (
        <>
            <Row className='main-container' style={{minHeight: '100%'}} align={'middle'}>
                <Col lg={10} xs={5}/>
                <Col lg={4} xs={14}>
                    <Form
                        className='dialog-window'
                        onFinish={onFinish}
                        layout={'vertical'}
                        autoComplete='off'
                    >
                        <Title
                            className='main-title'
                            level={4}>
                            Вход в комнату
                        </Title>
                        <Form.Item name='name' rules={[REQUIRED]} label={'Ваше имя'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='room' rules={[REQUIRED]} initialValue={'Хлеборезка'}
                                   label={'Название комнаты'}>
                            <Input/>
                        </Form.Item>
                        <Button
                            className={'main-btn'}
                            type={'primary'}
                            htmlType='submit'>
                            Войти
                        </Button>
                    </Form>
                </Col>
                <Col lg={10} span={8} xs={5}/>
            </Row>
        </>
    );
};

export {Main};