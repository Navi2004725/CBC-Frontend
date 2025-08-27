import { BiCart } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiHome } from "react-icons/hi";
import { FaBoxArchive } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { FcContacts } from "react-icons/fc";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  return (
    <header className="h-[100px] bg-accent flex justify-center items-center relative">
      {isOpen && (
        <div className="fixed z-[100] w-[100vw] top-0 right-0 h-[100vh] bg-[#00000050]">
          <div className="h-full w-[350px] bg-white flex flex-col">
            <div className="w-full bg-accent h-[80px] flex pl-[45px] flex-row items-center gap-[20px]">
              <GiHamburgerMenu
                className="text-white text-4xl  md:hidden cursor-pointer"
                onClick={() => {
                  setIsOpen(close);
                }}
              />
              <img
                src="/logo.jpg"
                className="w-[150px] h-[80px] object-cover cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
              <div className="w-full h-full mt-30 items-start flex flex-col p-[45px]">
                <button
                  className="text-accent text-2xl flex flex-row items-center"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/");
                  }}>
                  <HiHome className="text-2xl mr-2 text-accent"></HiHome> Home
                </button>
                <button
                  className="text-accent text-2xl flex flex-row items-center"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/products");
                  }}>
                  <FaBoxArchive className="text-2xl mr-2 text-accent"></FaBoxArchive> Products
                </button>
                <button
                  className="text-accent text-2xl flex flex-row items-center"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/reviews");
                  }}>
                  <MdReviews className="text-2xl mr-2 text-accent"></MdReviews> reviews
                </button>
                <button
                  className="text-accent text-2xl flex flex-row items-center"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/contact");
                  }}>
                  <FcContacts className="text-2xl mr-2 text-accent"></FcContacts> contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <img
        src="/logo.jpg"
        className="w-[80px] h-[80px] object-cover absolute md:left-[40px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <GiHamburgerMenu
        className="text-white text-4xl absolute left-[40px] md:hidden cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <div className="w-full hidden md:flex justify- items-center">
        <Link to="/" className="text-white text-xl font-bold ml-10">
          Home
        </Link>
        <Link to="/products" className="text-white text-xl font-bold ml-10">
          products
        </Link>
        <Link to="/reviews" className="text-white text-xl font-bold ml-10">
          Reviews
        </Link>
        <Link to="/contact" className="text-white text-xl font-bold ml-10">
          Contact us
        </Link>
        <Link to="/cart" className="absolute right-[250px]">
          <BiCart className="text-white text-3xl ml-4"></BiCart>
        </Link>
        {token != null && (
          <button
            className="absolute right-[80px] text-white text-xl ml-4"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}>
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}
