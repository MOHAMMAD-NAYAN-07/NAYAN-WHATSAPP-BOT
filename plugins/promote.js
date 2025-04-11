module.exports = {
    config: {
      name: 'promote',
      aliases: ['addadmin', 'makeadmin'],
      permission: 3,
      prefix: true,
      categorie: 'Moderation',
      credit: 'Developed by Mohammad Nayan',
      description: 'Promotes a user to admin in the group.',
      usages: [
        `${global.config.PREFIX}promote @username - Promote the mentioned user to admin.`,
        `${global.config.PREFIX}addadmin @username - Alias for promoting a user.`,
        `${global.config.PREFIX}makeadmin @username - Another alias for promoting a user.`,
      ],
    },

  start: async ({ api, event }) => {
  const {threadId, mentions} = event
    if (mentions.length === 0) {
      await api.sendMessage(threadId, { text: 'Please mention a user to promote.' });
      return;
    }

    const userToPromote = mentions[0];
    try {
      await api.groupParticipantsUpdate(threadId, [userToPromote], 'promote');
      await api.sendMessage(threadId, { text: `User @${userToPromote.split('@')[0]} has been promoted to admin.`, mentions: [userToPromote] });
    } catch (error) {
      console.error('Error promoting user:', error);
      await api.sendMessage(threadId, { text: 'An error occurred while promoting the user. Please try again.' });
    }
  },
};
