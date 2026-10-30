
import { useState, useEffect } from "react";
import axios from "axios";

function Members() {
    const API = "http://localhost:5000/api/members";

    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [editId, setEditId] = useState(null);

    // GET ALL MEMBERS
    async function getMembers() {
        const response = await axios.get(API);
        setMembers(response.data);
    }

    useEffect(function () {
        getMembers();
    }, []);

    // HANDLE INPUT
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // CREATE OR UPDATE MEMBER
    async function handleSubmit(e) {
        e.preventDefault();

        if (editId) {
            await axios.put(`${API}/${editId}`, formData);
        } else {
            await axios.post(API, formData);
        }

        setFormData({
            name: "",
            email: "",
            phone: ""
        });

        setEditId(null);
        getMembers();
    }

    // EDIT MEMBER
    function editMember(member) {
        setFormData({
            name: member.name,
            email: member.email,
            phone: member.phone
        });

        setEditId(member._id);
    }

    // DELETE MEMBER
    async function deleteMember(id) {
        await axios.delete(`${API}/${id}`);
        getMembers();
    }

    return (
        <div className="container">

            <h2>Members Management</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Member Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId ? "Update Member" : "Add Member"}
                </button>

            </form>

            <h3>All Members</h3>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {members.map(function (member) {
                        return (
                            <tr key={member._id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone}</td>

                                <td>
                                    <button onClick={function () {
                                        editMember(member);
                                    }}>
                                        Edit
                                    </button>

                                    <button onClick={function () {
                                        deleteMember(member._id);
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

export default Members;
