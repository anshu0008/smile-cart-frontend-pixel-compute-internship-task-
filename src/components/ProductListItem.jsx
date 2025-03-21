import { Typography } from "neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductListItem = ({ item, addedToCart, index }) => (
  <div className="flex w-48 flex-col items-center justify-between rounded-xl border-2 border-black p-4">
    <Link to={`/productDetails/${item.slug}`}>
      <img alt={item.name} className="h-40 w-40" src={item.image_url} />
    </Link>
    <Typography className="text-center" weight="semibold">
      {item.name}
    </Typography>
    <Typography>${item.offer_price}</Typography>
    <Link to="/">
      <button
        className="rounded-lg bg-blue-600 p-2 text-center font-bold text-white"
        onClick={() => addedToCart(item, index)}
      >
        Add to Cart
      </button>
    </Link>
  </div>
);

export default ProductListItem;
