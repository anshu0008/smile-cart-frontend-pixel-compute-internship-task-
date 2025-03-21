import React, { useEffect, useState } from "react";

import Loader from "components/Loader";
import Navbar from "components/Navbar";
import ProductListItem from "components/ProductListItem";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import routes from "src/Route";

const Home = ({ Data, loading, addedToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [filterData, setFilterData] = useState([]);

  const DataPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(
    filterData.length > 0
      ? filterData.length / DataPerPage
      : Data.length / DataPerPage
  );

  // Get current Data
  const startIndex = (currentPage - 1) * DataPerPage;
  const currentData =
    filterData.length > 0
      ? filterData.slice(startIndex, startIndex + DataPerPage)
      : Data.slice(startIndex, startIndex + DataPerPage);

  const searchData = () => {
    setFilterData(
      Data.filter(item =>
        item.name.toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (searchKey.length === 0) setFilterData([]);
  }, [searchKey]);

  return (
    <div>
      <Navbar
        shouldShowBackButton={false}
        title="Smile cart"
        actionBlock={
          <div className="item-center flex justify-center gap-12">
            <div className="w-45 item-center flex gap-2 rounded border-2 border-[#dee3e4] px-3 py-1">
              <Search />
              <input
                className="outline-none w-full border-none text-[#dee3e4]"
                placeholder="Search Products"
                type="text"
                value={searchKey}
                onChange={e => {
                  setSearchKey(e.target.value);
                  searchData();
                }}
              />
            </div>
            <Link to={routes.products.cart}>
              <ShoppingCart className="h-10 w-10 cursor-pointer" />
            </Link>
          </div>
        }
      />
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader loading={loading} />
        </div>
      ) : (
        <>
          <div className="item-center flex flex-wrap justify-center gap-20 p-10">
            {currentData.map((item, index) => (
              <ProductListItem
                addedToCart={addedToCart}
                index={index}
                item={item}
                key={index}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                disabled={currentPage === page}
                key={page}
                className={`rounded-md border px-4 py-2 ${
                  currentPage === page
                    ? "cursor-not-allowed bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
