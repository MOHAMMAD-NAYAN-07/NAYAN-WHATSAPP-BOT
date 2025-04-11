  module.exports = {
    config: {
      name: 'dare',
      aliases: ['dareme', 'challenge'],
      permission: 0,
      prefix: true,
      categorie: 'Games',  
      credit: 'Developed by Mohammad Nayan',  
      usages: [
        `${global.config.PREFIX}dare - Challenge the user with a random dare.`,
        `${global.config.PREFIX}dareme - Alias for the dare command.`,
        `${global.config.PREFIX}challenge - Another alias for the dare command.`
      ]
    },
  start: async ({ event, api }) => {
    const { threadId } = event;

    const dares = [
      "Sing a song for the group!",
      "Do 10 push-ups.",
      "Talk in a funny accent for the next 5 minutes.",
      "Send a selfie doing a funny face.",
      "Let someone text anything they want from your phone."
    ];

    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    await api.sendMessage(threadId, { text: `🔥 Dare: ${randomDare}` });
  }
};
