import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-accent text-cream mt-auto">
      <div className="container-main section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl font-semibold mb-2">Aurora</h3>
            <p className="text-rose-light/80 text-sm leading-relaxed mb-6">Discover the art of radiant beauty. Premium cosmetics crafted with care for your skin's natural glow.</p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-dark transition-colors duration-300">
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-rose">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Shop All" },
                { to: "/reviews", label: "Reviews" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-rose-light/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-rose">Categories</h4>
            <ul className="space-y-3">
              {["Cream", "Face Wash", "Soap", "Fragrance"].map((cat) => (
                <li key={cat}>
                  <Link to="/products" className="text-rose-light/70 hover:text-white transition-colors text-sm capitalize">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-rose">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-rose-light/70">
                <HiLocationMarker className="text-rose mt-0.5 shrink-0" />
                123 Beauty Lane, Colombo, Sri Lanka
              </li>
              <li className="flex items-center gap-3 text-sm text-rose-light/70">
                <HiPhone className="text-rose shrink-0" />
                +94 11 234 5678
              </li>
              <li className="flex items-center gap-3 text-sm text-rose-light/70">
                <HiMail className="text-rose shrink-0" />
                hello@aurorabeauty.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-rose-light/50 text-xs">&copy; {new Date().getFullYear()} Aurora Beauty. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-rose-light/50">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
