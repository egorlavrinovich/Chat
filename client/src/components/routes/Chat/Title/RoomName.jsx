import React, {useEffect, useState} from 'react';

const RoomName = ({title, socket}) => {
    const [userCount, setUserCount] = useState(0)

    useEffect(() => {
        socket.on('userCount', (users) => setUserCount(users?.length || 0))
    }, [])


    return (
        <div className='room-description'>
            <div className='room-name'>{title}</div>
            <div className='room-member'>{`${userCount} members`}</div>
        </div>
    );
};

export default RoomName;