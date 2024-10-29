import React from 'react';
import SendMessage from "./SendMessage.jsx";

const Footer = ({socket, params}) => {
    return (
        <div className='chat-footer'>
            <SendMessage socket={socket} params={params}/>
        </div>
    );
};

export default Footer;