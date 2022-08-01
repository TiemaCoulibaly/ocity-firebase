import React, { memo, useContext, useEffect, useState } from "react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { db, storage } from "../firebase";

import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";

// import Graph from "../components/Graph";
import ModalDelete from "../components/ModalDelete";
import ProgressBar from "../components/ProgressBar";
import MyMap from "../components/MyMap";

const SinglePost = () => {
  const [updateMode, setUpdatedMode] = useState(false);
  const [post, setPost] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState("");

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const longitude = post?.coordinates && post?.coordinates[0];
  const latitude = post?.coordinates && post?.coordinates[1];

  const google = `https://www.google.com/maps/place/${
    post?.address
  }/@${latitude},${longitude},${18}z`;

  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              setUpload("Upload is paused");
              break;
            case "running":
              setUpload("Upload is running");
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
            setData((prevData) => ({
              ...prevData,
              image: downloadURL,
            }));
          });
        }
      );
    };
    file && uploadFile();

    const fetchData = async () => {
      try {
        const docRef = doc(db, "city-stade", path);
        const docSnap = await getDoc(docRef);
        setPost(docSnap.data());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [file, path]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "city-stade", path));
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setUpdatedMode(!updateMode);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateRef = doc(db, "city-stade", path);
      const updatePost = await updateDoc(updateRef, {
        ...data,
      });
      setUpdatedMode(false);
      console.log("upadtaed", updatePost);
      // window.location.replace("/");
      window.location.replace("/post/" + path);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const weekdays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const currentDate = new Date();
  const dayOfTheWeek = weekdays[currentDate.getDay()];

  return (
    <>
      <div className="bg-white shadow-2xl px-4">
        <div>
          <div className="px-4 py-2 mt-2">
            {/* HANDLE DELETE */}
            {showModal ? (
              <ModalDelete
                handleDelete={handleDelete}
                handleShowModal={handleShowModal}
                question={"Vous voulez vraiment effacer ce stade ?"}
              />
            ) : null}
            {/* END HANDLE DELETE */}

            {!updateMode ? (
              <>
                <h1 className="mb-4 font-bold text-2xl lg:text-4xl md:text-3xl text-gray-800 text-center">
                  ⚽ City stade {post?.title}
                </h1>

                <div className="relative w-full mx-0 md:w-2/2 md:mx-auto lg:w-2/3 lg:mx-auto">
                  <Carousel dynamicHeight={false} showArrows={true}>
                    {post.pictures?.map((picture, idx) => (
                      <div key={idx}>
                        <img
                          src={picture}
                          alt={post?.title}
                          className="max-h-96 object-center object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                {/* Only same user could edit or delete is own post */}
                {currentUser?.displayName === post?.username && (
                  <div className="flex justify-center pb-4">
                    <button
                      className="bg-blue-300 mx-5 p-1 hover:bg-blue-400 rounded"
                      onClick={handleClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      data-modal-toggle="popup-modal"
                      onClick={() => setShowModal(true)}
                      className="mx-5 bg-red-300 hover:bg-red-400 p-1 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <section className="flex justify-center flex-wrap mx-0 sm:w-2/2 md:w-2/2 md:mx-auto md:flex-nowrap lg:w-2/3 lg:mx-auto lg:flex-nowrap gap-5">
                  <div className="w-full md:w-2/3 lg:2/3">
                    <MyMap
                      coordinates={post?.coordinates}
                      address={post?.address}
                      title={post?.title}
                    />
                  </div>

                  <div className="w-full  md:w-1/3 lg:w-1/3">
                    <h5>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <u>Horaire d'ouverture</u>
                    </h5>
                    <ul>
                      <li
                        className={`${
                          dayOfTheWeek === "Lundi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Lundi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Mardi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Mardi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Mercredi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Mercredi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Jeudi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Jeudi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Vendredi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Vendredi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Samedi" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Samedi</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                      <li
                        className={`${
                          dayOfTheWeek === "Dimanche" && "bg-green-100"
                        } flex justify-between p-2 border-b border-gray-200`}>
                        <p>Dimanche</p>
                        <p>
                          {post?.openHour} <span>-</span> {post?.closeHour}
                        </p>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="flex justify-center flex-wrap mx-0 sm:w-2/2 md:w-2/2 md:mx-auto md:flex-nowrap lg:w-2/3 lg:mx-auto lg:flex-nowrap">
                  <div className="w-full md:w-2/3 lg:w-2/3 text-gray-900  text-base md:text-lg sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500">
                    <div className="flex items-center w-96">
                      <span className="text-green-600 py-2"> Addresse</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
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
                      <a
                        className="underline hover:no-underline"
                        href={google}
                        alt="address-city-stade"
                        target="_blank"
                        rel="noreferrer">
                        {post?.address}
                      </a>
                    </div>

                    <p className="text-gray-900 w-96 text-base md:text-lg sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 py-2">
                      <span className="text-green-600"> Description </span>{" "}
                      {post?.description}
                    </p>
                  </div>
                  <div className="w-full  md:w-1/3 lg:1/3">
                    <ul>
                      <li className=" flex justify-between p-2 border-b border-gray-200">
                        <p className="text-green-600"> Type de Terrain</p>
                        <p>{post?.pitch}</p>
                      </li>
                      <li className=" flex justify-between p-2 border-b border-gray-200">
                        <p className="text-green-600">
                          {" "}
                          Type de chaussure (recommendé)
                        </p>
                        <p> {post?.shoes}</p>
                      </li>
                      <li className=" flex justify-between p-2 border-b border-gray-200">
                        <p className="text-green-600">
                          {" "}
                          Type d'éclairage (nuit)
                        </p>
                        <p> {post?.light}</p>
                      </li>
                    </ul>
                  </div>

                  {/* <Map /> */}
                </section>
                {/* Graph  */}
                {/* <div className="w-1/2 mx-auto">
                  <Graph />
                </div> */}
              </>
            ) : (
              <div className="min-h-full flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-3">
                  <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-2">
                      Update un city stade
                    </h2>

                    {progress && (
                      <ProgressBar
                        progressPercentage={progress}
                        upload={upload}
                      />
                    )}
                  </div>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 mb-5 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="fileInput"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            name="image"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                    placeholder="Nom du city stade"
                    id="title"
                    name="title"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                    placeholder="Adresse du city stade ?"
                    id="address"
                    name="address"
                    onChange={handleChange}
                  />

                  <textarea
                    placeholder="decris le city stade et comment y accéder.."
                    type="text"
                    className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                    id="description"
                    name="description"
                    onChange={handleChange}></textarea>
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
                        name="picth"
                        defaultValue=""
                        className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10">
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
                        onChange={handleChange}
                        defaultValue=""
                        className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10">
                        <option value="" disabled hidden>
                          Type d'éclairage (nuit)
                        </option>
                        <option value="Éclairée de nuit">
                          Éclairée de nuit
                        </option>
                        <option value="Non éclairée de nuit">
                          Non éclairée de nuit
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                      <select
                        name="shoes"
                        onChange={handleChange}
                        defaultValue=""
                        className="active:bg-green-600 bg-white p-3 shadow-lg rounded-md w-2/3  border-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10">
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
                  <div className="flex justify-around items-center">
                    <button
                      disabled={progress !== null && progress < 100}
                      onClick={handleUpdate}
                      className="group relative flex justify-center p-3 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit">
                      Update
                    </button>
                    <button
                      className="bg-red-200 p-3 rounded-md text-xl"
                      onClick={handleClick}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
SinglePost.propTypes = {
  updateMode: PropTypes.bool,
  post: PropTypes.string,
  showModal: PropTypes.bool,
  data: PropTypes.object,
  progress: PropTypes.number,
  file: PropTypes.string,
  upload: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleShowModal: PropTypes.func,
  path: PropTypes.string,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  google: PropTypes.string,
  dayOfTheWeek: PropTypes.string,
  currentDate: PropTypes.string,
};

export default memo(SinglePost);
