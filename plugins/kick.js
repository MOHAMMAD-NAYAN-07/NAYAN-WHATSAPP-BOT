const isAdmin = global.isAdmin

  module.exports = {
    config: {
      name: 'kick',
      aliases: ['remove'],
      permission: 2,
      prefix: true,
      categorie: 'Moderation',
      credit: 'Developed by Mohammad Nayan',
      description: 'Kicks a user from the group.',
      usages: [
        `${global.config.PREFIX}kick @username - Remove a tagged user from the group.`,
        `${global.config.PREFIX}kick (reply to a user) - Remove the replied user.`,
        `${global.config.PREFIX}remove @username - Alias for kick command.`,
      ]
    },

  start: async ({ event, api  }) => {
    const { threadId, senderId, mentions, message} = event;
    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

    const replyMessage = message.message?.extendedTextMessage?.contextInfo;
    if (!isBotAdmin) {
      await api.sendMessage(threadId, { text: 'Please make the bot an admin first.' });
      return;
    }

    if (!isSenderAdmin) {
      await api.sendMessage(threadId, { text: 'Only group admins can use the kick command.' });
      return;
    }

    if (replyMessage && replyMessage.participant) {
      const userToKick = replyMessage.participant;
      await api.groupParticipantsUpdate(threadId, [userToKick], 'remove');
      await api.sendMessage(threadId, { text: 'User has been kicked from the group.' });
      return;
    }

    if (mentions.length > 0) {
      console.log(`Mentioned users to kick: ${mentions}`);  // Debugging log
      await api.groupParticipantsUpdate(threadId, mentions, 'remove');
      await api.sendMessage(threadId, { text: 'User(s) have been kicked from the group.' });
    } else {
      await api.sendMessage(threadId, { text: 'Please reply to a user or tag a user to kick.' });
    }
  },
};
