
import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowBlogs = () => {
  const [blogs, setblogs] = useState([]);

  async function fetchblogs() {
    const response = await axios.get(
      "http://localhost:5000/api/blogs"
    );

    console.log(response.data);
    setblogs(response.data.blogs);
  }

  async function deleteNote(id) {
    await axios.delete(
      "http://localhost:5000/api/blogs/" + id
    );

    fetchblogs();
  }

  useEffect(function () {
    fetchblogs();
  }, []);

  return (
    <>
      <h1>Blogs</h1>

      {blogs.map(function (blog) {
        return (
          <div className="blog" key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <button
              onClick={function () {
                deleteNote(blog._id);
              }}
            >
              Delete blog
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ShowBlogs;
