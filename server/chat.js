const chatHistory = [];

const addChatMessage = (message) => {
    const newItem = {
        time: Date.now(),
        message
    };

    chatHistory.push(newItem);

    return {
        items: [newItem],
        segment: chatHistory.length
    }
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
