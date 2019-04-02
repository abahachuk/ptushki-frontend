module.exports = {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "git add"],
  "*.{json,md}": ["prettier --write", "git add"],
  "{.eslintrc}": ["prettier --write", "git add"]
};
