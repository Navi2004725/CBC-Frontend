import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard";
import Loader from "../../components/loader";

const categories = [
  { name: "Cream", emoji: "✨", desc: "Luxurious moisturizers" },
  { name: "Face Wash", emoji: "🫧", desc: "Gentle daily cleansers" },
  { name: "Soap", emoji: "🌸", desc: "Artisan body bars" },
  { name: "Fragrance", emoji: "🌹", desc: "Signature scents" },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-light via-cream to-primary min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container-main section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 text-rose-dark text-xs uppercase tracking-[0.25em] font-medium mb-6">
                New Collection 2026
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-accent leading-[1.1] mb-6">
                Embrace Your
                <span className="block text-gradient italic">Natural Radiance</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-md mb-10">
                Indulge in premium skincare and cosmetics designed to enhance your natural beauty. Clean ingredients, luxurious textures.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Collection
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-[420px] h-[520px]">
                <div className="absolute inset-0 bg-gradient-to-t from-rose/30 to-transparent rounded-[2rem] rotate-3" />
                <img
                  src="/Gemini_Generated_Image_yxvhf8yxvhf8yxvh.jpg"
                  alt="Lumière Beauty"
                  className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl shadow-rose/20"
                />
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl">
                  <p className="font-display text-2xl font-semibold text-accent">100%</p>
                  <p className="text-xs uppercase tracking-wider text-muted">Natural Ingredients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-rose-dark font-medium">Browse By</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-accent mt-3">Shop Categories</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="group relative overflow-hidden rounded-2xl bg-rose-light/50 p-8 text-center card-hover">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                <h3 className="font-display text-xl font-semibold text-accent mb-1">{cat.name}</h3>
                <p className="text-xs text-muted">{cat.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-primary">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-rose-dark font-medium">Curated For You</span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-accent mt-3">Featured Products</h2>
            </div>
            <Link to="/products" className="btn-ghost text-rose-dark uppercase tracking-wider text-sm">
              View All →
            </Link>
          </div>

          {loading ? (
            <Loader inline />
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featured.map((product, i) => (
                <div key={product.productId} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg">Our collection is coming soon. Check back shortly!</p>
              <Link to="/products" className="btn-primary mt-6 inline-flex">Browse Shop</Link>
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="relative overflow-hidden">
        <div className="bg-accent py-20 lg:py-28">
          <div className="container-main text-center relative z-10">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-cream mb-4">
              Free Shipping on Orders Over Rs. 5,000
            </h2>
            <p className="text-rose-light/70 max-w-lg mx-auto mb-8">
              Treat yourself to our premium collection and enjoy complimentary delivery to your doorstep.
            </p>
            <Link to="/products" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-rose text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5">
              Start Shopping
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Trust badges */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: "Cruelty Free", desc: "Never tested on animals" },
              { title: "Clean Beauty", desc: "No harmful chemicals" },
              { title: "Satisfaction Guaranteed", desc: "30-day return policy" },
            ].map((badge) => (
              <div key={badge.title} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-light flex items-center justify-center">
                  <span className="text-rose-dark text-lg">♡</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-accent mb-2">{badge.title}</h3>
                <p className="text-sm text-muted">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
