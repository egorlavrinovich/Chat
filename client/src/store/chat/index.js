import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

export const useChatStore = create(devtools((set) => ({
    allocatedMessages: [],
    isEditable: false,
    setAllocatedMessages: (payload) => set((state) => ({
        ...state,
        isEditable: true,
        allocatedMessages: [...state.allocatedMessages, payload]
    })),
    removeAllocatedMessages: (payload) => set((state) => {
        const filteredAllocatedMessages = state.allocatedMessages.filter((item) => item !== payload)
        return ({
            ...state,
            isEditable: !!filteredAllocatedMessages?.length,
            allocatedMessages: filteredAllocatedMessages
        })
    }),
    resetAllocatedMessages: () => set({}, true)
})))