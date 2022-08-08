import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const QueryAddress = ({ setAddress, address }) => {
  const [query, setQuery] = useState("");
  const [fullAddress, setFullAddress] = useState([]);
  const success = "";
  if (success) {
    console.log("defined");
  }
  useEffect(() => {
    axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${query}&autocomplete=1`)
      .then((response) => {
        setFullAddress(response.data.features);
      });
  }, [query]);
  const handleClick = (text) => {
    setQuery(text);
    setAddress(text);
    setFullAddress([]);
  };
  const handleChangeAddress = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setAddress(e.target.value);
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        className="appearance-none rounded-none relative block w-full  p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
        placeholder="Adresse du city stade ?"
        onChange={handleChangeAddress}
        required
      />
      {fullAddress?.map((add, key) => (
        <div
          className="p-3 bg-white hover:bg-green-200 border-r-2 border-l-2 border-gray-300"
          key={key}
          onClick={(e) => {
            handleClick(add?.properties.label);
            e.preventDefault();
          }}>
          {add?.properties.label}
        </div>
      ))}
    </div>
  );
};

QueryAddress.propTypes = {
  query: PropTypes.string,
  fullAddress: PropTypes.array,
  handleChangeAddress: PropTypes.func,
  handleClick: PropTypes.func,
};

export default QueryAddress;
