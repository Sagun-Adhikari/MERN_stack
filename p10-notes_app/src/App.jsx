import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote(e) {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  }

  return (
    <div className="app">
      <h1>My Notes</h1>
      <p className="subtitle">Write down your thoughts.</p>

      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={function (e) {
            setTitle(e.target.value);
          }}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={function (e) {
            setContent(e.target.value);
          }}
          rows="4"
        />

        <button type="submit">Add Note</button>
      </form>

      <h2 className="notes-heading">Your Notes ({notes.length})</h2>

      <div className="notes-container">
        {notes.map(function (note) {
          return (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          );
        })}
      </div>

      {notes.length === 0 && (
        <p className="empty-message">No notes yet. Add your first note!</p>
      )}
    </div>
  );
}

export default App;