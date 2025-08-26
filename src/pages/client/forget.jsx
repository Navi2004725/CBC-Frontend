import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function sendOTP() {
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "users/send-otp", { email });
      setEmailSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Failed to send OTP. Please try again.");
    }
  }

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "users/reset-password", { email, otp, newPassword, confirmPassword });
      toast.success("Password reset successful! Please login with your new password.");
    } catch (err) {
      console.error("Error resetting password:", err);
      toast.error("Failed to reset password. Please try again.");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-secondary">
      {!emailSent ? (
        <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[250px] h-[40px] border border-white rounded-2xl"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className="w-[350px] h-[40px] bg-blue-500 text-white text-lg mt-5" onClick={sendOTP}>
            Send OTP
          </button>
        </div>
      ) : (
        <div className="bg-primary w-[500px] h-[600px] shadow-2xl flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Enter OTP and New Password</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-[250px] h-[40px] border border-white rounded-2xl"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <h1 className="text-2xl font-bold">Enter New Password</h1>
          <input
            type="password"
            placeholder="Enter New Password"
            className="w-[250px] h-[40px] border border-white rounded-2xl mt-5"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <h1 className="text-2xl font-bold">Confirm New Password</h1>
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-[250px] h-[40px] border border-white rounded-2xl mt-5"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button className="w-[350px] h-[40px] bg-blue-500 text-white text-lg mt-5" onClick={resetPassword}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
