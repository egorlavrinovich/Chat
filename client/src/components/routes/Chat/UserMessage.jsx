import React from 'react';
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import clsx from 'clsx'

const HOURS_AND_MINUTES = 'HH:mm'

const UserMessage = ({msg}) => {
    const [searchParams, _] = useSearchParams()
    const isItMe = (name) => Object.fromEntries(searchParams.entries())?.name === name

    const {userName, message, date} = msg
    return (
        <div className='user-msg'>
            <p className={clsx('msg', {}, [isItMe(userName) ? 'send' : 'receive'])}>
                <div className={isItMe(userName) ? 'hide-user-name' : 'show-user-name'}>{userName}</div>
                <div className='msg-block'>
                    <div className='msg-text'>{message}</div>
                    <div className='msg-time'>{dayjs(date).format(HOURS_AND_MINUTES)}</div>
                </div>
            </p>
        </div>
    );
};

export default UserMessage;