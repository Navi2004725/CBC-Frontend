import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import HomePage from "./homePage";
import ProductPage from "./productPage";
import ProductOverview from "./overview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import ReviewsPage from "./reviewsPage";
import ContactPage from "./contactPage";

export default function ClientPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/overview/:productId" element={<ProductOverview />} />
          <Route
            path="/*"
            element={
              <div className="container-main section-padding text-center">
                <h1 className="font-display text-4xl text-accent mb-4">Page Not Found</h1>
                <p className="text-muted">The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
