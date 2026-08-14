import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;
  const onSale = product.labelledPrice > product.price;
  const discount = onSale ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100) : 0;

  return (
    <Link
      to={"/overview/" + product.productId}
      className="group block bg-white rounded-2xl overflow-hidden card-hover border border-blush/50">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {onSale && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-rose-dark text-white text-xs font-semibold uppercase tracking-wider rounded-full">
            -{discount}%
          </span>
        )}
        {product.category && (
          <span className="absolute top-4 right-4 px-3 py-1 glass text-accent text-[10px] uppercase tracking-wider font-medium rounded-full capitalize">
            {product.category}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-accent/80 to-transparent">
          <span className="text-white text-xs uppercase tracking-wider">View Details →</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-accent line-clamp-1 group-hover:text-rose-dark transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          {onSale ? (
            <>
              <span className="text-lg font-semibold text-accent">
                Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-muted line-through">
                Rs. {product.labelledPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-accent">
              Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
