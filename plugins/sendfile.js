const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "sendfile",
        aliases: ["getfile", "fetchfile"],
        permission: 2,
        prefix: true,
        description: "Upload a script file to Pastebin and send the links.",
        categories: "Utility",
        usages: [".sendfile <filename>", ".getfile <filename>"],
        credit: "Developed by Mohammad Nayan"
    },

    start: async function ({ api, event, args }) {
        if (!args || args.length === 0) {
            return api.sendMessage(event.threadId, { text: "❌ Please specify the file name. Example: `.sendfile help.js`" });
        }

        const fileName = args.join(" ").trim();
        if (!fileName) {
            return api.sendMessage(event.threadId, { text: "❌ Invalid file name. Try `.sendfile help.js`" });
        }

        const filePath = path.join(__dirname, fileName.endsWith(".js") ? fileName : `${fileName}.js`);

        if (!fs.existsSync(filePath)) {
            return api.sendMessage(event.threadId, { text: `❌ The file **${fileName}** does not exist.` });
        }

        try {
            const fileContent = fs.readFileSync(filePath, "utf8");

            const api_dev_key = 'R8HQ1YX3ihaJ3vgm7p9u80xyNLZJ03fi';
            const api_paste_code = fileContent;
            const api_paste_private = '1';
            const api_paste_name = fileName;
            const api_paste_expire_date = '10M';
            const api_paste_format = 'php';
            const api_user_key = '';

            const url = 'https://pastebin.com/api/api_post.php';

            const data = querystring.stringify({
                api_option: 'paste',
                api_user_key: api_user_key,
                api_paste_private: api_paste_private,
                api_paste_name: api_paste_name,
                api_paste_expire_date: api_paste_expire_date,
                api_paste_format: api_paste_format,
                api_dev_key: api_dev_key,
                api_paste_code: api_paste_code
            });

            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            if (response.data.includes("Bad API request")) {
                return api.sendMessage(event.threadId, { text: "❌ Failed to upload the file to Pastebin." });
            }

            const pastebinLink = response.data;
            const rawLink = pastebinLink.replace("pastebin.com", "pastebin.com/raw");

            return api.sendMessage(event.threadId, {
                text: `📄 **${fileName}** has been uploaded!\n🔗 **Direct Link**: ${pastebinLink}\n🔗 **Raw Link**: ${rawLink}`
            });
        } catch (error) {
            console.error("Error in sendfile command:", error);
            return api.sendMessage(event.threadId, { text: "❌ Failed to upload the file. Please try again later." });
        }
    }
};
