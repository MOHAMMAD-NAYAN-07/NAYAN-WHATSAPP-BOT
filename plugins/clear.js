module.exports = {
    config: {
      name: 'clear',
      aliases: ['clean', 'cls'],
      permission: 2,
      prefix: 'both',
      categorie: 'Utilities',
      credit: 'Developed by Mohammad Nayan',
      usages: [
        `${global.config.PREFIX}clear - Clear the bot's messages in the group.`,
        `${global.config.PREFIX}clean - Alias for clearing bot's messages.`,
        `${global.config.PREFIX}cls - Another alias for clearing bot's messages.`
      ]
    },
  start: async ({ event, api }) => {
    const { threadId, message, replyMessage} = event;
    

    try {
      let messageKey;
        
        const msg = await api.sendMessage(threadId, { text: 'Clearing bot messages...' });
        messageKey = msg.key;

      
      await api.sendMessage(threadId, { delete: messageKey });

    } catch (error) {
      await api.sendMessage(threadId, { text: 'An error occurred while clearing messages.' });
    }
  }
};
