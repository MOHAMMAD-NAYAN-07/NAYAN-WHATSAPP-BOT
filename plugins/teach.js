const axios = require('axios');

module.exports = {
  config: {
    name: 'teach',
    aliases: ["tc", "simtc"],
    permission: 0,
    prefix: 'both',
    description: 'Teach the bot to respond to specific messages.',
    categories: 'utility',
    usages: ['teach [ask] = [answer]'],
    credit: 'Developed by Mohammad Nayan'
  },

  start: async ({ event, api, args }) => {
    const { threadId } = event;

    try {
      
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const teachBaseUrl = apis.data.sim;

      
      const input = args.join(' ');
      if (!input.includes('=')) {
        return await api.sendMessage(threadId, { text: 'Usage: teach [ask] = [answer]' });
      }

      const [ask, ans] = input.split('=').map(str => str.trim());
      if (!ask || !ans) {
        return await api.sendMessage(threadId, { text: 'Invalid format! Ensure you provide both ask and answer.' });
      }

      
      const resUrl = `${teachBaseUrl}/sim?type=teach&ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;
     const res = await axios.get(resUrl);
      console.log(res.data)
      await api.sendMessage(threadId, { text: `Successfully taught: "${ask}" -> "${ans}"` });

    } catch (error) {
      console.error(error);
      await api.sendMessage(threadId, { text: 'Error: Failed to store response. Please try again.' });
    }
  }
};
