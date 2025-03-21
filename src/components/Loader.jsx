import React from "react";

import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => (
  <ClipLoader
    // color={color}
    aria-label="Loading Spinner"
    data-testid="loader"
    loading={loading}
    // cssOverride={override}
    size={50}
  />
);

export default Loader;
