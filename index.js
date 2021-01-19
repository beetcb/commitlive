const { replLive, refresh, onTab, onLine, onInput } = require('repll')
const conventionalMap = require('./convention')

const prompts = [
  'description› ',
  'body› ',
  'footer› ',
  'Your commit message is: ',
]
const repll = replLive(
  prompts,
  '<type>[optional scope]: <description>, press TAB to show some hints'
)

const status = {
  typed: false,
  scoped: false,
  descriped: false,
  isBody: false,
  isFooter: false,
}

onTab(v => {
  refresh()
  const selectedList = Object.keys(conventionalMap).filter(
    e => e.includes(v) && e.length > v.length
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
  const { rl } = repll
  const addDes = () =>
    refresh('Now add description: a short summary of the code changes')
  if (/\(\w+\)/.test(repll.input)) {
    addDes()
    // rl.write(': ')
    return (status.scoped = true)
  }
  if (/\:$/.test(repll.input)) {
    addDes()
    // rl.write(' ')
    return true
  }
}

function checkDes() {
  if (!repll.input.endsWith(': ')) {
    refresh(
      'Now add optional body: providing additional contextual information'
    )
    return (status.descriped = true)
  } else {
    // The description is empty!
  }
}

function checkBody() {
  refresh('Now add optional one or more footers')
  return (status.isBody = true)
}

function checkFooter() {
  refresh(`${repll.input}\n\nPress ctrl+s to commit it, ctrl+c to quit`)
  return (status.isFooter = true)
}
