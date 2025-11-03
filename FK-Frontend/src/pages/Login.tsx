import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axiosInstance.post("/auth/login", { email, password });
    login(res.data.token, res.data.user);
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Login
        </h2>
        <input
          className="border p-2 w-full rounded-md"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded-md"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
