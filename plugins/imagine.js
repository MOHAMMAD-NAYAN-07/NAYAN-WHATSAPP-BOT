const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'imagine',
    aliases: ['img', 'generateimage'],
    permission: 0,
    prefix: true,
    description: 'Generate an image from a prompt using an external API.',
    categories: 'media',
    usages: ['.imagine <prompt>'],
    credit: 'Developed by Mohammad Nayan'
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId } = event;

    if (!args.length) {
      await api.sendMessage(threadId, { text: 'Please provide a prompt to generate the image.' });
      return;
    }

    const prompt = args.join(' ');

    try {
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const n = apis.data.api;
      const res = await axios.get(`${n}/nayan/img?prompt=${encodeURIComponent(prompt)}`);

      const data = res.data.imageUrls;
      const numberSearch = data.length;

      if (numberSearch === 0) {
        await api.sendMessage(threadId, { text: 'No images generated. Please try a different prompt.' });
        return;
      }
      

      
      for (let i = 0; i < numberSearch; i++) {
        await api.sendMessage(threadId, {
          image: {url: data[i]},
          caption: prompt,
        });
      }
    } catch (error) {
      console.error('Error generating images:', error);
      await api.sendMessage(threadId, { text: 'An error occurred while generating the image. Please try again later.' });
    }
  },
};
