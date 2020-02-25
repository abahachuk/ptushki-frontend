module.exports = {
  endOfLine: 'lf',
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
      files: ['*.ts'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
    {
      files: '*.ya?ml',
      options: {
        parser: 'yaml',
      },
    },
  ]
};
