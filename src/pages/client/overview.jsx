import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { useState } from "react";
import { AddtoCart, getCart } from "../../utils/cart";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";

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

  const onSale = product && product.labelledPrice > product.price;

  return (
    <div className="w-full min-h-full">
      {status === "loading" && <Loader />}
      {status === "success" && product && (
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Images */}
            <div className="flex justify-center lg:sticky lg:top-28">
              <ImageSlider images={product.images || []} />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {product.category && (
                <span className="inline-block w-fit px-4 py-1 rounded-full bg-rose-light text-rose-dark text-xs uppercase tracking-[0.2em] font-medium mb-4 capitalize">
                  {product.category}
                </span>
              )}

              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-accent leading-tight">
                {product.name}
              </h1>

              {product.altNames && product.altNames.length > 0 && (
                <p className="text-muted mt-2 text-sm">{product.altNames.join(" · ")}</p>
              )}

              <div className="mt-6 flex items-baseline gap-3">
                {onSale ? (
                  <>
                    <span className="text-3xl font-semibold text-accent">
                      Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-lg text-muted line-through">
                      Rs. {product.labelledPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="px-2 py-0.5 bg-rose-dark text-white text-xs font-semibold rounded-full">
                      Save Rs. {(product.labelledPrice - product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold text-accent">
                    Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-rose-light/40 border border-blush">
                <p className="text-secondary leading-relaxed">{product.description}</p>
              </div>

              {product.stock !== undefined && (
                <p className={`mt-4 text-sm font-medium ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  className="btn-primary flex-1"
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
                  className="btn-secondary flex-1"
                  onClick={() => {
                    AddtoCart(product);
                    toast.success("Added to cart");
                    console.log(getCart());
                  }}>
                  <BiCart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="font-display text-2xl text-accent mb-4">Product not found</p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            Back to Shop
          </button>
        </div>
      )}
    </div>
  );
}
