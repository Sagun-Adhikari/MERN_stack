import { useState, useEffect } from "react";
import axios from "axios";

function Books() {

    const [books, setBooks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        totalCopies: ""
    });

    const [editId, setEditId] = useState(null);

    const API = "http://localhost:5000/api/books";


    // GET ALL BOOKS
    async function getBooks() {
        const response = await axios.get(API);
        setBooks(response.data);
    }


    useEffect(function () {
        getBooks();
    }, []);


    // HANDLE INPUT
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }


    // ADD OR UPDATE BOOK
    async function handleSubmit(e) {
        e.preventDefault();

        if (editId) {
            await axios.put(`${API}/${editId}`, {
                ...formData,
                totalCopies: Number(formData.totalCopies)
            });
        } else {
            await axios.post(API, {
                ...formData,
                totalCopies: Number(formData.totalCopies)
            });
        }

        setFormData({
            title: "",
            author: "",
            category: "",
            totalCopies: ""
        });

        setEditId(null);

        getBooks();
    }


    // DELETE BOOK
    async function deleteBook(id) {
        await axios.delete(`${API}/${id}`);
        getBooks();
    }


    // EDIT BOOK
    function editBook(book) {
        setFormData({
            title: book.title,
            author: book.author,
            category: book.category,
            totalCopies: book.totalCopies
        });

        setEditId(book._id);
    }


    return (
        <div className="container">

            <h2>Books Management</h2>

            {/* BOOK FORM */}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="totalCopies"
                    placeholder="Total Copies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <button type="submit">
                    {editId ? "Update Book" : "Add Book"}
                </button>

            </form>


            {/* BOOK LIST */}

            <h3>All Books</h3>

            <table>

                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Total Copies</th>
                        <th>Available Copies</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {books.map(function (book) {

                        return (
                            <tr key={book._id}>

                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.totalCopies}</td>
                                <td>{book.availableCopies}</td>

                                <td>
                                    <button onClick={function () {
                                        editBook(book);
                                    }}>
                                        Edit
                                    </button>

                                    <button onClick={function () {
                                        deleteBook(book._id);
                                    }}>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default Books;