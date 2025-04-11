const { text2voice } = require("nayan-apis-server");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "speech",
    aliases: ["say"],
    permission: 0,
    prefix: true,
    cooldowns: 5,
    description: "Convert text to speech and send as an audio file.",
    categorie: "Media",
    usages: ["speech <text> - Convert text to speech.", "Reply to a message with 'speech' to convert it."],
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId, replyMessage, message } = event;

    let content = args.join(" ") || replyMessage;

    if (!content) {
      await api.sendMessage(threadId, { text: "❌ Please provide text to convert to speech." }, { quoted: message });
      return;
    }

    const filePath = path.join(__dirname, "cache", `speech_${Date.now()}.mp3`);

    try {
      await text2voice(content, "Nabanita", filePath); 

      
      

      await api.sendMessage(threadId, {
        audio: { url: filePath },
        mimetype: "audio/mpeg",
        
      }, { quoted: message });

      
      setTimeout(() => fs.unlinkSync(filePath), 5000);
    } catch (error) {
      console.error("Error in text-to-speech:", error);
      await api.sendMessage(threadId, { text: "❌ Failed to generate speech. Please try again." }, { quoted: message });
    }
  },
};
