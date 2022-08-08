import { memo } from "react";
import PropTypes from "prop-types";

const SearchCity = ({ searchTerm, setSearchTerm }) => {
  const success = "";
  if (success) {
    console.log("defined");
  }
  return (
    <div id="search" className="flex justify-center">
      <input
        className="w-full mt-5 lg:w-1/5 md:w-1/5 sm:w-1/5 text-gray-700 p-2 mb-4 leading-tight focus:border-green-600 rounded-lg border  border-green-500"
        type="text"
        placeholder="Entrez une addresse..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          e.preventDefault();
        }}
      />
    </div>
  );
};
SearchCity.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};
export default memo(SearchCity);
