import React, { memo, useContext, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import ProgressBar from "../components/ProgressBar.tsx";
import PropTypes from "prop-types";
import QueryAddress from "../components/QueryAddress";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AddCity = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [data, setData] = useState({});
  const [upload, setUpload] = useState("");
  const [progress, setProgress] = useState(null);

  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [query, setQuery] = useState("");
  const [fullAddress, setFullAddress] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const handleFile = (e) => {
    // e.preventDefault();
    const { files } = e.target;

    for (let i = 0; i < files.length; i++) {
      const newImage = files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  useEffect(() => {
    const promises = [];
    images?.forEach((image) => {
      const uniqueName = new Date().getTime() + image.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              setUpload("upload is paused");

              break;
            case "running":
              setUpload("upload is done");

              break;
            default:
              break;
          }
        },

        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prevState) => [...prevState, downloadURL]);
          });
        }
      );
      setUrls([]);
    });

    Promise.all(promises)
      .then(() => setUpload("All images uploaded"))
      .catch((err) => console.log(err));
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      username: currentUser.displayName,
      coordinates: coordinates,

      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "city-stade"), {
        ...data,
        address: address,
        pictures: urls,
        timeStamp: serverTimestamp(),
      });

      window.location.replace("/post/" + docRef.id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getLocation = async () => {
      try {
        const QUERY_API = `https://api-adresse.data.gouv.fr/reverse/?lon=${long}&lat=${lat}`;

        const { data } = await axios.get(QUERY_API);

        setQuery(data.features[0].properties.label);
      } catch (e) {
        console.log(e);
      }
    };

    getLocation();
  }, [lat, long, coordinates]);

  const handleClickLocation = async (e) => {
    e.preventDefault();
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);

        setCoordinates([long, lat]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-3">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-2">
            Ajouter un city stade
          </h2>

          {progress && (
            <ProgressBar progressPercentage={progress} upload={upload} />
          )}
        </div>

        <div className="flex justify-around flex-wrap rounded-lg rounded-b-none w-full">
          {urls?.map((url) => (
            <img
              key={uuidv4()}
              className="w-60 mx-2 my-2 object-cover object-center rounded-xl"
              src={url}
              alt="city-stade"
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 mb-5 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
              </svg>
              <div className="flex justify-center text-sm text-gray-600">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-white rounded-md font-medium text-green-600 "
                >
                  {images.length >= 0 && (
                    <span className="m-2">{images.length} images uploaded</span>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    onChange={handleFile}
                    multiple
                    disabled={images.length >= 3}
                    required
                  />
                </label>
              </div>
              {images.length >= 3 ? (
                <p className="bg-red-100 p-1 text-xs text-gray-500">
                  Limit de 3 images atteint
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF 3 files max
                </p>
              )}
            </div>
          </div>

          <input
            type="text"
            className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
            placeholder="Nom du city stade"
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
          <QueryAddress
            address={address}
            setAddress={setAddress}
            setCoordinates={setCoordinates}
            handleClickLocation={handleClickLocation}
            query={query}
            setQuery={setQuery}
            setFullAddress={setFullAddress}
            fullAddress={fullAddress}
            coordinates={coordinates}
            setLat={setLat}
            setLong={setLong}
          />

          <textarea
            placeholder="decris le city stade et comment y accéder.."
            type="text"
            className="appearance-none rounded-none relative block w-full my-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
            id="description"
            name="description"
            onChange={handleChange}
            required
          ></textarea>
          <div className="flex justify-between flex-wrap">
            <label>Horaire d'ouverture:</label>
            <input
              onChange={handleChange}
              type="time"
              id="openHour"
              name="openHour"
              className="border border-gray-300"
            />

            <label>Horaire de fermeture:</label>
            <input
              onChange={handleChange}
              type="time"
              id="closeHour"
              name="closeHour"
              className="border border-gray-300"
            />
          </div>
          <div className="flex flex-col my-4">
            <div className="flex flex-col justify-center items-center py-4">
              <select
                onChange={handleChange}
                name="pitch"
                id="pitch"
                defaultValue=""
                className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                required
              >
                <option value="" disabled hidden className="">
                  Type de Terrain
                </option>
                <option value="Synthétique" className="">
                  Synthétique
                </option>
                <option value="Béton(sol dur)">Béton-(sol dur)</option>
                <option value="Terrain rouge">Terrain rouge</option>
              </select>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
              <select
                name="light"
                id="light"
                onChange={handleChange}
                defaultValue=""
                className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                required
              >
                <option value="" disabled hidden>
                  Type d'éclairage (nuit)
                </option>
                <option value="Éclairée de nuit">Éclairée de nuit</option>
                <option value="Non éclairée">Non éclairée</option>
              </select>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
              <select
                name="shoes"
                id="shoes"
                onChange={handleChange}
                defaultValue=""
                className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                required
              >
                <option value="" disabled hidden>
                  Type de chaussure (recommendé)
                </option>
                <option value="Stabilisé">Stabilisé</option>
                <option value="Crampon">Crampon</option>
                <option value="Basket">Basket</option>
                <option value="Tous types de chaussures">
                  Tous types de chaussures
                </option>
              </select>
            </div>
          </div>

          <button
            disabled={progress !== null && progress < 100}
            className="group relative w-full flex justify-center p-3 mb-5 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-400"
            type="submit"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

AddCity.propTypes = {
  data: PropTypes.object,
  upload: PropTypes.string,
  progress: PropTypes.number,
  fullAddress: PropTypes.array,
  query: PropTypes.string,
  address: PropTypes.string,
  images: PropTypes.array,
  urls: PropTypes.array,
  coordinates: PropTypes.number,
  handleFile: PropTypes.func,
  handleUpload: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChangeAddress: PropTypes.func,
  handleClick: PropTypes.func,
};

export default memo(AddCity);
