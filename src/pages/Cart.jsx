/* eslint-disable react/jsx-newline */
import React from "react";

import Navbar from "components/Navbar";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import routes from "src/Route";

const Cart = ({ cartItems, setCartItems }) => {
  const updateQuantity = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty >= item.available_quantity && amount === 1
                  ? item.qty
                  : Math.max(1, item.qty + amount),
            }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.mrp * item.qty,
    0
  );

  const totalOfferPrice = cartItems.reduce(
    (acc, item) => acc + item.offer_price * item.qty,
    0
  );
  const totalDiscount = totalMRP - totalOfferPrice;

  return (
    <div className="max-w-screen mx-auto p-4">
      <Navbar showLeftBottom title="My Cart" />
      <div className="flex items-center justify-center">
        <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <p className="mt-4 text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div
                  className="flex items-center rounded-lg border p-3 shadow-sm"
                  key={item.id}
                >
                  <img
                    alt={item.slug}
                    className="h-16 w-16 rounded object-cover"
                    src={item.image_url}
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-sm font-semibold">{item.name}</h2>
                    <p className="text-xs text-gray-500">MRP: ${item.mrp}</p>
                    <p className="text-xs text-green-600">
                      Offer price: ${item.offer_price}
                    </p>
                  </div>
                  <div className="flex items-center rounded-md border px-2 py-1">
                    <button
                      className="px-2 text-lg font-bold"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-3">{item.qty}</span>
                    <button
                      className="px-2 text-lg font-bold"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <Trash
                    className="ml-4 h-5 w-5 cursor-pointer text-red-500"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="rounded-lg border p-4 shadow-sm">
              <p className="text-sm text-gray-500 line-through">
                Total MRP: ${totalMRP}
              </p>
              <p className="text-sm text-green-600">
                Total discounts:{" "}
                <span className="font-semibold">
                  ${totalDiscount} (
                  {((totalDiscount / totalMRP) * 100).toFixed(1)}
                  %)
                </span>
              </p>
              <p className="text-md mt-2 font-semibold">
                Offer price: ${totalOfferPrice}
              </p>
              <Link to={routes.products.checkOut}>
                <button className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white">
                  Buy now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
