import { useState } from "react";
import { AddtoCart, getCart, getCartTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] max-w-[100vw] h-screen flex flex-col py-[40px] px-[10px] items-center">
      {cart.map((item) => {
        return (
          <div key={item.productId} className="w-full md:h-[100px] h-[200px] m-[10px] shadow-2xl flex flex-row items-center relative md:w-[800px]">
            <div className="md:w-[100px] w-[200px] justify-center items-center flex flex-col text-2xl md:text-md">
              <img src={item.images} className="w-[100px] h-[100px] object-cover" />
              <div className=" h-full bg-red-500  flex-col justify-center pl-[10px] hidden  md:flex">
                <span className=" font-bold md:text-left text-center">{item.name}</span>
                <span className="font-bold md:text-left text-center">{item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="w-[190px] h-full bg-green-400 flex flex-row justify-center items-center text-4xl md:text-md">
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => {
                  AddtoCart(item, -1);
                  setCart(getCart()); // Update cart state after  item
                }}>
                -
              </button>
              <span className="mx-[10px]">{item.quantity}</span>
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => {
                  AddtoCart(item, 1);
                  setCart(getCart()); // Update cart state after adding item
                }}>
                +
              </button>
            </div>
            <div className="w-[190px] h-full bg-yellow-200 flex justify-end items-center pr-[10px] text-3xl md:text-md">
              <span className="text-red-500 font-bold">{(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <button
              className="w-[30px] h-[30px] top-[0px] right-[0px] md:top-[35px] absolute md:right-[-40px] bg-red-600 shadow rounded-full flex justify-center items-center text-white border-red-700 hover:bg-white hover:text-red-600 hover:border-red-600 cursor-pointer"
              onClick={() => {
                AddtoCart(item, item.quantity * -1); // Remove item from cart
                setCart(getCart()); // Update cart state after adding item
              }}>
              <BiTrash></BiTrash>
            </button>
          </div>
        );
      })}
      <div className="md:w-[800px] w-full h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
        <span className="text-2xl font-bold">Total: {getCartTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        <button
          className="absolute left-[10px] text-2xl md:text-md w-[200px] md:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 text-white hover:bg-white hover:border-blue-700 hover:text-blue-700"
          onClick={() => {
            navigate("/checkout", { state: { items: cart } });
          }}>
          Checkout
        </button>
      </div>
    </div>
  );
}
