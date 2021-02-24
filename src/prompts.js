const c = require('chalk')
const prompts = {
  [c`\n{blue description› }`]: '<type>[optional scope]: <description>',
  [c`\n{blue body› }`]: '[optional body]',
  [c`\n{blue footer› }`]: '[optional footer(s)]',
  [c`\n{green Your commit message is: <hide>}`]: '',
}

module.exports = prompts
