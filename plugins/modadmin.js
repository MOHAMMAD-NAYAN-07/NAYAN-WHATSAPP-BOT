const fs = require("fs");
const path = require("path");

const modAdminFile = path.join(__dirname, "../Nayan/data", "modAdmin.json");


if (!fs.existsSync(path.dirname(modAdminFile))) {
  fs.mkdirSync(path.dirname(modAdminFile));
}
if (!fs.existsSync(modAdminFile)) {
  fs.writeFileSync(modAdminFile, JSON.stringify({}, null, 2));
}

  module.exports = {
    config: {
      name: "modadmin",
      aliases: ["ma", "mod"],
      permission: 2,
      prefix: true,
      categorie: "Administration",
      credit: "Developed by Mohammad Nayan",
      description: "Toggle modAdmin functionality on or off for this thread.",
      usages: [
        `${global.config.PREFIX}modadmin - Check the current state of modAdmin.`,
        `${global.config.PREFIX}modadmin on - Enable modAdmin for this thread.`,
        `${global.config.PREFIX}modadmin off - Disable modAdmin for this thread.`,
      ],
    },

  start: async ({ api, event, args }) => {
    const { threadId } = event;

    
    let modAdminData;
    try {
      modAdminData = JSON.parse(fs.readFileSync(modAdminFile, "utf-8"));
    } catch (error) {
      modAdminData = {};
    }

    const currentState = modAdminData[threadId] || "off";

    if (!args.length) {
      await api.sendMessage(
        threadId,
        { text: `modAdmin is currently *${currentState}*. Use "on" or "off" to change the state.` }
      );
      return;
    }

    const newState = args[0].toLowerCase();
    if (newState !== "on" && newState !== "off") {
      await api.sendMessage(threadId, { text: 'Invalid argument. Use "on" or "off".' });
      return;
    }

    
    modAdminData[threadId] = newState;

    try {
      fs.writeFileSync(modAdminFile, JSON.stringify(modAdminData, null, 2));
      await api.sendMessage(threadId, { text: `modAdmin has been turned *${newState}* for this thread.` });
    } catch (error) {
      console.error("Error saving modAdmin data:", error);
      await api.sendMessage(threadId, { text: "Failed to save modAdmin state. Please try again later." });
    }
  },
};
