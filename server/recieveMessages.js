const messages = []

export const getMessages = (message, params, date) => {
    if (message && params) messages.push({userName: params?.name, room: params?.room, message, date})

    return messages
}