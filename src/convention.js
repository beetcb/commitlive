const c = require('chalk')

const convention = {
  typeMap: {
    // Copied from github.com/commitizen/conventional-commit-types
    build: 'Changes that affect the build system or external dependencies',
    ci: 'Changes to CI configuration files and scripts',
    chore: 'Other changes that dont modify src or test files',
    docs: 'Documentation only changes',
    feat: 'A new feature',
    fix: 'A bug fix',
    perf: 'A code change that improves performance',
    refactor: 'A code change that neither fixes a bug nor adds a feature',
    revert: 'Reverts a previous commit',
    style: 'Changes that do not affect the meaning of the code',
    test: 'Adding missing tests or correcting existing tests',
  },
  areaDes: {
    type: 'Add <type>: a noun, feat, fix, etc.',
    scope:
      'Optionally Add (scope): describing a section of the codebase surrounded by parenthesis',
    des: 'Add <description>: a short summary of the code changes',
    body: 'Optionally Add [body]: providing additional contextual information',
    footer: 'Optionally add [footers]',
  },
}

const { areaDes } = convention

Object.keys(areaDes).forEach(e => {
  areaDes[e] = c`\n{cyan ${areaDes[e]}}`
})

for (const i in convention) {
  Object.freeze(i)
}

module.exports = convention
