  module.exports = {
    config: {
      name: 'mute',
      aliases: ['m'],
      permission: 2,
      prefix: 'both',
      categorie: 'Group Management',
      credit: 'Developed by Mohammad Nayan',
      description: 'Mute the group for a specified duration (in minutes).',
      usages: [
        `${global.config.PREFIX}mute <duration_in_minutes> - Mutes the group for the specified duration.`,
        `${global.config.PREFIX}m <duration_in_minutes> - Alias for muting the group.`,
      ],
    },
  start: async ({ event, api }) => {
    const { threadId, senderId, args } = event;

    const durationInMinutes = args.join(' ');
    if (!durationInMinutes || isNaN(durationInMinutes)) {
      await api.sendMessage(threadId, { text: 'Please provide a valid duration in minutes.' });
      return;
    }

    const isAdmin = global.isAdmin

    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, threadId, senderId);

    if (!isBotAdmin) {
      await api.sendMessage(threadId, { text: 'Please make the bot an admin first.' });
      return;
    }

    const durationInMilliseconds = durationInMinutes * 60 * 1000;

    try {
      await api.groupSettingUpdate(threadId, 'announcement'); 
      await api.sendMessage(threadId, { text: `The group has been muted for ${durationInMinutes} minutes.` });

      setTimeout(async () => {
        await api.groupSettingUpdate(threadId, 'not_announcement'); 
        await api.sendMessage(threadId, { text: 'The group has been unmuted.' });
      }, durationInMilliseconds);
    } catch (error) {
      console.error('Error muting/unmuting the group:', error);
      await api.sendMessage(threadId, { text: 'An error occurred while muting/unmuting the group. Please try again.' });
    }
  }
};
