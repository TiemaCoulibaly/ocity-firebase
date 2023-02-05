import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";

type QueryAddressProps = {
  setAddress: React.Dispatch<string>;
  address: string[];
  handleClickLocation: React.MouseEventHandler<HTMLLabelElement>;
  setCoordinates: React.Dispatch<number[]>;
  query: string;
  setQuery: React.Dispatch<string>;
  setFullAddress: React.Dispatch<string[]>;
  fullAddress: any[];
  setLat: React.Dispatch<number[]>;
  setLong: React.Dispatch<number[]>;
  handleClick: number;
  add: React.Dispatch<string>;
};

const QueryAddress = ({
  setAddress,
  address,
  handleClickLocation,
  setCoordinates,
  query,
  setQuery,
  setFullAddress,
  fullAddress,
  setLat,
  setLong,
}: QueryAddressProps) => {
  const [noResult, setNoResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const QUERY_API = `https://api-adresse.data.gouv.fr/search/?q=${query}&autocomplete=1`;

        const { data } = await axios.get(QUERY_API);
        setFullAddress(data.features);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [query, setFullAddress]);

  const handleClick = (text: string) => {
    setQuery(text);
    setAddress(text);
    setFullAddress([]);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
    setAddress(e.target.value);
    if (fullAddress.length === 0) {
      setNoResult("no result");
    } else {
      setNoResult("");
    }

    console.log("====================================");
    console.log("query", query);
    console.log("====================================");
    console.log("address", address);
    console.log("====================================");
    console.log("fullAddress", fullAddress);
    console.log("====================================");
  };

  return (
    <div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <label
            onClick={handleClickLocation}
            className="bg-gray-200 hover:bg-green-200 rounded px-2 py-1 text-gray-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </label>
        </div>

        <input
          type="text"
          id="address"
          name="address"
          value={address}
          className="appearance-none border border-gray-300 w-full p-3 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10  placeholder-gray-500"
          placeholder="Adresse du city stade ?"
          onChange={handleChangeAddress}
          autoComplete="off"
          required
        />
      </div>

      {noResult ? (
        <div className="p-3 bg-white hover:bg-green-200 border-r-2 border-l-2 border-b-2 border-gray-300">
          <span className="font-bold">
            {isLoading ? (
              <Spinner
                heightScreen={"h-5"}
                justify={"start"}
                width={5}
                height={5}
              />
            ) : (
              noResult
            )}
          </span>
        </div>
      ) : (
        fullAddress?.map((add) => (
          <div
            className="p-3 bg-white hover:bg-green-200 border-r-2 border-l-2 border-b-2 border-gray-300"
            key={uuidv4()}
            onClick={(e) => {
              handleClick(add?.properties.label);
              setCoordinates(add.geometry.coordinates);
              setLat(add.geometry.coordinates[1]);
              setLong(add.geometry.coordinates[0]);
              e.preventDefault();
            }}
          >
            {isLoading ? (
              <Spinner
                heightScreen={"h-5"}
                width={5}
                height={5}
                justify={"start"}
              />
            ) : (
              <>
                {" "}
                <span className="font-bold">{add?.properties.label} </span>
                <br />
                <span> {add?.properties.context}</span>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default QueryAddress;
