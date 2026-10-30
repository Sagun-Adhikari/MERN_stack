
import { useState, useEffect } from "react";
import axios from "axios";

function Borrow() {
    const BOOK_API = "http://localhost:5000/api/books";
    const MEMBER_API = "http://localhost:5000/api/members";
    const BORROW_API = "http://localhost:5000/api/borrow";

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [records, setRecords] = useState([]);

    const [formData, setFormData] = useState({
        bookId: "",
        memberId: ""
    });

    // GET BOOKS, MEMBERS AND BORROW RECORDS
    async function getData() {
        const bookResponse = await axios.get(BOOK_API);
        const memberResponse = await axios.get(MEMBER_API);
        const recordResponse = await axios.get(BORROW_API);

        setBooks(bookResponse.data);
        setMembers(memberResponse.data);
        setRecords(recordResponse.data);
    }

    useEffect(function () {
        getData();
    }, []);

    // HANDLE INPUT
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // BORROW BOOK
    async function handleBorrow(e) {
        e.preventDefault();

        await axios.post(BORROW_API, formData);

        setFormData({
            bookId: "",
            memberId: ""
        });

        getData();
    }

    // RETURN BOOK
    async function handleReturn(id) {
        await axios.put(`${BORROW_API}/return/${id}`);

        getData();
    }

    // DELETE RECORD
    async function deleteRecord(id) {
        await axios.delete(`${BORROW_API}/${id}`);

        getData();
    }

    return (
        <div className="container">

            <h2>Borrow Management</h2>

            {/* BORROW FORM */}

            <form onSubmit={handleBorrow}>

                <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Book</option>

                    {books.map(function (book) {
                        return (
                            <option
                                key={book._id}
                                value={book._id}
                                disabled={book.availableCopies <= 0}
                            >
                                {book.title} - Available: {book.availableCopies}
                            </option>
                        );
                    })}
                </select>

                <select
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Member</option>

                    {members.map(function (member) {
                        return (
                            <option
                                key={member._id}
                                value={member._id}
                            >
                                {member.name}
                            </option>
                        );
                    })}
                </select>

                <button type="submit">
                    Borrow Book
                </button>

            </form>

            {/* BORROW RECORDS */}

            <h3>Borrow Records</h3>

            <table>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Member</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {records.map(function (record) {
                        return (
                            <tr key={record._id}>

                                <td>
                                    {record.book
                                        ? record.book.title
                                        : "Book deleted"}
                                </td>

                                <td>
                                    {record.member
                                        ? record.member.name
                                        : "Member deleted"}
                                </td>

                                <td>
                                    {new Date(record.borrowDate).toLocaleDateString()}
                                </td>

                                <td>
                                    {record.returnDate
                                        ? new Date(record.returnDate).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td>{record.status}</td>

                                <td>

                                    {record.status === "borrowed" && (
                                        <button onClick={function () {
                                            handleReturn(record._id);
                                        }}>
                                            Return
                                        </button>
                                    )}

                                    {record.status === "returned" && (
                                        <button onClick={function () {
                                            deleteRecord(record._id);
                                        }}>
                                            Delete
                                        </button>
                                    )}

                                </td>

                            </tr>
                        );
                    })}

                </tbody>
            </table>

        </div>
    );
}

export default Borrow;
