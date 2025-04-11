const axios = require('axios');

module.exports = {
  config: {
    name: 'ai',
    aliases: ['chatbot', 'gpt'],
    permission: 0,
    prefix: 'both',
    description: 'AI chatbot using GPT-3 API.',
    categories: 'AI Chat',
    usages: ['.ai on', '.ai off', '.ai hi'],
    credit: 'Developed by Mohammad Nayan'
  },

  start: async ({ event, api, args }) => {
    const { threadId, isGroup} = event;
    const aiSettings = await global.data.get('ai.json') || {};
    const userPrompt = args.join(' ');

    if (!userPrompt) {
      return await api.sendMessage(threadId, {
        text: `Usage:\n${global.config.PREFIX}ai on/off\n${global.config.PREFIX}ai hi\nAI chatbot is currently ${aiSettings[threadId] ? 'ON' : 'OFF'} for this thread.`
      });
    }

    if (args[0] === 'on') {
    if (isGroup) return;
      aiSettings[threadId] = true;
      await global.data.set('ai.json', aiSettings);
      return await api.sendMessage(threadId, { text: '✅ AI chatbot is now ON for this thread.' });
    }

    if (args[0] === 'off') {
    if (isGroup) return;
      aiSettings[threadId] = false;
      await global.data.set('ai.json', aiSettings);
      return await api.sendMessage(threadId, { text: '❌ AI chatbot is now OFF for this thread.' });
    }

    
    try {
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      const response = await axios.get(`${apiss}/nayan/gpt3?prompt=${encodeURIComponent(userPrompt)}`);
      const aiResponse = response.data.response || 'I am unable to process your request at the moment.';
      await api.sendMessage(threadId, { text: aiResponse });
    } catch (error) {
      await api.sendMessage(threadId, { text: '⚠️ Unable to fetch AI response. Please try again later.' });
    }
  },

  event: async ({ event, api, body }) => {
    const { threadId, isGroup} = event;
    const aiSettings = await global.data.get('ai.json') || {};

    if (!aiSettings[threadId] || !body) return;
    if (isGroup) return;

    try {
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      const response = await axios.get(`${apiss}/nayan/gpt3?prompt=${encodeURIComponent(body)}`);
      const aiResponse = response.data.response || 'I am unable to process your request at the moment.';
      await api.sendMessage(threadId, { text: aiResponse });
    } catch (error) {
      await api.sendMessage(threadId, { text: '⚠️ Unable to fetch AI response. Please try again later.' });
    }
  }
};
