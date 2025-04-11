  module.exports = {
    config: {
      name: 'insult',
      aliases: ['roast'],
      permission: 0,
      prefix: true,
      description: 'Sends a random insult to the mentioned user.',
      category: 'Fun',
      credit: 'Developed by Mohammad Nayan',
      usages: [`${global.config.PREFIX}insult @user`], 
    },

  start: async ({ event, api, args }) => {
    const { threadId, mentions } = event;

    const insults = [
      "You're like a cloud. When you disappear, it's a beautiful day!",
      "You bring everyone so much joy when you leave the room!",
      "I'd agree with you, but then we’d both be wrong.",
      "You’re not stupid; you just have bad luck thinking.",
      "Your secrets are always safe with me. I never even listen to them."
    ];

    const mentionedUser = mentions[0];

    if (!mentionedUser) {
      await api.sendMessage(threadId, { text: 'Please mention a user to insult.' });
      return;
    }

    const randomInsult = insults[Math.floor(Math.random() * insults.length)];
    await api.sendMessage(threadId, {
      text: ` @${mentionedUser.split('@')[0]} ${randomInsult}`,
      mentions: [mentionedUser],
    });
  },
};
