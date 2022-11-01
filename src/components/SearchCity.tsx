import { memo, SetStateAction } from "react";

interface SearchCityProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
}

const SearchCity: React.FC<SearchCityProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
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

export default memo(SearchCity);
