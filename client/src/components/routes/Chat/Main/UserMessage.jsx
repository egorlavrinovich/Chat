import React, {useEffect} from 'react';
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import clsx from 'clsx'
import {UseAllocateMessage} from "../../../../hooks/UseAllocateMessage.js";
import {useChatStore} from "../../../../store/chat/index.js";

const HOURS_AND_MINUTES = 'HH:mm'

const UserMessage = ({msg}) => {
    const {userName, message, date} = msg
    const [searchParams, _] = useSearchParams()
    const isItMe = (name) => Object.fromEntries(searchParams.entries())?.name === name
    const {setAllocatedMessages, removeAllocatedMessages, isEditable} = useChatStore((state) => state)
    const [allocate, ref] = UseAllocateMessage(isEditable)

    useEffect(() => {
        allocate ? setAllocatedMessages(msg._id) : removeAllocatedMessages(msg._id)
    }, [allocate])

    return (
        <div ref={ref} className={clsx('user-msg', {allocate})}>
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