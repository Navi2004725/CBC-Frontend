import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response) => {
        setProducts(response.data);
        setLoading(false);
        console.log(response.data);
      });
    }
  }, [loading]);

  return (
    <div className="w-full flex flex-wrap gap-[40px] justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
