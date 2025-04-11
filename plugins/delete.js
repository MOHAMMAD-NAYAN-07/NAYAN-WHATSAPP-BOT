  module.exports = {
    config: {
      name: 'delete',
      aliases: ['del', 'uns'],
      permission: 3,
      prefix: 'both',
      categorie: 'Moderation',
      credit: 'Developed by Mohammad Nayan',
      usages: [
        `${global.config.PREFIX}delete - Deletes a message that the user replies to.`,
        `${global.config.PREFIX}del - Alias for the delete command.`,
        `${global.config.PREFIX}uns - Alias for the delete command.`
      ]
    },
  start: async ({ event, api }) => {
    const { threadId, senderId, message, isSenderAdmin } = event;

    const isAdmin = global.isAdmin
    const { isBotAdmin } = await isAdmin(api, threadId, senderId);

    if (!isBotAdmin) {
      await api.sendMessage(threadId, { text: 'I need to be an admin to delete messages.' });
      return;
    }

    if (!isSenderAdmin) {
      await api.sendMessage(threadId, { text: 'Only admins can use the .delete command.' });
      return;
    }

    const quotedMessageId = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
    const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;

    if (quotedMessageId) {
      await api.sendMessage(threadId, { delete: { remoteJid: threadId, fromMe: false, id: quotedMessageId, participant: quotedParticipant } });
    } else {
      await api.sendMessage(threadId, { text: 'Please reply to a message you want to delete.' });
    }
  }
};
