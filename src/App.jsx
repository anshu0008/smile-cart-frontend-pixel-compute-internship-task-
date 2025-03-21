/* eslint-disable import/order */
import Cart from "src/pages/Cart";
import CheckOut from "src/pages/CheckOut";
import ProductDetails from "src/pages/ProductDetails";

import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import "./App.css";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import OrderSuccess from "./pages/OrderSuccess";
import PageNotFound from "components/PageNotFound";
import routes from "./Route";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // eslint-disable-next-line react/hook-use-state
  const [Data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");

    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedData = localStorage.getItem("products");

    return savedData ? JSON.parse(savedData) : [];
  });

  const notify = (notice, name) => {
    if (notice === "success") {
      toast.success(`${name.slice(0, -1)} added to cart Successfully`, {
        position: "bottom-left",
        autoClose: 3000, // Auto close after 3 sec
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error(`${name} is not added to cart`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (Data.length === 0) {
        setLoading(true);
        try {
          const obj = await axios.get(process.env.REACT_APP_API_URL);
          const data = await obj.json();
          localStorage.setItem("data", JSON.stringify(data.products));
          setData(data.products);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    }
    fetchData();
  }, [Data]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartItems));
  }, [cartItems]);

  const addedToCart = (item, index) => {
    const exist = cartItems.find(x => x.slug === item.slug);
    if (exist) {
      setCartItems(
        cartItems.map(x =>
          x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1, id: index + 1 }]);
    }
    notify("success", item.name);
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={routes.products.home}
          render={() => (
            <Home Data={Data} addedToCart={addedToCart} loading={loading} />
          )}
        />
        <Route
          exact
          path={routes.products.cart}
          render={() => (
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
          )}
        />
        <Route
          exact
          path={routes.products.info}
          render={() => (
            <ProductDetails Data={Data} addedToCart={addedToCart} />
          )}
        />
        <Route
          exact
          path={routes.products.checkOut}
          render={() => (
            <CheckOut cartItems={cartItems} setCartItems={setCartItems} />
          )}
        />
        <Route
          exact
          path={routes.products.orderSuccess}
          render={() => <OrderSuccess />}
        />
        <Redirect exact from="/" to="/products" />
        <Route component={PageNotFound} path="*" />
      </Switch>
      <ToastContainer />
    </div>
  );
};
export default App;
