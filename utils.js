const debug = require('debug')('utils.js')

debug('debugging from utils')

const name = 'Salon'

const add = (a, b) => {
	return a + b
}
module.exports = { name, add }

// !Why this console log is getting printed in console
console.log('printing from utils.js')
