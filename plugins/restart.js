module.exports = {
  config: {
    name: "restart",
    aliases: ["reboot"],
    permission: 2,
    prefix: true,
    description: "Restart the bot.",
    categorie: "Admin",
    usages: ["restart - Restart the bot."],
  },

  start: async ({ event, api }) => {
    const { threadId, message } = event;

    const process = require("process");
    await api.sendMessage(threadId, { text: "Restarting...."}, { quoted: message })
    process.exit(1)
     
  }
};
