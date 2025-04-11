const truths = [
  "What's your biggest fear?",
  "What was your most embarrassing moment?",
  "If you could be invisible for a day, what would you do?",
  "Who was your first crush?",
  "What’s one thing you’ve never told anyone?",
];

module.exports = {
  config: {
    name: 'truth',
    aliases: ['t'],
    permission: 0,
    prefix: true,
    description: 'Get a random truth question.',
    usage: [
      `${global.config.PREFIX}truth - Get a random truth question.`,
      `${global.config.PREFIX}t - Alias for the same functionality.`,
    ],
    categories: 'Games',
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ api, event }) => {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await api.sendMessage(event.threadId, { text: `🔮 Truth: ${randomTruth}` });
  },
};
