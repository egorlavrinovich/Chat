import React from 'react';
import {checkDevice} from "../../../../../helpers/chat.js";
import {DeleteOutlined} from "@ant-design/icons";
import {Button} from "antd";

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
    variant: "solid",
    children: 'Удалить'
}

const DelBtn = ({isShow}) => {
    const isItMobile = checkDevice(768)
    const otherProps = isItMobile ? mobileBtnProps : wideScreenProps

    return isShow && <Button {...defaultBtnProps} {...otherProps}/>
};

export default DelBtn;