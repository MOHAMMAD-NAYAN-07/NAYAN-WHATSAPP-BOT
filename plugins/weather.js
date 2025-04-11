const axios = require('axios');

  module.exports = {
    config: {
      name: 'weather',
      aliases: ['wthr'],
      permission: 0,
      prefix: true,
      description: 'Fetches the current weather for a specified city.',
      usage: [
        `${global.config.PREFIX}weather <city> - Fetches the current weather for the specified city.`,
        `${global.config.PREFIX}wthr <city> - Alias for the same functionality.`,
      ],
      categories: 'Information',
      credit: 'Developed by Mohammad Nayan',
    },

  start: async ({ api, event, args }) => {
    const { threadId } = event;

    if (args.length === 0) {
      await api.sendMessage(chatId, { text: 'Please provide a city name.' });
      return;
    }

    const city = args.join(' ');

    try {
      const apiKey = '4902c0f2550f58298ad4146a92b65e10';  // Replace with your OpenWeather API Key
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weather = response.data;
      const weatherText = `Weather in ${weather.name}: ${weather.weather[0].description}. Temperature: ${weather.main.temp}°C.`;
      await api.sendMessage(threadId, { text: weatherText });
    } catch (error) {
      console.error('Error fetching weather:', error);
      await api.sendMessage(threadId, { text: 'Sorry, I could not fetch the weather right now.' });
    }
  },
};
