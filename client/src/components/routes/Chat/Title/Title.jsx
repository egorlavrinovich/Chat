import React from 'react';
import RoomName from "./RoomName.jsx";
import BackBtn from "./BackBtn.jsx";

const Title = ({params, data}) => {
    return (
        <div className='chat-header'>
            <BackBtn/>
            <RoomName title={params?.room} data={data}/>
        </div>
    );
};

export default Title;