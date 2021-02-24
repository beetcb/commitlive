const c = require('chalk')
const prompts = {
  [c`{blue description› }`]: '<type>[optional scope]: <description>',
  [c`{blue body› }`]: '[optional body]',
  [c`{blue footer› }`]: '[optional footer(s)]',
  [c`{green Your commit message is: <hide>}`]: '',
}

module.exports = prompts
