import { useState } from "react";
import { AddtoCart, getCart, getCartTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container-main section-padding flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 rounded-full bg-rose-light flex items-center justify-center mb-6">
          <HiShoppingBag className="text-4xl text-rose-dark" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-accent mb-3">Your cart is empty</h2>
        <p className="text-muted mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-main section-padding">
      <h1 className="font-display text-4xl font-semibold text-accent mb-2">Shopping Cart</h1>
      <p className="text-muted mb-10">{cart.length} item{cart.length !== 1 ? "s" : ""} in your bag</p>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-blush/50 shadow-sm">
              <img src={item.images} alt={item.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-accent truncate">{item.name}</h3>
                <p className="text-sm text-muted mt-1">
                  Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} each
                </p>
              </div>

              <div className="flex items-center gap-3 bg-rose-light/50 rounded-full px-2 py-1">
                <button
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-200 shadow-sm"
                  onClick={() => {
                    AddtoCart(item, -1);
                    setCart(getCart());
                  }}>
                  −
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-200 shadow-sm"
                  onClick={() => {
                    AddtoCart(item, 1);
                    setCart(getCart());
                  }}>
                  +
                </button>
              </div>

              <div className="flex items-center gap-4 sm:ml-auto">
                <span className="font-semibold text-accent whitespace-nowrap">
                  Rs. {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <button
                  className="p-2 text-muted hover:text-red-500 transition-colors"
                  onClick={() => {
                    AddtoCart(item, item.quantity * -1);
                    setCart(getCart());
                  }}
                  aria-label="Remove item">
                  <BiTrash className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-blush/50 p-6 lg:sticky lg:top-28 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-accent mb-6">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>Rs. {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-green-700">Free</span>
              </div>
            </div>

            <div className="border-t border-blush mt-4 pt-4 flex justify-between items-baseline">
              <span className="font-medium text-accent">Total</span>
              <span className="text-2xl font-semibold text-accent">
                Rs. {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              className="btn-primary w-full mt-6"
              onClick={() => {
                navigate("/checkout", { state: { items: cart } });
              }}>
              Proceed to Checkout
            </button>

            <Link to="/products" className="block text-center text-sm text-rose-dark hover:text-accent mt-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
