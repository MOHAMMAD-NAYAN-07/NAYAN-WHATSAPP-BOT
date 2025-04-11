module.exports = {
  config: {
    name: 'creategroup',
    aliases: ['groupcreate', 'newgroup'],
    permission: 0,
    prefix: 'both',
    description: 'Create a new WhatsApp group with specified participants.',
    categories: 'group',
    usages: ['.creategroup <group name> @mention1 @mention2 ...'],
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ event, api, args }) => {
    const { threadId, mentions, senderId } = event;

    if (args.length < 1 || mentions.length === 0) {
      await api.sendMessage(threadId, { text: 'Usage: .creategroup <group name> @mention1 @mention2 ...' });
      return;
    }

    const messages = args.join(' ')
    const arg = messages.split(' ');
    const mentionsStartIndex = arg.findIndex(arg => arg.startsWith('@'));
    const groupName = mentionsStartIndex === -1 ? arg.join(' ') : arg.slice(0, mentionsStartIndex).join(' ');

    console.log(groupName)
  

    const participants = [senderId, ...mentions];

    if (participants.length === 0) {
      await api.sendMessage(threadId, { text: 'Please mention at least one participant to add to the group.' });
      return;
    }

    try {
      const group = await api.groupCreate(groupName, participants);

      console.log('Created group with ID: ' + group.id);
      await api.sendMessage(group.id, { text: 'Hello everyone! Welcome to ' + groupName + '!' });

      await api.sendMessage(threadId, { text: `Group "${groupName}" created successfully with ID: ${group.id}` });
    } catch (error) {
      console.error('Error creating group:', error);
      await api.sendMessage(threadId, { text: 'An error occurred while creating the group. Please try again later.' });
    }
  },
};
