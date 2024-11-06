import {useEffect, useRef, useState} from "react";
import {checkDevice} from "../helpers/chat.js";

export const UseAllocateMessage = (isEditMode) => {
    const [allocate, setAllocate] = useState(false)
    const timer = useRef()
    const ref = useRef()
    const isItMobile = checkDevice(768)

    const handleAllocate = () => setAllocate((prev) => !prev)

    const setCurrAllocate = (e) => {
        if (e?.type === 'dblclick' && !isEditMode) return handleAllocate()

        if (isItMobile && !isEditMode) return timer.current = setTimeout(handleAllocate, 1000)

        if (isEditMode) return handleAllocate()
    }

    const clearTimer = () => {
        clearTimeout(timer.current);
    }

    useEffect(() => {
        if (isItMobile) {
            ref.current?.addEventListener('touchstart', setCurrAllocate)
            ref.current?.addEventListener('touchend', clearTimer);
            return () => {
                ref.current?.removeEventListener('touchstart', setCurrAllocate)
                ref.current?.removeEventListener('touchend', clearTimer)
            }
        } else {
            ref.current?.addEventListener('dblclick', setCurrAllocate)
            ref.current?.addEventListener('click', setCurrAllocate)
            return () => {
                ref.current?.removeEventListener('dblclick', setCurrAllocate)
                ref.current?.removeEventListener('click', setCurrAllocate)
            }
        }

    }, [isItMobile, isEditMode])

    return [allocate, ref]
}