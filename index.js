const c = require('chalk')
const { replLive, onTab, onLine, onInput, onStop, onSubmit } = require('repll')
const lint = require('./lint')
const { findIssuePR, gitCommit } = require('./git')
const { checkType, checkScope, checkDes } = require('./continuousCheck')
const { typeMap, areaDes } = require('./convention')
const { prompts, placeholder } = require('./repl')

const repll = replLive(prompts, placeholder[0])

let commitMes = ''

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
        )}\n\n}{red Press ctrl+d to commit it, ctrl+c to quit}`
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
  continuousCheck() && lint(repll)
})

onTab(v => {
  continuousCheck()
  const selectedList = Object.keys(typeMap).filter(
    e => e.startsWith(v) && e.length > v.length
  )
  return repll.inputLine === 1 ? [selectedList, typeMap] : [[]]
})

onSubmit(() => {
  repll.refresh(gitCommit(process.argv[2], commitMes.join('\n\n')))
})

function printTips(name) {
  repll.refresh(areaDes[name])
  return false
}

// Continuous check
function continuousCheck() {
  if (repll.inputLine === 1)
    if (printTips('type') || checkType(repll))
      if (printTips('scope') || checkScope(repll)) {
        printTips('des') || checkDes(repll)
        return true
      }
}
