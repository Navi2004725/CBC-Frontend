const url = "https://swtzsgmpdrzawqlgzsnp.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dHpzZ21wZHJ6YXdxbGd6c25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODQxMDksImV4cCI6MjA2ODI2MDEwOX0.NOQmoEj_Y7Lps3vcggAf8RTrpE-zL4v1Mq2-o3__RNY";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("Please select a file to upload.");
      return;
    }

    const timeStamp = new Date().getTime();
    const fileName = timeStamp + "_" + file.name;
    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
        console.log("File uploaded successfully:", fileName);
        resolve(publicUrl);
      })
      .catch(() => {
        reject("Error uploading file. Please try again.");
      });
  });
  return promise;
}
