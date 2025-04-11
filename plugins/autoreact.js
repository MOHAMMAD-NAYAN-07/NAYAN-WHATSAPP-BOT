module.exports = {
  config: {
    name: 'autoreact',
    aliases: [],
    permission: 0,
    prefix: 'both',
    description: 'Automatically reacts to messages in a thread.',
    categories: 'utility',
    usages: ['autoreact on', 'autoreact off'],
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ event, api, args }) => {
    const { threadId } = event;
    const status = args[0]?.toLowerCase();

    if (status === 'on') {
      await global.data.set('autoreact.json', { [threadId]: true });
      await api.sendMessage(threadId, { text: 'Autoreact is now *ON* for this thread.' });
    } else if (status === 'off') {
      const data = await global.data.get('autoreact.json') || {};
      delete data[threadId];
      await global.data.set('autoreact.json', data);
      await api.sendMessage(threadId, { text: 'Autoreact is now *OFF* for this thread.' });
    } else {
      await api.sendMessage(threadId, { text: 'Usage: autoreact [on/off]' });
    }
  },

  event: async ({ event }) => {
    const { threadId, react } = event;
    const data = await global.data.get('autoreact.json') || {};
    const emojis = ['👍', '😂', '❤️', '😮', '😢', '😡', '🔥', '😍', '🎉', '🤔', '💯', '👏', '🤩', '👌', '😎'];

    if (data[threadId]) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      react(randomEmoji);
    }
  },
};
