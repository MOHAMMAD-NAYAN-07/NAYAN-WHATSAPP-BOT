const { exec } = require("child_process");

module.exports = {
    config: {
        name: "shell",
        aliases: ["sh", "terminal"],
        permission: 2,
        prefix: true,
        description: "Execute shell commands and return the output.",
        usages: [".shell <command>"],
        category: "System",
        credit: "Developed by Mohammad Nayan"
    },

    start: async ({ api, event, args }) => {
        if (args.length === 0) {
            return api.sendMessage(event.threadId, { text: "❌ Please provide a shell command.\n\nUsage: .shell <command>" });
        }

        const command = args.join(" ");

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return api.sendMessage(event.threadId, { text: `❌ Error:\n${error.message}` });
            }
            if (stderr) {
                return api.sendMessage(event.threadId, { text: `⚠️ Stderr:\n${stderr}` });
            }
            return api.sendMessage(event.threadId, { text: `✅ Output:\n\n${stdout}` });
        });
    }
};
