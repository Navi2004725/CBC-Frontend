import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pageLoader = useNavigate();

  function handleLogin() {
    console.log("Email:", email);
    console.log("Password:", password);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);

        // Store the token in localStorage or state
        //const token = localStorage.getItem("token");

        toast.success("Login successful!");
        // You can redirect the user or store the token here
        if (response.data.role === "admin") {
          pageLoader("/admin");
        } else if (response.data.role === "user") {
          pageLoader("/"); // Redirect to user dashboard or home page
          // Redirect to user dashboard or home page
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  }

  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex items-center justify-center">
      <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[20px] text-white flex flex-col items-center justify-center">
        <span className="absolute top-[20px] text-3xl font-bold">Login</span>
        <div className="w-[350px] flex flex-col">
          <span className="text-lg font-bold mr-[300px] mt-1 mb-1">Email</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("Email changed");
            }}
            type="text"
            className="w-[350px] h-[50px] rounded-xl border border-white"
          />
        </div>
        <div className="w-[350px] flex flex-col">
          <span className="text-lg font-bold mr-[280px] mb-1">Password</span>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("Password changed");
            }}
            type="password"
            className="w-[350px] h-[50px] rounded-xl border border-white"
          />
        </div>
        <button onClick={handleLogin} className="w-[350px] h-[50px] bg-blue-600 text-black rounded-xl mt-5 font-bold top-[20px]">
          Login
        </button>
        <span className="text-lg font-bold mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Signup{" "}
          </Link>
          from here
        </span>
      </div>
    </div>
  );
}
