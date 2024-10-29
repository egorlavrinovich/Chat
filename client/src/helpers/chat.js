import {USER_LIST_ID} from "../constants/chat.js";

export const calculateUserCount = (data) =>
    Object.keys(data?.reduce((acc, {userName}) =>
        acc[userName] ? {...acc, [userName]: acc[userName] + 1} : {...acc, [userName]: 1}, {}))
        .length

export const calculateChatHeight = () => {
    const headerHeight = document.getElementsByClassName('chat-header')[0]?.clientHeight
    const footerHeight = document.getElementsByClassName('chat-footer')[0]?.clientHeight
    return `calc(95vh - ${headerHeight}px - ${footerHeight}px)`
}

export const scrollToLastMessage = () => {
    const userMessageListNode = document.getElementById(USER_LIST_ID)
    userMessageListNode?.scrollTo(0, userMessageListNode?.scrollHeight)
}
