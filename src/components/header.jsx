import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[100px] bg-blue-500 flex justify-center items-center">
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
    </header>
  );
}
