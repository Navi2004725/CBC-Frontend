import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { useState } from "react";

export default function productOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/products/${params.productId}`)
        .then((response) => {
          setProduct(response.data);
          setStatus("success");
          console.log(response.data);
        })
        .catch(() => {
          toast.error("Failed to fetch data");
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      {status === "loading" && <Loader />}
      {status === "success" && product && (
        <div className="w-full h-full flex flex-row">
          <div className="w-[49px] h-full bg-blue-800">
            <ImageSlider images={product.images || []} />
          </div>
          <div className="w-[49px] bg-red-900 flex flex-col justify-center items-center">
            <h2 className="text-white text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-white">{product.description}</p>
            {/* Add more product details as needed */}
          </div>
        </div>
      )}
      {status === "error" && <div>Error loading </div>}
    </div>
  );
}
