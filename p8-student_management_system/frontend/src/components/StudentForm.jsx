
import { useEffect, useState } from "react";

function StudentForm(props) {
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    semester: "",
  });

  useEffect(function () {
    if (props.student) {
      setForm({
        studentId: props.student.studentId || "",
        name: props.student.name || "",
        email: props.student.email || "",
        phone: props.student.phone || "",
        course: props.student.course || "",
        semester: props.student.semester || "",
      });
    } else {
      setForm({
        studentId: "",
        name: "",
        email: "",
        phone: "",
        course: "",
        semester: "",
      });
    }
  }, [props.student]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{props.student ? "Edit Student" : "Add Student"}</h2>

      <input
        name="studentId"
        placeholder="Student ID (e.g. STU001)"
        value={form.studentId}
        onChange={handleChange}
        required
      />

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        name="course"
        placeholder="Course (e.g. BCA)"
        value={form.course}
        onChange={handleChange}
        required
      />

      <input
        name="semester"
        placeholder="Semester"
        value={form.semester}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {props.student ? "Update Student" : "Add Student"}
      </button>

      {props.student && (
        <button
          type="button"
          className="cancel-button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default StudentForm;
