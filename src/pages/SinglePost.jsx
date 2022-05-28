import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Map";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";

const SinglePost = () => {
  const [updateMode, setUpdatedMode] = useState(false);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState("");
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
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
    console.log("dataaak", data);
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
      console.log(updatePost);
      window.location.replace("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="bg-white shadow-2xl px-4 py-10">
        <div className="">
          <img
            className="w-full h-96 rounded-lg rounded-b-none object-center object-cover"
            src={post.image}
            alt="city stade"
          />
          {/* Only same user could edit or delete is own post */}
          {currentUser?.displayName === post?.username && (
            <div className="flex justify-center py-2">
              <button
                className="bg-blue-300 mx-5 p-2 hover:bg-blue-400 rounded"
                onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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
                className="mx-5 bg-red-300 hover:bg-red-400 p-2 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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

          <div className="px-4 py-2 mt-2 ">
            {/* HANDLE DELETE */}
            {showModal ? (
              <>
                {/* Delete Product Modal  */}
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-6 lg:mx-auto md:mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col  w-full bg-white outline-none focus:outline-none p-2 lg:p-10 md:p-8">
                      {/*body*/}
                      <div className="p-6 pt-0 text-center">
                        <svg
                          className="mx-auto mb-4 w-14 h-14 text-green-600 dark:text-gray-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this City?
                        </h3>
                        <button
                          data-modal-toggle="popup-modal"
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          onClick={handleDelete}>
                          Yes, I'm sure
                        </button>
                        <button
                          data-modal-toggle="popup-modal"
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border-2 border-green-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                          onClick={() => setShowModal(false)}>
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

            {/* END HANDLE DELETE */}

            {!updateMode ? (
              <>
                <h1 className="font-bold  text-2xl lg:text-4xl md:text-3xl  text-gray-800 text-center">
                  City stade du {post.title}
                </h1>
                <section className="flex justify-between">
                  <div className="mt-4">
                    <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 ">
                      <span className="text-gray-400"> Addresse:</span>{" "}
                      {post.address}
                    </p>

                    <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 ">
                      <span className="text-gray-400"> Description:</span>{" "}
                      {post.description}
                    </p>

                    <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 ">
                      <span className="text-gray-400"> Type de Terrain:</span>{" "}
                      {post.pitch}
                    </p>

                    <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <span className="text-gray-400">
                        {" "}
                        Type d'éclairage (nuit):
                      </span>{" "}
                      {post.light}
                    </p>

                    <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 ">
                      <span className="text-gray-400">
                        {" "}
                        Type de chaussure (recommendé):
                      </span>{" "}
                      {post.shoes}
                    </p>
                  </div>
                  {/* <Map /> */}
                </section>
              </>
            ) : (
              <>
                {file && (
                  <div className=" flex justify-center rounded-lg rounded-b-none object-center object-cover">
                    {" "}
                    <img
                      className="w-full object-cover object-center rounded-xl "
                      src={URL.createObjectURL(file)}
                      alt="city"
                      required
                    />
                  </div>
                )}
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

                <p className="flex justify-center p-2 mb-2 bg-red-100 font-semibold rounded-md">
                  Entrez l'adresse du city stade
                </p>

                <textarea
                  placeholder="decris le city stade et comment y accéder.."
                  type="text"
                  className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
                  id="description"
                  name="description"
                  onChange={handleChange}></textarea>

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
                      <option value="Éclairée de nuit">Éclairée de nuit</option>
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

                <button
                  disabled={progress !== null && progress < 100}
                  onClick={handleUpdate}
                  className="group relative w-full flex justify-center p-3 mb-5 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit">
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
