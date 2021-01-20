const { replLive, onTab, onLine, onInput } = require('repll')
const conventionalMap = require('./convention')

const status = {
  typed: false,
  scoped: false,
  descriped: false,
  isBody: false,
  isFooter: false,
}

const prompts = [
  'description› ',
  'body› ',
  'footer› ',
  'Your commit message is: <hide>',
]

const repll = replLive(
  prompts,
  '<type>[optional scope]: <description>, press TAB to show some hints'
)
const { refresh } = repll

onTab(v => {
  const selectedList = Object.keys(conventionalMap).filter(
    e => e.startsWith(v) && e.length > v.length
  )
  return [selectedList, conventionalMap]
})

onLine(l => {
  if (l === 2) {
    checkDes()
    return '[optional body]'
  } else if (l === 3) {
    checkBody()
    return '[optional footer(s)]'
  } else if (l === 4) {
    checkFooter()
  } else {
    checkFooter()
    // process.exit()
  }
})

onInput(() => {
  if (repll.inputLine === 1) checkType() || checkScope()
})

function checkType() {
  if (Object.keys(conventionalMap).some(e => e === repll.input)) {
    refresh(
      'Optionally add a scope: describing a section of the codebase surrounded by parenthesis'
    )
    return (status.typed = true)
  }
}

function checkScope() {
  const addDes = () =>
    refresh('Now add description: a short summary of the code changes')
  if (/\(\w+\)$/.test(repll.input)) {
    addDes()
    repll.write(': ')
    return (status.scoped = true)
  }
  if (/\:$/.test(repll.input)) {
    addDes()
    repll.write(' ')
    return true
  }
}

function checkDes() {
  if (!repll.input.endsWith(': ')) {
    refresh(
      'Now optionally add body: providing additional contextual information'
    )
    return (status.descriped = true)
  } else {
    // The description is empty!
  }
}

function checkBody() {
  refresh('Now optionally add footers')
  return (status.isBody = true)
}

function checkFooter() {
  refresh(
    `${repll.history.join('\n\n')}\nPress ctrl+s to commit it, ctrl+c to quit`
  )
  return (status.isFooter = true)
}
