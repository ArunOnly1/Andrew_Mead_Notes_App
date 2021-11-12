const debug = require('debug')('index.js')
const yargs = require('yargs')
const fs = require('fs')
const utils = require('./utils')
const notes = require('./notes')
// debug(utils.name)
// debug(utils.add(2, 99))
// debug(getNotes())
// debug(process.argv[2])
// const command = process.argv[2]

// if (command === 'add') {
// 	debug('Adding note')
// } else if (command === 'remove') {
// 	debug('Removing note!')
// }

// debug(process.argv)

// Customize yargs
yargs.version('1.1.0')

// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Body of the note',
			demandOption: true,
			type: 'string',
		},
	},
	handler: (argv) => {
		const { title, body } = argv
		notes.addNote(title, body)
	},
})

// Create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: (argv) => {
		const { title } = argv
		notes.removeNote(title)
	},
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read existing notes',
	handler: (argv) => {
		notes.readNote(argv.title)
	},
})
// Create list command
yargs.command({
	command: 'list',
	describe: 'To list notes',
	handler: () => {
		notes.listNotes()
	},
})

yargs.parse()
// debug(yargs.argv)
