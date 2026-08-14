import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", {
        firstName,
        lastName,
        email,
        password,
      });

      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-accent/30" />
      <div className="relative w-full max-w-lg glass rounded-3xl shadow-2xl p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-semibold text-accent">Create Account</h1>
          <p className="text-muted text-sm mt-2">Join Lumière Beauty and enjoy a tailored shopping experience</p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Confirm password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button onClick={handleRegister} className="btn-primary w-full">
            Create Account
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-muted">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-rose-dark font-medium hover:text-accent transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
