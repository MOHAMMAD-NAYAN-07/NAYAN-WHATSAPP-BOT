
  module.exports = {
    config: {
      name: 'ping',
      aliases: ['p'],
      permission: 0,
      prefix: 'both',
      categories: 'system',
      description: 'Checks if the bot is responsive by replying with "Pong!"',
      usages: [
        'ping',  
        'p'
      ],
      credit: 'Developed by Mohammad Nayan'
    },
  start: async ({ event, api }) => {

    await api.sendMessage(event.threadId, { text: 'Pong!' });
  },
};
