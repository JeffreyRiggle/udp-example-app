const chatHistory = [];

const addChatMessage = (message) => {
    chatHistory.push({
        time: Date.now(),
        message
    });
}

const getChatMessages = (index) => {
    if (index >= chatHistory.length) {
        return {
            items: [],
            segment: chatHistory.length
        };
    }

    return {
        items: [...chatHistory].slice(index),
        segment: chatHistory.length
    }
}

module.exports = {
    addChatMessage,
    getChatMessages
};
