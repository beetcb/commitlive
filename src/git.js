const spawnSync = require('child_process').spawnSync
const c = require('chalk')
const excute = (command, args, mes) => {
  args = args.split(' ')
  if (mes) args.push(mes)
  const spawn = spawnSync(command, args, {
    encoding: 'utf8',
  })
  return spawn.stdout || spawn.stderr
}

const gh = args => excute('gh', args)
const git = (args, mes) => excute('git', args, mes)

exports.gitCommit = (flags = '-m', mes) => {
  const commit = `commit ${flags}`
  return git(commit, mes)
}

const ghIssues = num => {
  const list = 'issue list --limit 10'
  const view = `issue view ${num}`
  return num ? praseString('list', gh(view)) : praseString('view', gh(list))
}

const ghPR = num => {
  const list = 'pr list --limit 10'
  const view = `pr view ${num}`
  return num ? praseString('list', gh(view)) : praseString('view', gh(list))
}

const fetching = num => {
  const fetch = ghIssues(num) || ghPR(num)
  if (!fetch) {
    return c`{red No Open Issues & PR found!}`
  }
  return fetch
}

exports.findIssuePR = repll => {
  const input = repll.input
  const match = input.match(/#(\d+)$/)
  const num = match ? match[1] : null
  if (num) {
    repll.refresh(c`\n{yellow Fetching {green #${num}} Detailed Information}`)
    return fetching(num)
  }
  if (/#$/.test(input)) {
    repll.refresh(c`\n{yellow Fetching Your Issues & PR}`)
    return fetching()
  }

  if (/#\d+\s$/.test(input)) return true
}

function praseString(type, str) {
  if (!str) return str
  if (type === 'view') {
    const parts = str.split('\t')
    if (parts.length > 1) return c`{green #${parts[0]}}: ${parts[2]}`
    return str
  }
  if (type === 'list') {
    const lines = str.split('\n')
    if (lines.length > 1)
      return lines.reduce(
        (out, e) =>
          out + c`{green ${e.split('\t')[0]}} ${e.split('\t')[1] || ''}\n`,
        ''
      )
    return str
  }
}
