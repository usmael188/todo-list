document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesUl = document.getElementById('notes');

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToDOM(note));
    };

    const saveNote = (noteText) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const deleteNote = (noteText) => {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const addNoteToDOM = (noteText) => {
        const noteLi = document.createElement('li');
        noteLi.innerHTML = `
            <span class="note-text">${noteText}</span>
            <div class="note-buttons">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;
        notesUl.appendChild(noteLi);
    };

    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const textarea = noteForm.querySelector('textarea');
        const noteText = textarea.value.trim();

        if (noteText) {
            addNoteToDOM(noteText);
            saveNote(noteText);
            textarea.value = '';
        }
    });

    notesUl.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const noteLi = event.target.closest('li');
            const noteText = noteLi.querySelector('.note-text').textContent;
            deleteNote(noteText);
            noteLi.remove();
        } else if (event.target.classList.contains('edit-button')) {
            const noteLi = event.target.closest('li');
            const noteTextSpan = noteLi.querySelector('.note-text');
            const newText = prompt('Edit your note:', noteTextSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                deleteNote(noteTextSpan.textContent);
                noteTextSpan.textContent = newText.trim();
                saveNote(newText.trim());
            }
        }
    });

    loadNotes();
});
