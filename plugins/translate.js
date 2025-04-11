const axios = require('axios');

const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(
      `https://translate.googleapis.com/translate_a/single`,
      null,
      {
        params: {
          client: 'gtx',
          sl: 'auto',
          tl: targetLang,
          dt: 't',
          q: text,
        },
      }
    );
    const translated = response.data[0][0][0];
    return translated;
  } catch (error) {
    console.error('Error translating text:', error.message);
    throw new Error('Failed to translate the text. Please try again.');
  }
};

module.exports = {
  config: {
    name: 'translate',
    aliases: ['tr'],
    permission: 0,
    prefix: true,
    description: 'Translate text to the specified language.',
    usage: [
      'translate <language code> <text> - Translate text to the specified language.',
      'translate en Hola - Translates "Hola" to English.',
      'Reply to a message with translate <language code> to translate it.',
    ],
    categories: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
  },

  start: async ({ event, api, args }) => {
    const { threadId, replyMessage } = event;

    if (args.length < 1) {
      await api.sendMessage(threadId, {
        text: 'Usage: translate <language code> <text>\nExample: translate en Hola\nYou can also reply to a message with translate <language code>',
      });
      return;
    }

    const targetLanguage = args[0];
    let textToTranslate;

    if (replyMessage === null) {
      textToTranslate = args.slice(1).join(' ');
    } else {
      textToTranslate = replyMessage;
    }

    try {
      const translatedText = await translateText(textToTranslate, targetLanguage);

      await api.sendMessage(threadId, {
        text: `🌐 Translated to *${targetLanguage}*:\n\n${translatedText}`,
      });
    } catch (error) {
      console.error('Error during translation:', error);
      await api.sendMessage(threadId, {
        text: '❌ An error occurred while translating the text. Please try again later.',
      });
    }
  },
};
