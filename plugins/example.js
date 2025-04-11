module.exports = {
    config: {
        name: 'example',
        aliases: ['ex'],
        permission: 0,
        prefix: 'both',
        description: 'Demonstrates how handleReply and handleReaction work.',
        categories: 'Utility',
        usages: ['.example', '.ex'],
        credit: 'Developed by Mohammad Nayan'
    },

    start: async function ({ api, event }) {
        const replyMessage = "🔹 Reply to this message or react with any emoji to test handleReply and handleReaction.";

        const sentMessage = await api.sendMessage(event.threadId, { text: replyMessage });

        global.client.handleReply.push({
            name: this.config.name,
            messageID: sentMessage.key.id,
            author: event.senderId
        });

        global.client.handleReaction.push({
            name: this.config.name,
            messageID: sentMessage.key.id,
            author: event.senderId
        });
    },

    handleReply: async function ({ api, event, handleReply }) {
        if (event.senderId !== handleReply.author) return;

      

        const userReply = event.message.conversation || "";
        await api.sendMessage(event.threadId, { text: `📩 You replied: ${userReply}` });
    },

    handleReaction: async function ({ api, event, handleReaction, reactData}) {
        if (event.senderId !== handleReaction.author) return;
      

        const reaction = reactData.text;
        await api.sendMessage(event.threadId, { text: `😊 You reacted with: ${reaction}` });
    }
};
