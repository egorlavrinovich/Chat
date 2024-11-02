import React from 'react';
import {Button, Form, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useForm, useWatch} from "antd/es/form/Form.js";
import {scrollToLastMessage} from "../../../../helpers/chat.js";
import _ from 'lodash'

const SendMessage = ({socket, params}) => {
    const [form] = useForm()
    const userMessage = useWatch('userMsg', form);

    const onFinish = async ({userMsg}) => {
        await socket.emit('sendMessage', {
            message: userMsg,
            date: Date.now(),
            userName: params?.name
        }, _.debounce(scrollToLastMessage, 50))
        form.resetFields()
    }

    return (
        <div className='user-msg'>
            <Form
                name='user-msg'
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name='userMsg'
                >
                    <Input
                        autoFocus
                        addonAfter={
                            <Button
                                disabled={!userMessage}
                                icon={<SendOutlined/>}
                                type='primary'
                                htmlType={'submit'}
                            >
                            </Button>}
                        placeholder={'Введите сообщение'}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SendMessage;