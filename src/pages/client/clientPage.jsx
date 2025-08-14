import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./overview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";

export default function ClientPage() {
  return (
    <div className="w-full h-screen max-h-screen">
      <Header />
      <div className="w-full h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<h1 className="text-2xl text-center mt-10">Welcome to the Client Page</h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<h1 className="text-2xl text-center mt-10">Reviews Page</h1>} />
          <Route path="/contact" element={<h1 className="text-2xl text-center mt-10">Contact Us Page</h1>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/overview/:productId" element={<ProductOverview />} />
          <Route path="/*" element={<h1 className="text-2xl text-center mt-10">Page not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
