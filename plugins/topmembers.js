const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'Nayan', 'data', 'messageCount.json');

function loadMessageCounts() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    }
    return {};
}

function saveMessageCounts(messageCounts) {
    fs.writeFileSync(dataFilePath, JSON.stringify(messageCounts, null, 2));
}

function incrementMessageCount(groupId, userId) {
    const messageCounts = loadMessageCounts();

    if (!messageCounts[groupId]) messageCounts[groupId] = {};
    if (!messageCounts[groupId][userId]) messageCounts[groupId][userId] = 0;

    messageCounts[groupId][userId] += 1;
    saveMessageCounts(messageCounts);
}

async function topMembers({ sock, chatId, isGroup, cn }) {
    if (!isGroup) {
        await sock.sendMessage(chatId, { text: 'This command is only available in group chats.' });
        return;
    }

    const messageCounts = loadMessageCounts();
    const groupCounts = messageCounts[chatId] || {};

    const sortedMembers = Object.entries(groupCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, cn);

    if (sortedMembers.length === 0) {
        await sock.sendMessage(chatId, { text: 'No message activity recorded yet.' });
        return;
    }

    let response = '🏆 *Top Members Based on Message Count:*\n\n';
    sortedMembers.forEach(([userId, count], index) => {
        response += `${index + 1}. @${userId.split('@')[0]} - ${count} messages\n`;
    });

    await sock.sendMessage(chatId, {
        text: response,
        mentions: sortedMembers.map(([userId]) => userId),
    });
}

module.exports = {
  config: {
    name: "topmembers",
    aliases: ["top", "leaderboard"],
    permission: 0,
    prefix: true,
    cooldowns: 5,
    description: "Shows the top 5 members based on message count in the group.",
    usage: [
      `${global.config.PREFIX}topmembers - Displays the top 5 members based on message count.`,
      `${global.config.PREFIX}top - Alias for the same functionality.`,
    ],
    categories: "Utility",
    credit: "Developed by Mohammad Nayan",
  },
  event: async ({ event, api }) => {
    const { threadId, senderId, isGroup } = event;
    incrementMessageCount(threadId, senderId);
  },
  start: async ({ event, api, args }) => {
    const { threadId, isGroup } = event;
    const cn = args[0] || 5;
    await topMembers({ sock: api, chatId: threadId, isGroup, cn });
  },
};
