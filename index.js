#!/usr/bin/env node
const c = require('chalk')
const { replLive, onTab, onLine, onInput, onStop, onSubmit } = require('repll')
const lint = require('./src/lint')
const { findIssuePR, gitCommit } = require('./src/git')
const { checkType, checkScope, checkDes } = require('./src/continuousCheck')
const { typeMap, areaDes } = require('./src/convention')
const { prompts, placeholder } = require('./src/repl')

const repll = replLive(prompts, placeholder[0])

let commitMes = []

onLine(l => {
  switch (l) {
    case 2: {
      printTips('body')
      break
    }
    case 3: {
      printTips('footer')
      break
    }
    case 4: {
      commitMes = repll.history.filter(e => e.length)
      repll.refresh(
        c`\n{yellow ${commitMes.join(
          '\n\n'
        )}\n\n}{red Press ctrl+s to commit it, ctrl+c to quit}`
      )
      break
    }
  }
  if (placeholder[l - 1]) return placeholder[l - 1]
})

onStop(() => {
  if (repll.inputLine > 1 && !repll.issued) {
    const issuePR = findIssuePR(repll)
    if (issuePR === true) repll.issued = true
    else if (issuePR) repll.refresh(`\n${issuePR}`)
  }
}, 0.5)

onInput(() => {
  if (repll.inputLine === 1) continuousCheck() && lint(repll)
  else lint(repll)
})

onTab(v => {
  const selectedList = Object.keys(typeMap).filter(
    e => e.startsWith(v) && e.length > v.length
  )
  return repll.inputLine === 1 ? [selectedList, typeMap] : [[]]
})

onSubmit(() => {
  const commit = gitCommit(process.argv[2], commitMes.join('\n\n'))
  if (commit) {
    // If we have message to print, we shall not restore cursor
    repll.write(commit)
    process.exit()
  }
})

function printTips(name) {
  repll.refresh(areaDes[name])
  return false
}

// Continuous check
function continuousCheck() {
  if (checkType(repll) || printTips('type'))
    if (checkScope(repll) || printTips('scope'))
      if (checkDes(repll) || printTips('des')) return true
}
