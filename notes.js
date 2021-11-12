const fs = require('fs')
const debug = require('debug')('notes.js')
const getNotes = () => {
	return 'My notes...'
}

const addNote = (title, body) => {
	const notes = loadNotes()

	// find is more efficient than filter in this case
	// filter goes through each and every object
	// find returns value once the condition is met and can save time
	// if the matching record is earlier in array
	// worst case: if the item is last in array, then filter and find is same
	// const duplicateNotes = notes.filter(
	// 	(note) => note.title.toLowerCase() === title.toLowerCase()
	// )
	const duplicateNote = notes.find(
		(note) => note.title.toLowerCase() === title.toLowerCase()
	)
	if (duplicateNote) {
		debug('Duplicate Data')
		return
	} else {
		notes.push({ title, body })
		saveNotes(notes)
		debug(notes)
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const matchedNote = notes.find((note) => note.title === title)

	if (matchedNote) {
		const updatedNotes = notes.filter((note) => note.title !== title)
		return saveNotes(updatedNotes)
	} else return debug('No matching item with the given title found')
}

const listNotes = () => {
	debug('Your notes')
	const notes = loadNotes()
	notes.forEach((note) => {
		debug(note.title)
	})
}

const readNote = (title) => {
	const notes = loadNotes()
	const matchedData = notes.find((note) => note.title === title)
	if (matchedData) {
		debug('The item is found')
		debug('Title: ' + matchedData.title)
		debug('Body: ' + matchedData.body)
		return
	} else {
		debug('No item found with provided title')
	}
}
const saveNotes = (notes) => {
	const data = JSON.stringify(notes)
	fs.writeFileSync('notes.json', data)
}
const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const parsedData = JSON.parse(dataBuffer)
		return parsedData
	} catch (error) {
		debug(error)
		return []
	}
}
module.exports = {
	getNotes,
	addNote,
	removeNote,
	listNotes,
	readNote,
}

console.log('Notes.js')
