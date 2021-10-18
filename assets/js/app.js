// variables
const noteList = document.querySelector('#note-list')


// eventListener
eventListeners()

function eventListeners() {
// form submission
    document.querySelector('#form').addEventListener('submit', newNote)
// remove notes
    document.querySelector('#note-list').addEventListener('click', removeNote)

    // get data from local Storage on loaded
    document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}


// functions

// Adding new note to the list
function newNote(e) {
    e.preventDefault()

    // access to the value
    const note = document.querySelector('#note').value

    // create remove element
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'X'
    removeBtn.classList = 'remove-note'

    // create <li> tag
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    // adding remove btn to the li
    li.appendChild(removeBtn)

    // adding li to the note-list
    noteList.appendChild(li)

    addNoteToLocalStorage(note)

    // reset textarea after add per note
    this.reset()

    // success alert After per add note
    alert('یادداشت با موفقیت ذخیره شد')
}

// remove note from list
function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }

    // also remove the note from the local Storage
    removeNoteLocalStorage(e.target.parentElement.textContent)
}

// adding note to the local Storage
function addNoteToLocalStorage(note) {
    // get the note from local Storage
    const notes = getNotesFromLocalStorage()

    // add new note to the notes Array
    notes.push(note)

    // add new notes Array to the local Storage
    localStorage.setItem('notes', JSON.stringify(notes))
}

// get notes from  local Storage
function getNotesFromLocalStorage() {
    let notes;

    // get previous notes from local Storage
    let getFromLS = localStorage.getItem('notes')
    if (getFromLS === null) {
        // if not exist create empty Array
        notes = []
        // if  exist convert to the Array
    } else {
        notes = JSON.parse(getFromLS)
    }
    return notes
}

// get data from local Storage on load
function localStorageOnLoad() {
    const notes = getNotesFromLocalStorage()
    console.log(notes)

    // print each item of Array
    notes.forEach(function (note) {
        // create remove element
        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
        removeBtn.classList = 'remove-note'

        // create <li> tag
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))

        // adding remove btn to the li
        li.appendChild(removeBtn)

        // adding li to the note-list
        noteList.appendChild(li)

    })
}

// also Remove note from local Storage
function removeNoteLocalStorage(noteContent) {
    // delete X from the content
    const noteDelete = noteContent.substring(0, noteContent.length - 1)

    // get notes from local Storage
    const notesFromLS = getNotesFromLocalStorage()
    notesFromLS.forEach(function (note, index) {
        if (note === noteDelete) {
            notesFromLS.splice(index, 1)
        }
    });

    // set new array of notes to the local Storage
    localStorage.setItem('notes', JSON.stringify(notesFromLS))
}










