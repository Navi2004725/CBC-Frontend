import { BiCart } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart } from "../utils/cart";

const LOGO = "/Gemini_Generated_Image_yxvhf8yxvhf8yxvh.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    const interval = setInterval(updateCart, 500);
    return () => {
      window.removeEventListener("storage", updateCart);
      clearInterval(interval);
    };
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-sm shadow-rose/10 py-2" : "bg-cream/90 backdrop-blur-md py-3"}`}>
        <div className="container-main flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-accent hover:text-rose-dark transition-colors" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <GiHamburgerMenu className="text-2xl" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={LOGO}
              alt="Aurora Beauty"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-rose/30 group-hover:ring-rose transition-all duration-300"
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl lg:text-2xl font-semibold text-accent tracking-wide">Aurora</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-rose-dark -mt-1">Beauty</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:bg-rose-dark after:transition-all after:duration-300 ${
                  location.pathname === link.to ? "text-rose-dark after:w-full" : "text-secondary hover:text-rose-dark after:w-0 hover:after:w-full"
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 group" aria-label="Shopping cart">
            <BiCart className="text-2xl lg:text-3xl text-accent group-hover:text-rose-dark transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-up">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-accent/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[min(320px,85vw)] bg-cream shadow-2xl animate-fade-up flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-blush">
              <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <img src={LOGO} alt="Aurora Beauty" className="w-10 h-10 rounded-full object-cover" />
                <span className="font-display text-xl font-semibold text-accent">Aurora</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-accent hover:text-rose-dark" aria-label="Close menu">
                <IoClose className="text-2xl" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`py-4 px-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                    location.pathname === link.to ? "bg-rose-light text-accent" : "text-secondary hover:bg-rose-light/50"
                  }`}>
                  {link.label}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="py-4 px-4 rounded-xl text-lg font-medium text-secondary hover:bg-rose-light/50 flex items-center gap-3 mt-4 border-t border-blush pt-6">
                <BiCart className="text-xl" />
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
