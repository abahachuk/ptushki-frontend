module.exports = {
  "*.{ts,tsx,js,jsx}": ["npm run lint:fix", "git add"],
  "*.{json,md,yaml,yml}": ["prettier --write", "git add"],
  "{.eslintrc}": ["prettier --write", "git add"]
};
