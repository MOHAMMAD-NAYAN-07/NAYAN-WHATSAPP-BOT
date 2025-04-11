module.exports = {
    config: {
      name: 'compliment',
      aliases: ['complimentme', 'complimentuser'],
      permission: 0,
      prefix: true,
      categorie: 'Fun',
      credit: 'Developed by Mohammad Nayan',
      usages: [
        `${global.config.PREFIX}compliment @username - Compliment a mentioned user.`,
        `${global.config.PREFIX}complimentme @username - Alias for complimenting a user.`,
        `${global.config.PREFIX}complimentuser @username - Another alias for complimenting a user.`
      ]
    },
    
  start: async ({ event, api }) => {
    const { threadId, mentions } = event;

    if (mentions.length === 0) {
      await api.sendMessage(threadId, { text: 'Please mention a user to compliment.' });
      return;
    }

    const mentionedUser = mentions[0];
    const compliments = [
      "You’re amazing just the way you are!",
      "You have a great sense of humor!",
      "You’re incredibly thoughtful and kind.",
      "You are more powerful than you know.",
      "You light up the room!",
      "You’re a true friend.",
      "You inspire me!"
    ];

    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    await api.sendMessage(threadId, { text: `@${mentionedUser} ${randomCompliment}`, mentions: [mentionedUser] });
  }
};
