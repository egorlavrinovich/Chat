import React from 'react';
import UserMessage from "./UserMessage.jsx";
import {UseCalculateLayoutHeight} from "../../../../hooks/UseCalculateLayoutHeight.js";
import {USER_LIST_ID} from "../../../../constants/chat.js";
import {Button} from "antd";
import {DownCircleOutlined} from "@ant-design/icons";
import './style.scss'
import {scrollToLastMessage} from "../../../../helpers/chat.js";
import {UseIsShowScrollBtn} from "../../../../hooks/UseIsShowScrollBtn.js";


const UserMassageList = ({messages}) => {
    const [heightBlockContent] = UseCalculateLayoutHeight()
    const [isShowScrollBtn, ref] = UseIsShowScrollBtn(messages)

    return (
        <div ref={ref} id={USER_LIST_ID} className='chat-wallpaper' style={{height: heightBlockContent}}>
            {messages?.map((msg) => <UserMessage key={msg?.date} msg={msg}/>
            )}
            {isShowScrollBtn && <Button
                className={'scroll-to-end'}
                shape="circle"
                size='large'
                type='ghost'
                icon={<DownCircleOutlined style={{fontSize: '30px', color: '#5d5a5a9c'}}/>}
                onClick={scrollToLastMessage}
            />}
        </div>
    );
}

export default UserMassageList;