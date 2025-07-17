import { BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const sampleProducts = [
  {
    productId: "COSM001",
    name: "Hydrating Face Serum",
    altNames: ["Face Serum", "Moisture Boost Serum"],
    labelledPrice: 3000,
    price: 2490,
    images: ["/images/serum1.png", "/images/serum2.png"],
    description: "A lightweight serum that deeply hydrates your skin and improves texture.",
    stock: 50,
    isAvailable: true,
    category: "cosmatics",
  },
  {
    productId: "COSM002",
    name: "Matte Liquid Lipstick",
    altNames: ["Lip Paint", "Matte Lip Color"],
    labelledPrice: 2000,
    price: 1590,
    images: ["/images/lipstick1.png", "/images/lipstick2.png"],
    description: "Long-lasting matte lipstick with bold pigment and smooth application.",
    stock: 80,
    isAvailable: true,
    category: "cosmatics",
  },
  {
    productId: "COSM003",
    name: "Natural Glow Foundation",
    altNames: ["Glow Base", "Skin Tint"],
    labelledPrice: 3500,
    price: 2890,
    images: ["/images/foundation1.png"],
    description: "Buildable coverage foundation that gives a radiant and natural finish.",
    stock: 40,
    isAvailable: true,
    category: "cosmatics",
  },
  {
    productId: "COSM004",
    name: "Charcoal Face Mask",
    altNames: ["Detox Mask", "Blackhead Remover"],
    labelledPrice: 1800,
    price: 1450,
    images: ["/images/mask1.png"],
    description: "Purifying charcoal face mask that removes dirt and tightens pores.",
    stock: 60,
    isAvailable: true,
    category: "cosmatics",
  },
  {
    productId: "COSM005",
    name: "Volumizing Mascara",
    altNames: ["Lash Booster", "Black Mascara"],
    labelledPrice: 2200,
    price: 1790,
    images: ["/images/mascara1.png"],
    description: "Intensely black mascara that gives your lashes volume and length.",
    stock: 30,
    isAvailable: true,
    category: "cosmatics",
  },
];

export default function ProductsAdminPage() {
  // backend data retrieval
  // store data in Products state
  // using useEffect hook to fetch data from backend only once when the component mounts

  const [Products, setProducts] = useState(sampleProducts);
  const [a, setA] = useState(0);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [a]);
  const navigation = useNavigate();
  axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
  return (
    <div className="w-full h-full bg-white border-[3px]">
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
                        setA(a + 1); // Trigger re-render by updating state
                      })
                      .catch((error) => {
                        console.error("Error deleting product:", error);
                        toast.error("Error deleting product. Please try again.");
                      });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] p-[20px]  text-white bg-black rounded-full shadow-2xl cursor-pointer ">
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
