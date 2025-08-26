import axios from "axios";
import { useEffect, useState } from "react";
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
    <div className="w-full h-full">
      <div className="w-full h-[100px] flex flex-row justify-center items-center gap-[20px]">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[300px] h-[40px] rounded-lg border-[2px] border-gray-300 p-[10px] text-black"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLoading(true);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-wrap gap-[40px] justify-center items-center">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
