import { Routes, Route, Link } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-white flex">
      <div className="w-[300px] h-full bg-white flex flex-col items-center justify-start">
        <span className="text-3xl font-bold my-5">Admin Pannel</span>
        <Link to="/admin/products" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
          <FaBoxArchive></FaBoxArchive>Products
        </Link>
        <Link to="admin/orders" className="flex flex-row items-center w-full h-[60px] border gap-[25px] p-[20px]">
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
      </div>
      {/* Blue area */}
      <div className="w-[calc(00%-300px)] h-full">
        <Routes>
          <Route path="/" element={<h>Dashboard</h>} />
          <Route path="/products" element={<ProductsAdminPage />} />
          <Route path="/newProduct" element={<AddProductAdminPage />} />
          <Route path="/orders" element={<h>Orders</h>} />
        </Routes>
      </div>
    </div>
  );
}
