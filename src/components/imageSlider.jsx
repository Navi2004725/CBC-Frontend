import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function imageSlider(props) {
  const images = props.images;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const prev = () => setActiveImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full max-w-md lg:max-w-lg">
      <div className="relative rounded-2xl overflow-hidden bg-rose-light/30 aspect-square mb-4 group">
        <img
          src={images[activeImageIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Previous image">
              <IoChevronBack className="text-accent" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Next image">
              <IoChevronForward className="text-accent" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 justify-center flex-wrap">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                activeImageIndex === index
                  ? "ring-2 ring-rose-dark ring-offset-2 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}>
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
