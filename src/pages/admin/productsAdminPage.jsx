import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
  // backend data retrieval
  // store data in Products state
  // using useEffect hook to fetch data from backend only once when the component mounts

  const [Products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      // Check if loading is true before fetching data
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          setProducts(response.data);
          setisLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [isLoading]); // Dependency array includes isLoading to refetch data when it changes

  const navigation = useNavigate();
  axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
  return (
    <div className="w-full h-full bg-white border-[3px]">
      {isLoading ? ( // Show loading state while data is being fetched
        <Loader /> // Use the Loader component to show a loading spinner
      ) : (
        // Render the table only when data is available
        <table>
          <thead>
            <tr>
              <th className="p-[10px]">Images</th>
              <th className="p-[10px]">Product ID</th>
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Price</th>
              <th className="p-[10px]">Labelled price</th>
              <th className="p-[10px]">Stock</th>
              <th className="p-[10px]">Category</th>
              <th className="p-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product, index) => (
              <tr key={index}>
                <td className="p-[10px]">
                  <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]" />
                </td>
                <td className="p-[10px]">{product.productId}</td>
                <td className="p-[10px]">{product.name}</td>
                <td className="p-[10px]">{product.price}</td>
                <td className="p-[10px]">{product.labelledPrice}</td>
                <td className="p-[10px]">{product.stock}</td>
                <td className="p-[10px]">{product.category}</td>
                <td className="p-[10px]">
                  <div className="flex items-center gap-2">
                    <BiTrash
                      className="bg-red-500 p-[5px] text-3xl rounded-full text-white shadow-2xl cursor-pointer"
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (token == null) {
                          navigation("/login");
                          return;
                        }
                        axios
                          .delete(import.meta.env.VITE_BACKEND_URL + "/products/" + product.productId, {
                            headers: {
                              Authorization: "Bearer " + token,
                            },
                          })
                          .then((res) => {
                            console.log("Product deleted successfully");
                            toast.success("Product deleted successfully!");
                            console.log(res.data);
                            setisLoading(isLoading); // Trigger re-render by updating state
                          })
                          .catch((error) => {
                            console.error("Error deleting product:", error);
                            toast.error("Error deleting product. Please try again.");
                          });
                      }}
                    />
                    <BiEdit
                      onClick={() => {
                        navigation("/admin/updateProduct", {
                          state: product, // Pass the product data to the update page
                        });
                      }}
                      className=" text-white bg-blue-500 p-[5px] text-3xl rounded-full shadow-2xl cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] p-[20px]  text-white bg-black rounded-full shadow-2xl cursor-pointer ">
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
