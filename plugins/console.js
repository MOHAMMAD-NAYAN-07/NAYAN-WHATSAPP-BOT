const chalk = require('chalk');

  module.exports = {
    config: {
      name: "showDetails", 
      aliases: ["details", "msgDetails"], 
      permission: 0,
      prefix: true,
      categorie: 'Utility',
      credit: 'Developed by Mohammad Nayan',
      usages: [
        `${global.config.PREFIX}showDetails - Displays message details for the current event.`,
        `${global.config.PREFIX}details - Alias for showing message details.`,
        `${global.config.PREFIX}msgDetails - Another alias for showing message details.`
      ]
    },

  event: async ({ event, body}) => {
    
    const {threadId, senderId, reactionMessage } = event;
    const senderName = event.message.pushName || "Unknown";
    let msg;
    if (reactionMessage){
      msg = `reactions: ${reactionMessage.text}`
    } else {
      msg = body || "No message text.";
    }
    
    const isGroup = threadId.endsWith("@g.us") ? "Group" : "Private";

    
    const userDetails = `\n` +
      chalk.green(
        `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      ) +
      chalk.blueBright(`📂 Chat Type: ${chalk.white(isGroup)}`) +
      `\n` +
      chalk.blue(`📌 Sender Name: ${chalk.white(senderName)}`) +
      `\n` +
      chalk.blue(`📌 Sender ID: ${chalk.white(senderId)}`) +
      `\n` +
      chalk.blue(`📌 Thread ID: ${chalk.white(threadId)}`) +
      `\n` +
      chalk.blue(`📌 Message: ${chalk.blueBright(msg)}`) +
      `\n` +
      chalk.green(
        `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`
      );

    
    console.log(userDetails);
  },
};
