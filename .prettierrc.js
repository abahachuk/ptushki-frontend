module.exports = {
  overrides: [
    {
      files: ['*.json', '.eslintrc'],
      options: {
        parser: 'json',
        bracketSpacing: false,
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
  ],
};
