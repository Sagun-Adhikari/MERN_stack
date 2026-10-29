import React from 'react'
import { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")

  function handleform(event){
    event.preventDefault();
    axios.post("http://localhost:5000/api/blogs",{
      title:title,
      content:content
    })
    alert("Note created successfully");
    setTitle("");
    setContent("");

  }
  return (
    <>
    <form action="" onSubmit={handleform}>
      <input type="text" placeholder='enter title of blog' value={title} onChange={function (event){settitle(event.target.value)}} />
      <input type="text" placeholder='enter content of blog' value={content} onChange={function (event){setcontent(event.target.value)}} />
      <input type="submit" value="submit blog" />
    
    </form>
    </>
  )
}

export default AddBlog