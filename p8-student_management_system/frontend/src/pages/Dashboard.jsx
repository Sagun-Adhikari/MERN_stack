
import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function Dashboard(props) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  async function request(url, options) {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (response.status === 401) {
      props.onLogout();
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  }

  async function loadStudents() {
    try {
      setError("");
      const data = await request(`${apiUrl}/students`, {});
      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    loadStudents();
  }, []);

  async function handleSubmit(form) {
    try {
      setError("");

      if (selectedStudent) {
        await request(`${apiUrl}/students/${selectedStudent._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await request(`${apiUrl}/students`, {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      setSelectedStudent(null);
      await loadStudents();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      setError("");
      await request(`${apiUrl}/students/${id}`, {
        method: "DELETE",
      });

      if (selectedStudent?._id === id) {
        setSelectedStudent(null);
      }

      await loadStudents();
    } catch (error) {
      setError(error.message);
    }
  }

  const filteredStudents = students.filter(function (student) {
    const query = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.studentId.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Student Management System</h1>
          <p>Manage your student records</p>
        </div>

        <button onClick={props.onLogout}>Logout</button>
      </header>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>
      </div>

      <StudentForm
        student={selectedStudent}
        onSubmit={handleSubmit}
        onCancel={function () {
          setSelectedStudent(null);
        }}
      />

      <section className="records-section">
        <input
          className="search-input"
          placeholder="Search by name, student ID, or email..."
          value={search}
          onChange={function (event) {
            setSearch(event.target.value);
          }}
        />

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading students...</p>
        ) : (
          <StudentList
            students={filteredStudents}
            onEdit={setSelectedStudent}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}

export default Dashboard;
