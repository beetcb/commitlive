const { typeMap } = require('./convention')

let scopePassed = false

exports.checkType = repll =>
  Object.keys(typeMap).some(e => repll.input.startsWith(e))

exports.checkScope = repll => {
  if (/\(\w+\)$/.test(repll.input)) {
    repll.write(': ')
    scopePassed = true
  }
  if (/\:$/.test(repll.input)) {
    repll.write(' ')
    scopePassed = true
  }
  return scopePassed
}

exports.checkDes = repll => /\s(.+)$/.test(repll.input)
