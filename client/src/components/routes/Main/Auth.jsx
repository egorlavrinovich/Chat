import React, {useMemo, useState} from 'react';
import {Button, Col, Divider, Form, Input, Row, Space, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import './main.css'
import {authFormConfig, registrationFormConfig} from "./config.js";
import {useForm} from "antd/es/form/Form.js";
import axios from 'axios'

const {Title} = Typography;

const componentsTypes = {
    text: <Input/>,
    password: <Input.Password/>
}

const Auth = () => {
    const navigate = useNavigate()
    const [isExistProfile, setIsExistProfile] = useState(true)
    const [form] = useForm()

    const {title, routePath, fields, submitBtn, footerBtns} = useMemo(() => {
        return isExistProfile ? authFormConfig({handleSetTypeAuth}) : registrationFormConfig({handleSetTypeAuth})
    }, [isExistProfile])

    const onFinish = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_WS_HOST}${routePath}`, data)
            if (isExistProfile) {
                console.log(response)
            }
        } catch (e) {
            console.log(e)
        } finally {
            form.resetFields()
        }
    }

    function handleSetTypeAuth() {
        form?.resetFields()
        setIsExistProfile((prev) => !prev)
    }


    return (
        <Row className='main-container' align={'middle'}>
            <Col xl={9} lg={8} xs={4}/>
            <Col xl={5} lg={6} xs={16}>
                <Form
                    form={form}
                    className='dialog-window'
                    onFinish={onFinish}
                    layout={'vertical'}
                    autoComplete='off'
                >
                    <Title
                        className='main-title'
                        level={5}>
                        {title}
                    </Title>
                    <Divider className='title-divider'/>
                    <Space direction='vertical' size={10}>
                        {fields?.map(({type, name, ...otherProps}) =>
                            <Form.Item
                                key={name}
                                name={name}
                                className='auth-form-item'
                                {...otherProps}
                            >
                                {componentsTypes[type]}
                            </Form.Item>)}
                        <Button {...submitBtn}/>
                        <div className='footer-auth-dialog-window'>
                            {footerBtns?.map((btnConfig) => <Button {...btnConfig}/>)}</div>
                    </Space>
                </Form>
            </Col>
            <Col xl={9} lg={8} span={8} xs={4}/>
        </Row>
    );
};

export {Auth};
