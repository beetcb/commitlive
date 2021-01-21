const c = require('chalk')

exports.prompts = [
  'description› ',
  'body› ',
  'footer› ',
  'Your commit message is: <hide>',
].map(e => c`{blue ${e}}`)

exports.placeholder = [
  '<type>[optional scope]: <description>, press TAB to show some hints',
  '[optional body]',
  '[optional footer(s)]',
]
