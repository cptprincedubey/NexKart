import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosInstance.post("/auth/register", form);
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 shadow-md rounded-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Register
        </h2>
        {["fullname", "email", "mobile", "password"].map((key) => (
          <input
            key={key}
            name={key}
            type={key === "password" ? "password" : "text"}
            placeholder={key}
            className="border p-2 w-full rounded-md"
            onChange={handleChange}
          />
        ))}
        <button className="w-full bg-indigo-600 text-white py-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
