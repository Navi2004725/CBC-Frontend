import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loading) {
      if (query == "") {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response) => {
          setProducts(response.data);
          setLoading(false);
          console.log(response.data);
        });
      } else {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search/" + query).then((response) => {
          setProducts(response.data);
          setLoading(false);
          console.log(response.data);
        });
      }
    }
  }, [loading]);

  return (
    <div className="w-full min-h-full">
      {/* Page header */}
      <div className="bg-gradient-to-r from-accent to-rose-dark/80 py-16 lg:py-20">
        <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-light/80 font-medium">Our Collection</span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-cream mt-3">Shop All Products</h1>
          <p className="text-rose-light/60 mt-4 max-w-md mx-auto">Discover premium cosmetics crafted for your radiant beauty</p>
        </div>
      </div>

      {/* Search */}
      <div className="container-main px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-muted text-xl" />
            <input
              type="text"
              placeholder="Search creams, fragrances, soaps..."
              className="input-field pl-14 shadow-lg shadow-rose/5"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLoading(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="container-main section-padding">
        {loading ? (
          <Loader inline />
        ) : products.length > 0 ? (
          <>
            <p className="text-sm text-muted mb-8">{products.length} product{products.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-accent mb-2">No products found</p>
            <p className="text-muted">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
