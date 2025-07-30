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

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <div className="w-[calc(100vw-35px)] h-[calc(100vh-15px)] bg-white">
          <Toaster position="top-center" />
          <Routes path="/">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<ClientPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
