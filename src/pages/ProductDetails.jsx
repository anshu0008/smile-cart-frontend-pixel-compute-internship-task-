import React, { useEffect } from "react";

import Carousel from "components/Carousel";
import Navbar from "components/Navbar";
import { Link, useParams } from "react-router-dom";

const ProductDetails = ({ Data, addedToCart }) => {
  const [productDetail, setProductDetail] = React.useState([]);

  const id = useParams();
  useEffect(() => {
    const item = Data.find(product => product.slug === id.id);

    setProductDetail(item);
  }, [id.id, Data]);

  return (
    <div className="px-6 pb-6">
      {productDetail && (
        <>
          <Navbar showLeftBottom title={productDetail.name} />
          <div className="flex items-center justify-center p-20">
            <div className="w-2/5">
              {/* <img
                alt="Product"
                className="h-64 w-10/12 object-contain"
                src={productDetail.image_url}
              /> */}
              <Carousel
                image_url={productDetail.image_url}
                title={productDetail.slug}
              />
            </div>
            <div className="w-3/5 space-y-4">
              <p>{productDetail.name}</p>
              <p>MRP : ${productDetail.mrp}</p>
              <p className="font-bold">
                Offer price : ${productDetail.offer_price}
              </p>
              <p className="font-semibold text-green-600">
                {(
                  ((productDetail.mrp - productDetail.offer_price) * 100) /
                  productDetail.mrp
                ).toFixed(2)}
                % off
              </p>
              <div className="flex gap-10">
                <Link to="/cart">
                  <button
                    className="rounded bg-blue-600 p-2 text-center font-bold text-white"
                    onClick={() => addedToCart(productDetail)}
                  >
                    Add to Cart
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    className="rounded bg-blue-600 p-2 text-center font-bold text-white"
                    onClick={() => addedToCart(productDetail)}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductDetails;
