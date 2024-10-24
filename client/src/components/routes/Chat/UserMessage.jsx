import React from 'react';
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";

const HOURS_AND_MINUTES = 'HH:mm'

const UserMessage = ({msg}) => {
    const [searchParams, _] = useSearchParams()
    const isItMe = (name) => Object.fromEntries(searchParams.entries())?.name === name

    const {userName, message, date} = msg
    return (
        <p className={isItMe(userName) ? 'send' : 'receive'}>
            <div className='msg-block'>
                <div className='msg-text'>{message}</div>
                <div className='msg-time'>{dayjs(date).format(HOURS_AND_MINUTES)}</div>
            </div>
        </p>
    );
};

export default UserMessage;