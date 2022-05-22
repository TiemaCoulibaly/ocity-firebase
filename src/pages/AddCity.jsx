import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
const AddCity = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const { currentUser } = useContext(AuthContext);

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
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      username: currentUser.displayName,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "city-stade"), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      window.location.replace("/post/" + docRef.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-3">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-2">
            Ajouter un city stade
          </h2>
        </div>

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

        <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
                name="pitch"
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
            className="group relative w-full flex justify-center p-3 mb-5 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
