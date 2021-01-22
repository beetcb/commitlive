const format = require('@commitlint/format').default
const load = require('@commitlint/load').default
const lint = require('@commitlint/lint').default

const CONFIG = {
  extends: ['@commitlint/config-conventional'],
}

module.exports = repll =>
  load(CONFIG)
    .then(opts =>
      lint(
        repll.input,
        opts.rules,
        opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}
      )
    )
    .then(
      report =>
        !Boolean(report.valid) &&
        repll.refresh('\n' + format({ results: [report] }))
    )
