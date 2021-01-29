const format = require('@commitlint/format').default
const load = require('@commitlint/load').default
const lint = require('@commitlint/lint').default

const CONFIG = {
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
}

module.exports = repll => {
  return load(CONFIG)
    .then(opts =>
      lint(
        repll.history.filter(e => e.length).join('\n\n'),
        opts.rules,
        opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}
      )
    )
    .then(report =>
      repll.refresh(
        `\n${format(
          { results: [report] },
          { verbose: true, helpUrl: 'www.conventionalcommits.org' }
        )}`
      )
    )
}
