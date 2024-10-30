import React from 'react';
import RoomName from "./RoomName.jsx";
import BackBtn from "./BackBtn.jsx";

const Title = ({params, data, socket}) => {
    return (
        <div className='chat-header'>
            <BackBtn params={params} socket={socket}/>
            <RoomName title={params?.room} data={data}/>
        </div>
    );
};

export default Title;