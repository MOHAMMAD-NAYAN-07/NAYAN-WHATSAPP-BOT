const { alldown } = require("nayan-videos-downloader");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

  module.exports = {
    config: {
      name: "alldown",
      aliases: ["vd"],
      permission: 0,
      prefix: true,
      description: "Download video from a given URL and send the video file.",
      categorie: "Media",
      usages: [
        "<URL> - Download the video from the provided URL and send it.",
        "Simply paste a URL starting with 'https' to download.",
      ],
    },

  event: async ({ event, api, body }) => {
    const { threadId, react } = event;

    if (!body || !body.startsWith("https")) return;

    const url = body.trim();

    try {
      const data = await alldown(url);

      if (!data || !data.data) {
        await react("❌")
        await api.sendMessage(threadId, { text: "Failed to fetch video details. Please check the URL and try again." });
        return;
      }

      const videoDetails = data.data;
      const lowQualityVideo = videoDetails.low;
      const videoFileName = path.join(__dirname, `temp_video_${Date.now()}.mp4`);

      const videoStream = await axios({
        url: lowQualityVideo,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream(videoFileName);
      videoStream.data.pipe(writer);

      writer.on("finish", async () => {
        try {
          await react("✔️")
          await api.sendMessage(threadId, {
            video: { stream: fs.createReadStream(videoFileName) },
            caption: `🎥 *Video Details* 🎥\n\n*Title:* ${videoDetails.title}`,
          });

          fs.unlink(videoFileName, (err) => {
            if (err) console.error(`Failed to delete file ${videoFileName}:`, err);
          });
        } catch (sendError) {
          console.error("Error sending video:", sendError);
        }
      });

      writer.on("error", async (error) => {
        console.error("Error writing video file:", error);
        await api.sendMessage(threadId, { text: "An error occurred while downloading the video. Please try again." });
      });
    } catch (error) {
      console.error("Error fetching video details:", error);
      await api.sendMessage(threadId, { text: "An error occurred while fetching the video. Please try again." });
    }
  },

  start: async ({ api, event, args }) => {
    const { threadId, react } = event;

    if (!args[0] || !args[0].startsWith("http")) {
      await api.sendMessage(threadId, { text: `Please provide a valid URL. Usage: ${global.config.PREFIX}alldown <URL>` });
      return;
    }

    const url = args[0];

    try {
      const data = await alldown(url);

      if (!data || !data.data) {
        await react("❌")
        await api.sendMessage(threadId, { text: "Failed to fetch video details. Please check the URL and try again." });
        return;
      }

      const videoDetails = data.data;
      const lowQualityVideo = videoDetails.low;
      const videoFileName = path.join(__dirname, `temp_video_${Date.now()}.mp4`);

      const videoStream = await axios({
        url: lowQualityVideo,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream(videoFileName);
      videoStream.data.pipe(writer);

      writer.on("finish", async () => {
        try {
          await react("✔️")
          await api.sendMessage(threadId, {
            video: { stream: fs.createReadStream(videoFileName) },
            caption: `🎥 *Video Details* 🎥\n\n*Title:* ${videoDetails.title}`,
          });

          fs.unlink(videoFileName, (err) => {
            if (err) console.error(`Failed to delete file ${videoFileName}:`, err);
          });
        } catch (sendError) {
          console.error("Error sending video:", sendError);
        }
      });

      writer.on("error", async (error) => {
        console.error("Error writing video file:", error);
        await api.sendMessage(threadId, { text: "An error occurred while downloading the video. Please try again." });
      });
    } catch (error) {
      console.error("Error fetching video details:", error);
      await api.sendMessage(threadId, { text: "An error occurred while fetching the video. Please try again." });
    }
  },
};