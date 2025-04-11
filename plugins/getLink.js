module.exports = {
  config: {
    name: "getlink",
    aliases: ["extractlink", "mediaurl", "fetchlink"],
    description: "Extracts a media link from a message and downloads it.",
    usages: [
      ".getlink - Extracts and sends the media link from the message.",
      ".extractlink - Alternative command for extracting media links.",
      ".mediaurl - Fetches and displays the media link.",
      ".fetchlink - Another alias for extracting media links."
    ],
    permission: 0,
    prefix: true,
    category: "Media",
    credit: "Developed by Mohammad Nayan",
  },
  start: async ({ event, api, args }) => {
    const { message, getLink } = event;

    try {
      const result = await getLink(api, message);

      if (result.msg) {
        api.sendMessage(event.threadId, { text: result.msg });
        return;
      }

      const { link } = result;

      await api.sendMessage(event.threadId, { text: `Media Link: ${link}` });
    } catch (error) {
      console.error(error);
      api.sendMessage(event.threadId, { text: "An error occurred while processing your request." });
    }
  },
};
