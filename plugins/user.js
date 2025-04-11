module.exports = {
  config: {
    name: "user",
    aliases: ["manageuser"],
    description: "Block, unblock, ban, or unban a user.",
    usages: [
      ".user block @mention - Blocks the mentioned user.",
      ".user unblock @mention - Unblocks the mentioned user.",
      ".user ban @mention - Bans the mentioned user.",
      ".user unban @mention - Unbans the mentioned user.",
    ],
    permission: 2,
    prefix: true,
    category: "Moderation",
    credit: "Developed by Mohammad Nayan",
  },

  start: async ({ event, api, args }) => {
    const { threadId, mentions } = event;

    // Validate arguments
    if (args.length < 1 || Object.keys(mentions).length === 0) {
      return api.sendMessage(threadId, {
        text: "Usage: .user <block/unblock/ban/unban> @mention",
      });
    }

    const action = args[0]?.toLowerCase();
    const validActions = ["block", "unblock", "ban", "unban"];
    if (!validActions.includes(action)) {
      return api.sendMessage(threadId, {
        text: "⚠️ Invalid action. Use block, unblock, ban, or unban.",
      });
    }

    try {
      const mentionedUsers = mentions; 
      const bannedData = (await global.data.get("banned_users.json")) || {};

      for (const userId of mentionedUsers) {
        const userName = `@${userId.split('@')[0]}`

        
        if (["block", "unblock"].includes(action)) {
          await api.updateBlockStatus(userId, action);
          await api.sendMessage(threadId, {
            text: `✅ User ${userName} has been ${action}ed.`,
            mentions: [userId],
          });
        }

        
        if (action === "ban") {
          if (bannedData[userId]) {
            await api.sendMessage(threadId, {
              text: `⚠️ User ${userName} is already banned.`,
              mentions: [userId],
            });
          } else {
            bannedData[userId] = `@${userId.split('@')[0]}`;
            await global.data.set("banned_users.json", bannedData);
            await api.sendMessage(threadId, {
              text: `🚫 User ${userName} has been banned.`,
              mentions: [userId],
            });
          }
        } else if (action === "unban") {
          if (!bannedData[userId]) {
            await api.sendMessage(threadId, {
              text: `⚠️ User ${userName} is not banned.`,
              mentions: [userId],
            });
          } else {
            delete bannedData[userId];
            await global.data.set("banned_users.json", bannedData);
            await api.sendMessage(threadId, {
              text: `✅ User ${userName} has been unbanned.`,
              mentions: [userId],
            });
          }
        }
      }
    } catch (error) {
      console.error("Error in user command:", error);
      return api.sendMessage(threadId, {
        text: `❌ An error occurred: ${error.message}`,
      });
    }
  },
};
