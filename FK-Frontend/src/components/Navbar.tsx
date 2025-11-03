import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        NexKart
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="font-medium">{user.fullname}</span>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            {user.role === "seller" && <Link to="/seller">Seller</Link>}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-1 rounded-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
