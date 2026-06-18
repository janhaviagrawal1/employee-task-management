import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <div>
      <Link to="/">Home</Link>

      {" | "}

      <Link to="/dashboard">
        Dashboard
      </Link>

      {" | "}

      <Link to="/tasks">
        Tasks
      </Link>

      {" | "}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;