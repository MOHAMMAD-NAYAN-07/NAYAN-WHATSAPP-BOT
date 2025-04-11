const axios = require('axios');

module.exports = {
  config: {
    name: 'rndmadd',
    aliases: ['randomadd'],
    permission: 0,
    prefix: true,
    description: 'Randomly adds a name and URL to the mix.',
    usages: [`${global.config.PREFIX}rndmadd <name>`],
    categories: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ event, api, args }) => {
    const { threadId, getLink, message } = event;

      if (args.length < 1) {
      await api.sendMessage(threadId, { text: '❌ Please provide a target name.' });
      return;
    }

    const targetName = args.join(' ');

    try {
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl = apis.data.api;

      const result = await getLink(api, message);
      const { link, msg } = result;

      if (msg && (!link || !link.includes('.mp4'))) {
        await api.sendMessage(threadId, { text: '❌ Please reply with a video file.' });
        return;
      }

      const response = await axios.get(`${apiUrl}/mixadd?name=${encodeURIComponent(targetName)}&url=${encodeURIComponent(link)}`);
      const resMsg = response?.data?.msg || 'No message provided.';
      const name = response?.data?.data?.name || 'Unknown';
      const resUrl = response?.data?.data?.url || 'No URL available.';

      const messageBody = `📩 MESSAGE: ${resMsg}\n📛 NAME: ${name}\n🖇 URL: ${resUrl}`;
      await api.sendMessage(threadId, { text: messageBody });
    } catch (error) {
      console.error('Error during execution:', error);
      await api.sendMessage(threadId, { text: '❌ An error occurred while processing your request. Please try again later.' });
    }
  },
};
