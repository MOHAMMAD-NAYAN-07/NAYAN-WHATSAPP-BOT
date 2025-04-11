const axios = require('axios');

  module.exports = {
    config: {
      name: 'fact',
      aliases: ['randomfact', 'factoid'],
      permission: 0,
      prefix: true,
      categorie: 'Fun',
      credit: 'Developed by Mohammad Nayan', 
      description: 'Sends a random fact.',
      usages: [
        `${global.config.PREFIX}fact - Sends a random fact.`,
        `${global.config.PREFIX}randomfact - Alias for the fact command.`,
        `${global.config.PREFIX}factoid - Alias for the fact command.`
      ]
    },
  start: async ({ event, api }) => {
    const { threadId } = event;

    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      const fact = response.data.text;
      await api.sendMessage(threadId, { text: fact });
    } catch (error) {
      console.error('Error fetching fact:', error);
      await api.sendMessage(threadId, { text: 'Sorry, I could not fetch a fact right now.' });
    }
  }
};
