module.exports = {
  config: {
    name: 'tagall',
    aliases: ['all', 'mentionall'],
    permission: 3,
    prefix: 'both',
    description: 'Mentions all members of a group.',
    categories: 'group',
    usages: ['.tagall'],
    credit: 'Developed by Mohammad Nayan'
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId } = event;

    const isAdmin = global.isAdmin
    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

    if (isSenderAdmin || isBotAdmin) {
      const groupMetadata = await api.groupMetadata(threadId);
      const participants = groupMetadata.participants;

      if (!participants || participants.length === 0) {
        return await api.sendMessage(threadId, { text: 'No participants found in the group.' });
      }

      const msg = args.join(' ')

      let mentionText = `${msg} ` || 'Hey everyone! ';
      let mentions = [];

      participants.forEach(participant => {
        mentionText += `@${participant.id.split('@')[0]} `;
        mentions.push(participant.id);
      });

      await api.sendMessage(threadId, {
        text: mentionText,
        mentions: mentions
      });
    } else {
      await api.sendMessage(threadId, {
        text: 'Only admins or the bot (if it is an admin) can use the .tagall command.'
      });
    }
  }
};
