import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  const [file, setFile] = useState(null);

  function handleFileUpload() {
    mediaUpload(file)
      .then((Url) => {
        console.log("File uploaded successfully:", Url);
        toast.success("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("File upload failed:", error);
        toast.error("File upload failed. Please try again.");
      });
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <input
        type="file"
        onChange={(e) => {
          console.log(e);
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={handleFileUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer">
        Upload
      </button>
    </div>
  );
}
