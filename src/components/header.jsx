import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[100px] bg-accent flex justify-center items-center relative">
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
      <Link to="/cart" className="absolute right-[80px]">
        <BiCart className="text-white text-3xl ml-4"></BiCart>
      </Link>
    </header>
  );
}
