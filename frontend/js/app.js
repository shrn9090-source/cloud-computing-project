const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your deployed backend URL

// DOM elements
const notesContainer = document.getElementById('notesContainer');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');

let editingNoteId = null;

// Event listeners
addNoteBtn.addEventListener('click', () => openModal());
closeBtn.addEventListener('click', () => closeModal());
noteForm.addEventListener('submit', handleNoteSubmit);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === noteModal) {
        closeModal();
    }
});

// Load notes on page load
document.addEventListener('DOMContentLoaded', loadNotes);

// Functions
async function loadNotes() {
    try {
        const response = await fetch(`${API_BASE_URL}/notes`);
        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        showError('Failed to load notes');
    }
}

function displayNotes(notes) {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesContainer.appendChild(noteCard);
    });
}

function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
        <div class="note-title">${note.title}</div>
        <div class="note-content">${note.content}</div>
        <div class="note-date">Created: ${new Date(note.createdAt).toLocaleDateString()}</div>
        <div class="note-actions">
            <button class="btn btn-secondary" onclick="editNote('${note._id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteNote('${note._id}')">Delete</button>
        </div>
    `;
    return card;
}

function openModal(note = null) {
    if (note) {
        modalTitle.textContent = 'Edit Note';
        noteTitle.value = note.title;
        noteContent.value = note.content;
        editingNoteId = note._id;
    } else {
        modalTitle.textContent = 'Add New Note';
        noteForm.reset();
        editingNoteId = null;
    }
    noteModal.style.display = 'block';
}

function closeModal() {
    noteModal.style.display = 'none';
    noteForm.reset();
    editingNoteId = null;
}

async function handleNoteSubmit(e) {
    e.preventDefault();

    const noteData = {
        title: noteTitle.value.trim(),
        content: noteContent.value.trim()
    };

    try {
        if (editingNoteId) {
            await updateNote(editingNoteId, noteData);
        } else {
            await createNote(noteData);
        }
        closeModal();
        loadNotes();
    } catch (error) {
        console.error('Error saving note:', error);
        showError('Failed to save note');
    }
}

async function createNote(noteData) {
    const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
    });

    if (!response.ok) {
        throw new Error('Failed to create note');
    }
}

async function updateNote(id, noteData) {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
    });

    if (!response.ok) {
        throw new Error('Failed to update note');
    }
}

async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }

        loadNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
        showError('Failed to delete note');
    }
}

function editNote(id) {
    // Find the note in the current notes (this could be optimized)
    fetch(`${API_BASE_URL}/notes/${id}`)
        .then(response => response.json())
        .then(note => openModal(note))
        .catch(error => {
            console.error('Error fetching note:', error);
            showError('Failed to load note for editing');
        });
}

function showError(message) {
    // Simple error display - you can enhance this
    alert(message);
}