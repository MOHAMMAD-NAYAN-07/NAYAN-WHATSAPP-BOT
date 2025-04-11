module.exports = {
  event: 'remove',
  handle: async ({ api, event }) => {
    const removedMembers = event.participants;
    for (const member of removedMembers) {
      await api.sendMessage(event.id, {
        text: `Goodbye @${member.split('@')[0]}, we'll miss you!`,
        mentions: [member]
      });
    }
  }
};
