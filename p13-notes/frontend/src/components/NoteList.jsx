import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    async function fetchNotes() {
        const response = await axios.get(
            "http://localhost:5000/api/notes"
        );

        setNotes(response.data);
    }

    async function deleteNote(id) {
        await axios.delete(
            "http://localhost:5000/api/notes/" + id
        );

        fetchNotes();
    }

    useEffect(function () {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>All Notes</h2>

            {notes.map(function (note) {
                return (
                    <div className="note" key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>

                        <button
                            onClick={function () {
                                deleteNote(note._id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default NoteList;