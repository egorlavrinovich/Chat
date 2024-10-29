import {BORDER_FROM_USER_MESSAGE} from "../constants/chat.js";
import {useEffect, useState, useRef} from "react";
import _ from "lodash";
import {scrollToLastMessage} from "../helpers/chat.js";

export const UseIsShowScrollBtn = (messages) => {
    const ref = useRef()
    const [isShow, setIsShow] = useState(false)

    const onHandleScroll = _.debounce(() => {
        const currentPositionScroll = ref?.current?.scrollTop
        const heightAllBlock = ref?.current?.scrollHeight
        const heightViewBlock = ref?.current?.offsetHeight

        setIsShow(heightAllBlock - heightViewBlock - BORDER_FROM_USER_MESSAGE > currentPositionScroll)
    }, 200, {maxWait: 5000})

    useEffect(() => {
        onHandleScroll()
        ref?.current?.addEventListener('scroll', onHandleScroll)
        return () => ref?.current?.removeEventListener('scroll', onHandleScroll)
    }, [ref])

    useEffect(() => {
        if (!isShow) scrollToLastMessage()
    }, [isShow, messages?.length])

    return [isShow, ref]
}