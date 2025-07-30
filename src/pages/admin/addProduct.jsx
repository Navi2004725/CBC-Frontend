import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload.jsx";
export default function UpdateProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(", "));
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(location.state.description);
  const [stock, setStock] = useState(location.state.stock);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const [category, setCategory] = useState(location.state.category);
  const navigation = useNavigate();

  async function handleSubmit() {
    const promiseArray = [];
    for (let i = 0; i < images.length; i++) {
      const promise = mediaUpload(images[i]);
      promiseArray[i] = promise;
    }

    const responces = await Promise.all(promiseArray);
    console.log(responces);

    const altNamesInArray = altNames.split(",");
    const productData = {
      productId: productId,
      name: name,
      altNames: altNamesInArray,
      labelledPrice: labelledPrice,
      price: price,
      images: responces,
      description: description,
      stock: stock,
      isAvailable: isAvailable,
      category: category,
    };
    console.log("Product Data:", productData);
    if (responces.length === 0) {
      productData.images = location.state.images; // Keep existing images if none are uploaded
    }

    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "/login";
      // or you can use navigation("/login");
      return;
    }
    axios
      .put(import.meta.env.VITE_BACKEND_URL + "/products/" + productId, productData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("Product updated successfully");
        console.log(res.data);
        toast.success("Product updated successfully!");
        navigation("/admin/products");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Error updated product. Please try again.");
      });
  }

  return (
    <div className="w-full h-full justify-center items-center">
      <div className="w-[600px] border-[3px] rounded-[15px] ml-[100px] mt-[20px] flex flex-wrap justify-between p-[40px]">
        <div className="w-[200px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Product Id</label>
          <input disabled type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[300px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[500px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Alternative name</label>
          <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[200px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Labled price</label>
          <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[200px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[500px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Images</label>
          <input multiple type="file" onChange={(e) => setImages(e.target.files)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[500px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md"></textarea>
        </div>
        <div className="w-[200px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
        </div>
        <div className="w-[300px]  flex flex-col gap-[5px]">
          <label className="text-sm font-semibold">Isavailable</label>
          <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className="border-[1px] h-[40px] rounded-md">
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="w-[300px]  flex flex-col gap-[5px] ">
          <label className="text-sm font-semibold">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border-[1px] h-[40px] rounded-md">
            <option value="cream">Cream</option>
            <option value="face wash">Face wash</option>
            <option value="soap">Soap</option>
            <option value="fragrance">Fragrence</option>
          </select>
        </div>
        <div className="w-[500px] flex justify-center flex-row py-[20px]">
          <Link to={"/admin/products"} className="w-[200px] h-[50px] bg-white text-black border-[2px] ml-[20px] rounded-md flex items-center justify-center">
            Cancel
          </Link>
          <button onClick={handleSubmit} className="w-[200px] h-[50px] bg-black text-white border-[2px] ml-[20px] rounded-md">
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
