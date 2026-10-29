import React from 'react'
import { useState } from "react";
import axios from "axios";

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:5000/api/notes", {
                title: title,
                content: content
            });
            alert("Note created successfully");

            setTitle("");
            setContent("");
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
        <h2>create notes</h2>
        <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={function (event) {
                    setTitle(event.target.value);
                }}
                required
            />
            
        <textarea
            placeholder="Enter note content"
            value={content}
            onChange={function (event) {
                setContent(event.target.value);
            }}
            required
        />
        <button type="submit">Add Note</button>

    </form>
    </>
  )
}

export default NoteForm