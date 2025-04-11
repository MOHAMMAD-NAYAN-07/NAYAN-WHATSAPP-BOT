const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

async function start({ api, event, args }) {
    const language =  'en';
    const text = args.join(' ');

    if (!text) {
        await api.sendMessage(event.threadId, { text: 'Please provide the text for TTS conversion.' });
        return;
    }

    const fileName = `tts-${Date.now()}.mp3`;
    const filePath = path.join(__dirname, '..', 'assets', fileName);

    const gtts = new gTTS(text, language);
    gtts.save(filePath, async function (err) {
        if (err) {
            await api.sendMessage(event.threadId, { text: 'Error generating TTS audio.' });
            return;
        }

        await api.sendMessage(event.threadId, {
            audio: { url: filePath },
            mimetype: 'audio/mpeg'
        });

        fs.unlinkSync(filePath);
    });
}

module.exports = {
    config: {
        name: 'tts',
        aliases: [],
        permission: 0,
        prefix: true,
        description: 'Converts text to speech.',
        usage: [
            `${global.config.PREFIX}tts <text> - Converts the given text to speech and sends an audio message.`,
        ],
        categories: 'Media',
        credit: 'Developed by Mohammad Nayan',
    },
    start
};
