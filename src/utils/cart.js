export function getCart() {
  let cartString = localStorage.getItem("cart");

  if (cartString === null) {
    cartString = "[]";
    localStorage.setItem("cart", cartString);
  }
  const cart = JSON.parse(cartString);
  return cart;
}

export function AddtoCart(product, qty = 1) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => {
    return item.productId === product.productId;
  });

  if (existingProductIndex == -1) {
    cart.push({
      productId: product.productId,
      quantity: qty,
      price: product.price,
      name: product.name,
      altNames: product.altNames,
      images: product.images[0],
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const newQty = cart[existingProductIndex].quantity + qty;
    if (newQty <= 0) {
      const newCart = cart.filter((item, index) => {
        return index !== existingProductIndex;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      cart[existingProductIndex].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

export function getCartTotal() {
  const cart = getCart();
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}
