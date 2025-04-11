const axios = require('axios');

  module.exports = {
    config: {
      name: 'joke',
      aliases: ['dadjoke', 'funny'],
      permission: 0,
      prefix: true,
      description: 'Fetches a random dad joke from the internet.',
      category: 'Fun',
      credit: 'Developed by Mohammad Nayan',
      usages: [`${global.config.PREFIX}joke`],
    },

  start: async ({ event, api }) => {
    const { threadId } = event;

    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });

      const joke = response.data.joke;
      await api.sendMessage(threadId, { text: joke });
    } catch (error) {
      console.error('Error fetching joke:', error);
      await api.sendMessage(threadId, { text: 'Sorry, I could not fetch a joke right now.' });
    }
  },
};
