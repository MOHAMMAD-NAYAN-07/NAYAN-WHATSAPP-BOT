const fs = require('fs');
const path = require('path');
const isAdmin = global.isAdmin

const warningsFilePath = path.join(__dirname, '../Nayan/data/warnings.json');

function loadWarnings() {
    if (!fs.existsSync(warningsFilePath)) {
        fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf8');
    }
    const data = fs.readFileSync(warningsFilePath, 'utf8');
    return JSON.parse(data);
}

function saveWarnings(warnings) {
    fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 2), 'utf8');
}

  module.exports = {
    config: {
      name: 'warn',
      aliases: [],
      permission: 2,
      prefix: 'both',
      description: 'Warns a user. After 3 warnings, the user is removed from the group.',
      usage: [
        `${global.config.PREFIX}warn @user - Warns the mentioned user.`,
        `${global.config.PREFIX}warn @user list - Shows the warning count for the mentioned user.`,
      ],
      categories: 'Moderation',
      credit: 'Developed by Mohammad Nayan',
    },

  start: async ({ api, event, args }) => {
    const { isGroup, threadId: chatId, senderId, mentions } = event;

    if (!isGroup) {
      await api.sendMessage(chatId, { text: 'This command can only be used in groups.' });
      return;
    }

    const { isSenderAdmin, isBotAdmin } = await isAdmin(api, chatId, senderId);

    if (!isBotAdmin) {
      await api.sendMessage(chatId, { text: 'Please make the bot an admin first.' });
      return;
    }

    if (!isSenderAdmin) {
      await api.sendMessage(chatId, { text: 'Only group admins can use the warn command.' });
      return;
    }

    if (mentions.length === 0) {
      await api.sendMessage(chatId, { text: 'Please mention a user to warn.' });
      return;
    }

    const warnings = loadWarnings();
    const userToWarn = mentions[0];
      const warningCount = warnings[userToWarn] || 0;
      if (args[0] === 'list'){
          return await api.sendMessage(chatId, { text: `User has ${warningCount} warning(s).` });
      }

    warnings[userToWarn] = warnings[userToWarn] ? warnings[userToWarn] + 1 : 1;
    saveWarnings(warnings);

    if (warnings[userToWarn] >= 3) {
      try {
        await api.groupParticipantsUpdate(chatId, [userToWarn], 'remove');
        delete warnings[userToWarn];
        saveWarnings(warnings);
        await api.sendMessage(chatId, {
          text: `User has been removed from the group after receiving 3 warnings.`,
        });
      } catch (error) {
        await api.sendMessage(chatId, {
          text: 'Failed to remove the user. Ensure the bot has admin privileges.',
        });
      }
    } else {
      await api.sendMessage(chatId, {
        text: `User has been warned. Total warnings: ${warnings[userToWarn]}`,
      });
    }
  },
};
