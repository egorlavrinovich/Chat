import {BORDER_FROM_USER_MESSAGE} from "../constants/chat.js";
import {useLayoutEffect, useRef, useState} from "react";
import _ from "lodash";
import {scrollToLastMessage} from "../helpers/chat.js";

export const UseIsShowScrollBtn = (messages) => {
    const ref = useRef()
    const [isShow, setIsShow] = useState()

    const onHandleScroll = _.debounce(() => {
        const currentPositionScroll = ref?.current?.scrollTop
        const heightAllBlock = ref?.current?.scrollHeight
        const heightViewBlock = ref?.current?.offsetHeight

        setIsShow(heightAllBlock - heightViewBlock - BORDER_FROM_USER_MESSAGE > currentPositionScroll)
    }, 200, {maxWait: 5000})

    useLayoutEffect(() => {
        onHandleScroll()
        ref?.current?.addEventListener('scroll', onHandleScroll)
        return () => ref?.current?.removeEventListener('scroll', onHandleScroll)
    }, [ref])

    useLayoutEffect(() => {
        if (Boolean(isShow) && !isShow) scrollToLastMessage()
    }, [isShow, messages?.length])

    return [isShow, ref]
}