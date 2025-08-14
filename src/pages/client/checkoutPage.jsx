import { useEffect, useState } from "react";
import { AddtoCart, getCart, getCartTotal } from "../../utils/cart";
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
  }),
    [];

  const [cart, setCart] = useState(location.state.items || []);
  if (location.state.items == null) {
    toast.error("pleaese select items to add to cart");
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
    <div className="w-full h-screen flex flex-col py-[40px] items-center">
      {cart.map((item, index) => {
        return (
          <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative">
            <img src={item.image} className="w-[100px] h-[100px] object-cover" />
            <div className="w-[320px] h-full bg-red-500 flex flex-col justify-center pl-[10px]">
              <span className=" font-bold">{item.name}</span>
              <span className="font-bold">{item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="w-[190px] h-full bg-green-400 flex flex-row justify-center items-center">
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity -= 1;
                  if (newCart[index].quantity <= 0) {
                    newCart.splice(index, 1); // Remove item if quantity is zero
                  }
                  setCart(newCart);
                }}>
                -
              </button>
              <span className="mx-[10px]">{item.quantity}</span>
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => {
                  const newCart = [...cart];
                  // if json copy
                  // const student = {name : na, age : 20  }
                  // const newStudent = {...student}
                  newCart[index].quantity += 1;
                  setCart(newCart);
                }}>
                +
              </button>
            </div>
            <div className="w-[190px] h-full bg-yellow-200 flex justify-end items-center pr-[10px]">
              <span className="text-red-500 font-bold">{(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <button
              className="w-[30px] h-[30px] absolute right-[-40px] bg-red-600 shadow rounded-full flex justify-center items-center text-white border-red-700 hover:bg-white hover:text-red-600 hover:border-red-600 cursor-pointer"
              onClick={() => {
                const newCart = [...cart];
                newCart.splice(index, 1); // Remove item from cart
                setCart(newCart);
                toast.success("Item removed from cart");
              }}>
              <BiTrash></BiTrash>
            </button>
          </div>
        );
      })}

      <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
        <span className="text-2xl font-bold">Total: {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        <button
          className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 text-white hover:bg-white hover:border-blue-700 hover:text-blue-700"
          onClick={() => handlePlaceOrder()}>
          Place order
        </button>
      </div>
      <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-center relative">
        <input
          className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
}
