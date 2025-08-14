import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Paginator from "../../components/pajinator";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [popup, setPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "/login";
      return;
    }

    if (loading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders/" + page + "/" + limit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          toast.error("Failed to fetch orders");
          setLoading(false);
        });
    }
  }, [loading, page, limit]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th className="p-[10px]">Order ID</th>
            <th className="p-[10px]">email</th>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Address</th>
            <th className="p-[10px]">Phone</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Date</th>
            <th className="p-[10px]">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr
                key={index}
                className="border-b hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  setOrderStatus(order.status);
                  setOrderNotes(order.notes);
                  setOrderDetails(order);
                  setPopup(true);
                }}>
                <td className="p-[10px]">{order.orderID}</td>
                <td className="p-[10px]">{order.email}</td>
                <td className="p-[10px]">{order.name}</td>
                <td className="p-[10px]">{order.address}</td>
                <td className="p-[10px]">{order.phone}</td>
                <td className="p-[10px]">{order.status}</td>
                <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-[10px]">{order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {popup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[700px] max-h-[90vh]  shadow-xl animate-fadeIn relative">
            {/* Close Button */}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-[-30px] right-[-30px] w-[40px] h-[40px] rounded-full bg-red-500 border border-red-500 text-white p-2 hover:bg-transparent hover:text-red-500 hover:border-red-500 z-50">
              ✕
            </button>
            {(orderStatus != orderDetails.status || orderNotes != orderDetails.notes) && (
              <button
                className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                onClick={async () => {
                  setLoading(false);
                  try {
                    await axios.put(
                      import.meta.env.VITE_BACKEND_URL + "/orders/" + orderDetails.orderID,
                      {
                        status: orderStatus,
                        notes: orderNotes,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                      }
                    );
                    toast.success("Order updated successfully");
                    setLoading(true);
                  } catch (error) {
                    toast.error("Failed to update order");
                    console.error("Error updating order:", error);
                  }
                }}>
                <span className="text-sm">Update Order</span>
              </button>
            )}

            {/* Title */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <p className="text-gray-500 text-sm">#{orderDetails.orderID}</p>
            </div>

            {/* Order Info */}
            <div className="p-6 space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {orderDetails.email}
              </p>
              <p>
                <strong>Name:</strong> {orderDetails.name}
              </p>
              <p>
                <strong>Address:</strong> {orderDetails.address}
              </p>
              <p>
                <strong>Phone:</strong> {orderDetails.phone}
              </p>
              <p>
                <strong className="">Total:</strong>
                {orderDetails.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 text-sm rounded ${
                    orderDetails.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : orderDetails.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                  {orderDetails.status}
                </span>
                <select className="ml-4 p-1 border rounded" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </p>
              <p>
                <strong className="text-lg">Notes:</strong>
                {orderDetails.notes}
              </p>
              <textarea className="w-full h-[50px] p-2 border rounded mt-2" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)}></textarea>
              <p>
                <strong>Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}
              </p>
            </div>

            {/* Items */}
            <div className="p-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-gray-50 rounded-lg p-3 shadow hover:shadow-md transition">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border" />
                    <div className="flex flex-col justify-between">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
                      <p className="text-gray-800 font-semibold">{item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
          </div>
        </div>
      )}

      <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />
    </div>
  );
}
