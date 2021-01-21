const { replLive, onTab, onLine, onInput } = require('repll')
const c = require('chalk')
const { checkType, checkScope, checkDes } = require('./continuousCheck')
const { typeMap, areaDes } = require('./convention')
const { prompts, placeholder } = require('./repl')

const repll = replLive(prompts, placeholder[0])

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
      const commit = repll.history.filter(e => e.length)
      repll.refresh(
        c`\n{yellow ${commit.join('\n\n')}\n\n}{red Press ctrl+d to commit it, ctrl+c to quit}`
      )
      break
    }
  }
  if (placeholder[l - 1]) return placeholder[l - 1]
})

onInput(() => {
  continuousCheck()
})

onTab(v => {
  continuousCheck()
  const selectedList = Object.keys(typeMap).filter(
    e => e.startsWith(v) && e.length > v.length
  )
  return [selectedList, typeMap]
})

function printTips(name) {
  repll.refresh(areaDes[name])
  return false
}

// Continuous check
function continuousCheck() {
  if (repll.inputLine === 1)
    if (printTips('type') || checkType(repll))
      if (printTips('scope') || checkScope(repll))
        printTips('des') || checkDes(repll)
}
