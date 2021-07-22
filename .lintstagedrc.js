module.exports = {
  "*":"git add",
  "*.{js,jsx,ts,tsx}": "eslint --cache --fix",
  "**/*.{js,jsx,ts,tsx,css,scss,less,sass,md,html,json}": [
    "prettier --write",
  ],
  "**/*.{js,jsx,ts,tsx}": "yarn lint-staged:js",
}
