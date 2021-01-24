const format = require('@commitlint/format').default
const load = require('@commitlint/load').default
const lint = require('@commitlint/lint').default

const CONFIG = {
  extends: ['@commitlint/config-conventional'],
}

let savedMes = ['', '', '']

module.exports = repll => {
  savedMes[repll.history.length] = repll.input.replace(/\s{3,}/g, '\n')
  return load(CONFIG)
    .then(opts =>
      lint(
        savedMes.filter(e => e.length).join('\n\n'),
        opts.rules,
        opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}
      )
    )
    .then(report =>
      repll.refresh('\n' + format({ results: [report] }, { verbose: true }))
    )
}
