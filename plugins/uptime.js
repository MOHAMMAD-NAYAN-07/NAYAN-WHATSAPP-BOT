  module.exports = {
    config: {
      name: "uptime",
      aliases: ["up"],
      permission: 0,
      prefix: true,
      description: "Check the bot's uptime.",
      usage: [
        `${global.config.PREFIX}uptime - Displays the bot's uptime.`,
        `${global.config.PREFIX}up - Alias for the same functionality.`,
      ],
      categories: "Bot Management",
      credit: "Developed by Mohammad Nayan",
    },

  start: async ({ api, event }) => {
    const { threadId } = event;

    const getUptime = () => {
      const uptimeMs = Date.now() - global.botStartTime;
      const seconds = Math.floor((uptimeMs / 1000) % 60);
      const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
      const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

      let uptimeString = "";
      if (days) uptimeString += `${days} day(s), `;
      if (hours) uptimeString += `${hours} hour(s), `;
      if (minutes) uptimeString += `${minutes} minute(s), `;
      uptimeString += `${seconds} second(s)`;

      return uptimeString;
    };

    await api.sendMessage(threadId, { text: `🤖 Bot Uptime: ${getUptime()}` });
  },
};
