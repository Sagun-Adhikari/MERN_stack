import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Library Management</h2>

      <div>
        <Link to="/">Books</Link>
        <Link to="/members">Members</Link>
        <Link to="/borrow">Borrow Management</Link>
      </div>
    </nav>
  );
}

export default Navbar;