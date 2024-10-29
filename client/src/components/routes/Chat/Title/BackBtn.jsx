import React from 'react';
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const BackBtn = () => {
    const navigate = useNavigate()
    return (
        <div className='back-btn'>
            <Button
                type='link'
                onClick={() => navigate('/')}
                icon={<LeftOutlined/>}/>
        </div>
    );
};

export default BackBtn;