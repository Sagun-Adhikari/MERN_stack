import React from 'react'
import { NavLink, Route, Routes } from "react-router-dom";
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import "./App.css";
const App = () => {
  return (
    <>
      <nav className='navbar'>
        <h2>My Blog</h2>
        <div className="nav-links">
          <NavLink to="/">Show Blogs</NavLink>
          <NavLink to="/add-blog">Add Blog</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ShowBlogs />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </>
  )
}

export default App