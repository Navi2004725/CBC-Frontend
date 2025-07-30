import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link to={"/overview/" + product.productId} className="w-[300px] h-[400px] bg-white shrink-0 shadow-2xl rounded-2xl overflow-hidden">
      <img src={product.images[0]} className="w-full h-[275px] object-cover" />
      <div className="w-full h-[125px] p-[3px] flex flex-col">
        <span className="text-gray-50 text-[12px]">{product.productId}</span>
        <h1 className="text-xl font-bold">
          {product.name}
          <span>{product.category}</span>
        </h1>
        <span className="text-gray-500 text-[14px]">
          {product.labelledPrice > product.price ? (
            <p className="line-through text-red-500">
              <span className="line-through mr-[10px]">{product.labelledPrice.toFixed(2)}</span>
              <span>{product.price.toFixed(2)}</span>
            </p>
          ) : (
            <span className="text-green-500">{product.price.toFixed(2)}</span>
          )}
        </span>
      </div>
    </Link>
  );
}
