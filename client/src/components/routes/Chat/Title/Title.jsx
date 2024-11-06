import React from 'react';
import RoomName from "./RoomName.jsx";
import BackBtn from "./ManageButns/BackBtn.jsx";
import DelBtn from "./ManageButns/DelBtn.jsx";
import {useChatStore} from "../../../../store/chat/index.js";

const Title = ({params, data, socket}) => {
    const {isEditable} = useChatStore((state) => state)

    return (
        <div className='chat-header'>
            <BackBtn params={params} socket={socket}/>
            <RoomName title={params?.room} data={data} socket={socket}/>
            <DelBtn isShow={isEditable} socket={socket}/>
        </div>
    );
};

export default Title;