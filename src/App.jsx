import "./App.css";
import ProductCard from "./components/productCard";
import SuperProduct from "./components/superproducts";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import ClientPage from "./pages/client/clientPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/client/forget";
const clientId = "377373171669-rl4l17mpumagb64q6lvvsjavik83nftp.apps.googleusercontent.com";
const Clientsecret = "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";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full min-h-screen">
          <div className="w-full min-h-screen bg-primary text-secondary">
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#2d1b3d",
                  color: "#faf7f2",
                  borderRadius: "12px",
                  fontFamily: "Outfit, sans-serif",
                },
              }}
            />
            <Routes path="/">
              <Route path="/login" element={<LoginPage />} />
              <Route path="/test" element={<TestPage />}></Route>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/*" element={<ClientPage />} />
              <Route path="/forget" element={<ForgetPasswordPage />} />
            </Routes>
          </div>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
