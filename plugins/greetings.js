  module.exports = {
    config: {
      name: 'autoreply',
      aliases: ['ar'],
      permission: 0,
      prefix: 'both',
      description: 'Automatically replies to specific messages from users.',
      categories: 'greetings',
      usages: ['ck', 'hello', 'hlw'],
      credit: 'Developed by Mohammad Nayan'
    },
  event: async ({ event, api, body}) => {
    const { threadId} = event;

    
    const userMessage = body.toLowerCase()
    
    
    if (userMessage === 'ck' || userMessage === 'hello' || userMessage === 'hlw') {
      
      await api.sendMessage(threadId, {
        text: 'Hi, How can I help you?\nYou can use .menu for more info and commands.'
      });
    }
  }
};
