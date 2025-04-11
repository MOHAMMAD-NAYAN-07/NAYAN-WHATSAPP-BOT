module.exports = {
    config: {
      name: 'demote',
      aliases: ['down', 'unadmin'],
      permission: 2,
      prefix: 'both',
      categorie: 'Moderation',
      credit: 'Developed by Mohammad Nayan',
      usages: [
        `${global.config.PREFIX}demote @user - Demotes the mentioned user from admin.`,
        `${global.config.PREFIX}down @user - Alias for the demote command.`,
        `${global.config.PREFIX}unadmin @user - Alias for the demote command.`
      ]
    },
  start: async ({ event, api }) => {
    const { threadId, mentions } = event;

    if (mentions.length === 0) {
      await api.sendMessage(threadId, { text: 'Please mention a user to demote.' });
      return;
    }

    const userToDemote = mentions[0];
    
    await api.groupParticipantsUpdate(threadId, [userToDemote], 'demote');
    await api.sendMessage(threadId, { text: `User @${userToDemote.split('@')[0]} has been demoted from admin.`, mentions: [userToDemote] });
  }
};
