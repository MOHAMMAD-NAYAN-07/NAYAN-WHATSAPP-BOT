const axios = require('axios');

let triviaGames = {};

  module.exports = {
    config: {
      name: 'trivia',
      aliases: ['trv'],
      permission: 0,
      prefix: true,
      description: 'Start a trivia game or answer trivia questions.',
      usage: [
        `${global.config.PREFIX}trivia - Start a new trivia game.`,
        `${global.config.PREFIX}trv - Alias for the same functionality.`,
      ],
      categories: 'Games',
      credit: 'Developed by Mohammad Nayan',
    },

  
  start: async ({ api, event }) => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const questionData = response.data.results[0];

      const options = [...questionData.incorrect_answers, questionData.correct_answer].sort();

      triviaGames[event.threadId] = {
        question: questionData.question,
        correctAnswer: questionData.correct_answer,
        options,
      };

      await api.sendMessage(event.threadId, {
        text: `🎉 Trivia Time!\n\n**Question:** ${questionData.question}\n\n**Options:**\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nReply with the correct option number!`,
      });
    } catch (error) {
      console.error('Error fetching trivia question:', error.message);
      await api.sendMessage(event.threadId, { text: '⚠️ Error fetching trivia question. Please try again later.' });
    }
  },

  
  event: async ({ api, event, body }) => {
    const answer = body.trim();
    if (!answer || isNaN(answer)) return;

    const threadId = event.threadId;
    if (!triviaGames[threadId]) {
      return;
    }

    const game = triviaGames[threadId];
    const selectedOption = parseInt(answer, 10);

    if (selectedOption < 1 || selectedOption > game.options.length) {
      await api.sendMessage(threadId, { text: '⚠️ Invalid option. Please reply with a valid option number.' });
      return;
    }

    const selectedAnswer = game.options[selectedOption - 1];

    if (selectedAnswer.toLowerCase() === game.correctAnswer.toLowerCase()) {
      await api.sendMessage(threadId, { text: `✅ Correct! The answer is **${game.correctAnswer}**.` });
    } else {
      await api.sendMessage(threadId, { text: `❌ Wrong! The correct answer was **${game.correctAnswer}**.` });
    }

    delete triviaGames[threadId];
  },
};
