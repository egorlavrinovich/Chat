import React from 'react';
import {checkDevice, deleteMessagesInfo} from "../../../../../helpers/chat.js";
import {DeleteOutlined} from "@ant-design/icons";
import {Button, message} from "antd";
import {useChatStore} from "../../../../../store/chat/index.js";

const mobileBtnProps = {
    shape: 'circle',
    variant: 'link',
    icon: <DeleteOutlined style={{fontSize: '20px', color: 'rgba(238,5,5,0.61)'}}/>,
    children: ''
}

const defaultBtnProps = {
    size: 'small',
    className: 'del-msg-btn',
    color: "danger",
}

const wideScreenProps = {
    variant: "outlined",
    children: 'Удалить',
    style: {
        backgroundColor: 'rgba(238,5,5,0.003)'
    }
}

const DelBtn = ({socket}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {allocatedMessages, resetAllocatedMessages, isEditable} = useChatStore((state) => state)
    const isItMobile = checkDevice(768)
    const otherProps = isItMobile ? mobileBtnProps : wideScreenProps

    const onHandleDelete = () => {
        socket.emit('deleteMessages', allocatedMessages, () => deleteMessagesInfo({context: messageApi}))
        resetAllocatedMessages()
    }

    return <>{isEditable && <Button onClick={onHandleDelete} {...defaultBtnProps} {...otherProps}/>}{contextHolder}</>
};

export default DelBtn;