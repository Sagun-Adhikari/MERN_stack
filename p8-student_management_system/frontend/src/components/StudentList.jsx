
function StudentList(props) {
  return (
    <div className="student-list">
      <h2>Student Records</h2>

      {props.students.length === 0 ? (
        <p>No students found. Add your first student.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {props.students.map(function (student) {
                return (
                  <tr key={student._id}>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.semester}</td>
                    <td>
                      <button
                        onClick={function () {
                          props.onEdit(student);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={function () {
                          props.onDelete(student._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
