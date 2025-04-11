  module.exports = {
    config: {
      name: 'unmute',
      aliases: ['ungroupmute', 'unm'],
      permission: 3,
      prefix: 'both',
      description: 'Unmute the group, allowing members to send messages.',
      usage: [
        `${global.config.PREFIX}unmute - Unmutes the group, allowing members to send messages.`,
      ],
      categories: 'Group Management',
      credit: 'Developed by Mohammad Nayan',
    },

  start: async ({ api, event }) => {
    const { threadId, isGroup } = event;

    if (!isGroup) {
      await api.sendMessage(threadId, { text: '⚠️ This command can only be used in groups.' });
      return;
    }

    try {
      await api.groupSettingUpdate(threadId, 'not_announcement'); 
      await api.sendMessage(threadId, { text: '🔓 The group has been unmuted. Members can now send messages.' });
    } catch (error) {
      console.error('Error unmuting group:', error.message);
      await api.sendMessage(threadId, { text: '⚠️ Failed to unmute the group. Ensure I have the necessary admin permissions.' });
    }
  },
};
