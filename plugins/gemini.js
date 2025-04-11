const axios = require('axios');

module.exports = {
  config: {
    name: 'gemini',
    aliases: ['gm', 'google'],
    permission: 0,
    prefix: true,
    description: 'Interact with the Gemini API using a prompt.',
    categories: 'AI',
    usages: [`${global.config.PREFIX}gemini <your prompt>`],
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ event, api, args }) => {
    const { threadId,  getLink, message} = event;

    const result = await getLink(api, message);
    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json')
    const n = apis.data.gemini

    

    if (!args.length) {
      await api.sendMessage(threadId, { text: 'Please provide a prompt to interact with the Gemini API.' });
      return;
    }

    const prompt = args.join(' ');

    let nayan

    if (result.msg){
      nayan = {
        modelType: 'text_only',
        prompt: prompt
      };
    } else if (result.link){
      nayan = {
        modelType: 'text_and_image',
        prompt: prompt,
        imageParts: [result.link]
      }
    }

    try {
      
      const { data } = await axios.post(n + '/gemini', nayan);

      
      const result = data?.result;

      
      if (result) {
        await api.sendMessage(threadId, { text: result });
      } else {
        await api.sendMessage(threadId, { text: 'No response received from the Gemini API. Please try again later.' });
      }
    } catch (error) {
      console.error('Error interacting with the Gemini API:', error);
      await api.sendMessage(threadId, { text: 'An error occurred while interacting with the Gemini API. Please try again later.' });
    }
  },
};
