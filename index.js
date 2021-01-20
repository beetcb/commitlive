const { replLive, onTab, onLine, onInput } = require('../repll/index')
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
        `${commit.join('\n\n')}\nPress ctrl+d to commit it, ctrl+c to quit`
      )
      break
    }
  }
  if (placeholder[l - 1]) return placeholder[l - 1]
})

onInput(() => {
  // Continuous check
  if (repll.inputLine === 1)
    if (printTips('type') || checkType(repll))
      if (printTips('scope') || checkScope(repll))
        printTips('des') || checkDes(repll)
})

onTab(v => {
  const selectedList = Object.keys(typeMap).filter(
    e => e.startsWith(v) && e.length > v.length
  )
  return [selectedList, typeMap]
})

function printTips(name) {
  repll.refresh(areaDes[name])
  return false
}
