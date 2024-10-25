import React from 'react';
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Title = ({title, userCount}) => {
    const navigate = useNavigate()

    return (
        <>
            <div className='back-btn'>
                <Button
                    type='link'
                    onClick={() => navigate('/')}
                    icon={<LeftOutlined/>}/>
            </div>
            <div className='room-description'>
                <div className='room-name'>{title}</div>
                <div className='room-member'>{`${userCount} members`}</div>
            </div>
        </>
    );
};

export default Title;