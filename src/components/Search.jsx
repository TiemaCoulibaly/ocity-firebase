import React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

const Search = () => {
  const [value, setValue] = React.useState("");
  return (
    <form>
      <AddressAutofill accessToken={process.env.REACT_APP_APP_MAPBOX_API_KEY}>
        <input
          autoComplete="shipping address-line1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </AddressAutofill>
      <h3>Search box</h3>
      {/* <SearchBox accessToken={process.env.REACT_APP_APP_MAPBOX_API_KEY} /> */}
    </form>
  );
};
export default Search;
