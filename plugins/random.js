const axios = require("axios");

  module.exports = {
    config: {
      name: "random",
      aliases: ["rndm"],
      permission: 0,
      prefix: true,
      categorie: "Entertainment",
      credit: "Developed by Mohammad Nayan",
      description: "Fetches a random video or a video based on a query.",
      usages: [
        `${global.config.PREFIX}random - Fetches a random video.`,
        `${global.config.PREFIX}random <query> - Fetches a video based on the provided query.`,
      ],
    },

  start: async ({ event, api, args }) => {
    const msg = args.join(" ");

    try {
      const apiData = await axios.get(
        "https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json"
      );
      const apiBaseURL = apiData.data.api;

      if (!msg) {
        
        try {
          const res = await axios.get(`${apiBaseURL}/video/mixvideo`);

          let video = `${res.data.url.url}`;
          let name = `${res.data.url.name}`;
            let cp = `${res.data.cp}`
          let ln = `${res.data.length}`

          await api.sendMessage(event.threadId, {
            video: { url: video },
            caption: `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
          });
        } catch (randomError) {
          console.error("Error fetching random video:", randomError);
          await api.sendMessage(event.threadId, {
            text: "❌ Failed to fetch a random video. Please try again later.",
          });
        }
        return;
      }

      
      try {
        const response = await axios.get(`${apiBaseURL}/random?name=${encodeURIComponent(msg)}`);
        console.log(response.data);

        const { url: videoURL, name, cp, length: ln } = response.data.data;

        await api.sendMessage(event.threadId, {
          video: { url: videoURL },
          caption: `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
        });
      } catch (searchError) {
        console.error("Error fetching video based on query:", searchError);
        await api.sendMessage(event.threadId, {
          text: "❌ Failed to fetch a video for your query. Please try again later.",
        });
      }
    } catch (mainError) {
      console.error("Error fetching API base URL or processing request:", mainError);
      await api.sendMessage(event.threadId, {
        text: "❌ An unexpected error occurred. Please try again later.",
      });
    }
  },
};
