module.exports = {
  config: {
    name: 'contact',
    aliases: [],
    permission: 2,
    prefix: 'both',
    categories: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
    usages: [
      `${global.config.PREFIX}contact - Send contact information for Mohammad Nayan.`,
    ]
  },

  start: async ({ event, api }) => {
    const { threadId } = event;

    const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Mohammad Nayan\n'
            + 'ORG:Nayan;\n'
            + 'TEL;type=CELL;type=VOICE;waid=8801615298449:01615298449\n'
            + 'END:VCARD';

    const sentMsg = await api.sendMessage(
      threadId,
      { 
        contacts: { 
          displayName: 'Mohammad Nayan', 
          contacts: [{ vcard }] 
        }
      }
    );
  }
};
