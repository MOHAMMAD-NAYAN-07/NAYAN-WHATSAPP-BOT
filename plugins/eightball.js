  module.exports = {
    config: {
      name: 'eightball',
      aliases: ['8ball', 'magic8'],
      permission: 0, 
      prefix: true,
      categorie: 'Fun',  
      credit: 'Developed by Mohammad Nayan',
      description: 'Provides a random response to yes or no questions.',
      usages: [
        `${global.config.PREFIX}eightball <question> - Ask a yes/no question and get a random response.`,
        `${global.config.PREFIX}8ball <question> - Alias for the eightball command.`,
        `${global.config.PREFIX}magic8 <question> - Alias for the eightball command.`
      ]
    },
  start: async ({ event, api, args }) => {
    const { threadId, body } = event;
    const question = args.join(' ');

    if (!question) {
      await api.sendMessage(threadId, { text: 'Please ask a question!' });
      return;
    }

    const eightBallResponses = [
      "Yes, definitely!",
      "No way!",
      "Ask again later.",
      "It is certain.",
      "Very doubtful.",
      "Without a doubt.",
      "My reply is no.",
      "Signs point to yes."
    ];

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    await api.sendMessage(threadId, { text: `🎱 ${randomResponse}` });
  }
};
