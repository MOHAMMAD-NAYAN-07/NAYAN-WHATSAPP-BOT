const axios = require('axios');

  module.exports = {
    config: {
      name: 'meme',
      aliases: ['memeimage'],
      permission: 1,
      prefix: true,
      categorie: 'Fun',
      credit: 'Developed by Mohammad Nayan',
      description: 'Fetches a random meme from Imgflip.',
      usages: [
        `${global.config.PREFIX}meme - Fetch a random meme.`,
        `${global.config.PREFIX}memeimage - Alias for fetching a random meme.`,
      ],
    },

  start: async ({ event, api }) => {
    try {
      
      const response = await axios.get('https://api.imgflip.com/get_memes');

      if (response.data.success) {
        const memes = response.data.data.memes;

        
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];

        
        await api.sendMessage(event.threadId, { image: { url: randomMeme.url }, caption: randomMeme.name });
      } else {
        await api.sendMessage(event.threadId, { text: 'Failed to fetch memes. Please try again later.' });
      }
    } catch (error) {
      console.error('Error fetching meme:', error);
      await api.sendMessage(event.threadId, { text: 'An error occurred while fetching a meme.' });
    }
  },
};
