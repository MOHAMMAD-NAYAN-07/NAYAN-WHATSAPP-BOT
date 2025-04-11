const axios = require('axios');

  module.exports = {
    config: {
      name: 'gif',
      aliases: ['giphy', 'animatedgif'],
      permission: 0, 
      prefix: 'both',
      categorie: 'Media',
      credit: 'Developed by Mohammad Nayan', 
      description: 'Searches for a GIF using Giphy.',
      usages: [
        `${global.config.PREFIX}gif <search_term> - Search for a GIF on Giphy.`,
        `${global.config.PREFIX}giphy <search_term> - Alias for the gif command.`,
        `${global.config.PREFIX}animatedgif <search_term> - Alias for the gif command.`
      ]
    },
  start: async ({ event, api, args}) => {
    const { threadId, message } = event;
    const query = args.join(' '); 
    const apiKey = global.config.giphyApiKey;

    if (!query) {
      await api.sendMessage(threadId, { text: 'Please provide a search term for the GIF.' });
      return;
    }

    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: query,
          limit: 1,
          rating: 'g'
        }
      });

      const gifUrl = response.data.data[0]?.images?.downsized_medium?.url;

      if (gifUrl) {
        await api.sendMessage(threadId, { video: { url: gifUrl }, caption: `Here is your GIF for "${query}"` });
      } else {
        await api.sendMessage(threadId, { text: 'No GIFs found for your search term.' });
      }
    } catch (error) {
      console.error('Error fetching GIF:', error);
      await api.sendMessage(threadId, { text: 'Failed to fetch GIF. Please try again later.' });
    }
  }
};
