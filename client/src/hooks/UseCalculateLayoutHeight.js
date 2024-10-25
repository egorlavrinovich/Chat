import React, {useLayoutEffect, useState} from 'react';
import {calculateChatHeight} from "../helpers/chat.js";

const defaultHeight = '80vh'

export const UseCalculateLayoutHeight = () => {
    const [heightBlockContent, setHeightBlockContent] = useState(defaultHeight)

    useLayoutEffect(() => {
        const blockHeight = calculateChatHeight()
        setHeightBlockContent(blockHeight)
        window.addEventListener('resize', () => blockHeight)
        return () => window.removeEventListener('resize', () => blockHeight)
    }, [])

    return [heightBlockContent]
}