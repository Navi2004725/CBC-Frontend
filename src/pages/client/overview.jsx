import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { useState } from "react";
import { AddtoCart, getCart } from "../../utils/cart";
import { useNavigate } from "react-router-dom";

export default function productOverview() {
  const navigate = useNavigate();
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
    <div className="w-full h-full">
      {status === "loading" && <Loader />}
      {status === "success" && product && (
        <div className="w-full h-full flex flex-row">
          <div className="w-[49%] h-full flex justify-center items-center">
            <ImageSlider images={product.images || []} />
          </div>
          <div className="w-[49%] h-full flex flex-col items-center pt-[50px]">
            <h2 className="text-2xl font-bold">
              {product.name}
              <span className="font-light">{product.altNames.join(" | ")}</span>
            </h2>
            <p className="text-lg mt-[20px]">{product.description}</p>
            <div className="w-full flex flex-col items-center mt-[20px]">
              {product.labelledPrice > product.price ? (
                <div>
                  <span className="text-lg font-semibold line-through mr-[20px]">{product.labelledPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  <span className="text-xl">{product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              ) : (
                <div>
                  <span className="text-lg font-bold">{product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[10px]">
              <button
                className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900 hover:w-[250px]"
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          quantity: 1,
                          name: product.name,
                          image: product.images[0],
                          price: product.price,
                        },
                      ],
                    },
                  });
                }}>
                Buy Now
              </button>
              <button
                className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600  hover:bg-white hover:text-blue-600 hover:w-[250px]"
                onClick={() => {
                  AddtoCart(product);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {status === "error" && <div>Error loading </div>}
    </div>
  );
}
