import { useState } from "react";

export default function imageSlider(props) {
  const images = props.images;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <div className="w-[400px] h-[500px] bg-pink-400 ">
      <img src={images[activeImageIndex]} className="w-full h-[400px] object-cover" />
      <div className="w-full h-[100px] flex flex-row justify-center items-center gap-[2px]">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              className={"w-[90px] h-[90px] object-cover cursor-pointer" + (activeImageIndex === index ? " border-[5px]" : "")}
              onClick={() => {
                setActiveImageIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
