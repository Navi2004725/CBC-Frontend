import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/addProduct";
import OrdersAdminPage from "./admin/orders";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import axios from "axios";

export default function AdminPage() {
  const navigate = useNavigate();
  const [adminValidated, setAdminValidated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not log in");
      window.location.href = "/login";
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.role === "admin") {
            setAdminValidated(true);
          } else {
            navigate("/login"); // Redirect to user dashboard or home page
          }
        })
        .catch((error) => {
          console.error("Backend Google login failed:", error);
          toast.error("Google login failed. Please try again.");
          navigate("/login");
        });
    }
  }, []);
  return (
    <div className="w-full h-screen bg-white flex">
      {adminValidated ? (
        <>
          <div className="w-[300px] h-full bg-white flex flex-col items-center justify-start">
            <span className="text-3xl font-bold my-5">Admin Pannel</span>
            <Link to="/admin/products" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
              <FaBoxArchive></FaBoxArchive>Products
            </Link>
            <Link to="/admin/orders" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
              <GiShoppingBag></GiShoppingBag>Orders
            </Link>
            <Link to="/admin/users" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
              <FaUser></FaUser>
              Users
            </Link>
            <Link to="/admin/settings" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
              <IoSettings></IoSettings>
              Settings
            </Link>
            {/* Blue area */}
            <div className="w-[calc(100%-300px)] h-full">
              <Routes>
                <Route path="/" element={<h2>Dashboard</h2>} />
                <Route path="/products" element={<ProductsAdminPage />} />
                <Route path="/newProduct" element={<AddProductAdminPage />} />
                <Route path="/updateProduct" element={<UpdateProductPage />} />
                <Route path="/orders" element={<OrdersAdminPage />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
