import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to access checkout");
      navigate("/login");
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setName(response.data.firstName + " " + response.data.lastName);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data");
        });
    }
  }, []);

  const [cart, setCart] = useState(location.state.items || []);
  if (location.state.items == null) {
    toast.error("Please select items to add to cart");
    navigate("/products");
  }

  function getCartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function handlePlaceOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to place an order");
      navigate("/login");
    }
    if (!name || !address || !phone) {
      toast.error("Please fill in all fields");
      return;
    }
    const order = {
      address: address,
      phone: phone,
      items: [],
    };
    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        qty: item.quantity,
      });
    });
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  }

  return (
    <div className="container-main section-padding">
      <h1 className="font-display text-4xl font-semibold text-accent mb-2">Checkout</h1>
      <p className="text-muted mb-10">Complete your order details below</p>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: items + form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cart items */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-blush/50">
                <img src={item.images || item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-accent truncate">{item.name}</h3>
                  <p className="text-sm text-muted">
                    Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-rose-light/50 rounded-full px-2 py-1">
                  <button
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors shadow-sm"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity -= 1;
                      if (newCart[index].quantity <= 0) {
                        newCart.splice(index, 1);
                      }
                      setCart(newCart);
                    }}>
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors shadow-sm"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
                    }}>
                    +
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-accent whitespace-nowrap">
                    Rs. {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  <button
                    className="p-2 text-muted hover:text-red-500 transition-colors"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart.splice(index, 1);
                      setCart(newCart);
                      toast.success("Item removed from cart");
                    }}>
                    <BiTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery form */}
          <div className="bg-white rounded-2xl border border-blush/50 p-6 lg:p-8">
            <h3 className="font-display text-xl font-semibold text-accent mb-6">Delivery Information</h3>
            <div className="grid sm:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Delivery Address</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-blush/50 p-6 lg:sticky lg:top-28 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-accent mb-6">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Items ({cart.length})</span>
                <span>Rs. {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-green-700">Free</span>
              </div>
            </div>

            <div className="border-t border-blush mt-4 pt-4 flex justify-between items-baseline mb-6">
              <span className="font-medium text-accent">Total</span>
              <span className="text-2xl font-semibold text-accent">
                Rs. {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button className="btn-primary w-full" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
