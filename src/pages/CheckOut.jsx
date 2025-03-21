/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
import Navbar from "components/Navbar";
import React, { useState } from "react";
import routes from "src/Route";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOut = ({ cartItems, setCartItems }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const savedData = localStorage.getItem("user");

    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          email: "",
          lastName: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        };
  });

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.offer_price;
  }, 0);
  const deliveryCharges = 10;
  const totalPayable = subTotal + deliveryCharges;
  const history = useHistory();
  const handleSubmit = () => {
    if (
      userDetails.email &&
      userDetails.firstName &&
      userDetails.lastName &&
      userDetails.address &&
      userDetails.apartment &&
      userDetails.city &&
      userDetails.state &&
      userDetails.zipCode &&
      userDetails.country
    ) {
      toast.success(`Order placed successfully`, { theme: "dark" });
      history.push(routes.products.orderSuccess);
      setCartItems([]);
    } else {
      toast.error(`fillup the details correctly`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.log(userDetails);
    }
  };

  return (
    <form>
      <div className="flex min-h-screen">
        {/* Left Section */}
        <div className="w-2/3 px-8 py-4">
          <Navbar showLeftBottom title="CHECKOUT" />
          {/* Contact Section */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Contact</h3>
            <input
              required
              className="w-full rounded-md border p-2"
              placeholder="Enter your email"
              type="email"
              value={userDetails.email}
              onChange={e =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>
          {/* Shipping Address */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Shipping address</h3>
            <div className="mb-4">
              <label className="mb-1 block">Country*</label>
              <select
                required
                className="w-full rounded-md border p-2"
                value={userDetails.country || ""}
                onChange={e =>
                  setUserDetails({ ...userDetails, country: e.target.value })
                }
              >
                <option>Select the country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block">First name*</label>
                <input
                  required
                  className="w-full rounded-md border p-2"
                  placeholder="Enter first name"
                  type="text"
                  value={userDetails.firstName || ""}
                  onChange={e =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block">Last name*</label>
                <input
                  required
                  className="w-full rounded-md border p-2"
                  placeholder="Enter last name"
                  type="text"
                  value={userDetails.lastName || ""}
                  onChange={e =>
                    setUserDetails({ ...userDetails, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-1 block">Address*</label>
              <input
                required
                className="w-full rounded-md border p-2"
                placeholder="Enter address"
                type="text"
                value={userDetails.address || ""}
                onChange={e =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block">Apartment*</label>
              <input
                required
                className="w-full rounded-md border p-2"
                placeholder="Enter apartment number"
                type="text"
                value={userDetails.apartment || ""}
                onChange={e =>
                  setUserDetails({ ...userDetails, apartment: e.target.value })
                }
              />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block">City*</label>
                <input
                  required
                  className="w-full rounded-md border p-2"
                  placeholder="Enter city name"
                  type="text"
                  value={userDetails.city || ""}
                  onChange={e =>
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block">State*</label>
                <select
                  required
                  className="w-full rounded-md border p-2"
                  value={userDetails.state || ""}
                  onChange={e =>
                    setUserDetails({ ...userDetails, state: e.target.value })
                  }
                >
                  <option value="Select the State">Select the state</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block">Zip code*</label>
                <input
                  required
                  className="w-full rounded-md border p-2"
                  placeholder="Enter zip code"
                  type="text"
                  value={userDetails.zipCode || ""}
                  onChange={e =>
                    setUserDetails({ ...userDetails, zipCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                required
                className="mr-2"
                type="checkbox"
                onClick={() =>
                  localStorage.setItem("user", JSON.stringify(userDetails))
                }
              />
              <span>Save this information for next time</span>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-1/3 bg-gray-100 px-6 py-4">
          {cartItems.length > 0 &&
            cartItems.map(item => (
              <div className="mb-4" key={item.id}>
                <div className="mb-2 flex items-center">
                  <img
                    alt="Product"
                    className="mr-3 h-12 w-12 rounded-md"
                    src={item.image_url}
                  />
                  <span>
                    {item.name} ${item.offer_price}
                  </span>
                </div>
              </div>
            ))}
          <hr className="my-4" />
          <div className="text-sm">
            <div className="mb-2 flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="mb-2 flex justify-between text-green-600">
              <span>Delivery charges</span>
              <span>{subTotal > 100 ? "FREE" : `$${deliveryCharges}`}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Payable</span>
              <span>${totalPayable}</span>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-600 py-2 text-white"
            onClick={handleSubmit}
          >
            Confirm order
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckOut;
