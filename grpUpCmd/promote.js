module.exports = {
  event: 'promote',
  handle: async ({ api, event }) => {
    const promotedMembers = event.participants;
    console.log(event);
    for (const member of promotedMembers) {
      await api.sendMessage(event.id, {
        text: `🎉 Congratulations @${member.split('@')[0]}! You are now an admin!`,
        mentions: [member]
      });
    }
  }
};
