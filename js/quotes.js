const quotes = [
  "Trust the vibes you get, energy doesn’t lie",
  "You can choose to be either bitter or better",
  "Today is a perfect day to start living your dreams",
  "Be such a beautiful soul that people crave your vibes",
  "Attitude is a little thing that makes a big difference",
  "Happiness starts with you. Not with your relationship, not with your job, not with your money, but with you",
  "I am ready for my next big adventure.",
  "I am like sunshine on a cloudy day!",
  "Keep calm and carry on",
  "My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style.",
];

const quote = document.querySelector(".quotes span:first-child");

const TodaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = TodaysQuote;
