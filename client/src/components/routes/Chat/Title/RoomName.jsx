import React, {useEffect, useState} from 'react';
import {calculateUserCount} from "../../../../helpers/chat.js";

const RoomName = ({title, data}) => {
    const [userCount, setUserCount] = useState(1)

    useEffect(() => {
        setUserCount(calculateUserCount(data))
    }, [data?.length])


    return (
        <div className='room-description'>
            <div className='room-name'>{title}</div>
            <div className='room-member'>{`${userCount} members`}</div>
        </div>
    );
};

export default RoomName;