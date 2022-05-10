import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";

const SinglePost = () => {
  const [updateMode, setUpdatedMode] = useState(false);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
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
  }, [path]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "city-stade", path));
    } catch (err) {
      console.log(err);
    }
  };
  console.log("postte", post);

  return (
    <>
      <div className="bg-white shadow-2xl px-4 py-10">
        <div className="">
          <img
            className="w-full h-96 rounded-lg rounded-b-none object-center object-cover"
            src={post.image}
            alt="city stade"
          />
          <div className="px-4 py-2 mt-2 ">
            <button
              onClick={handleDelete}
              className="bg-red-500 p-2 text-white rounded-md">
              delete
            </button>
            <>
              <h1 className="font-bold  text-2xl lg:text-4xl md:text-3xl  text-gray-800 text-center">
                City stade du {post.title}
              </h1>
            </>

            <div className="items-center mt-4">
              <>
                <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 ">
                  <span className="text-gray-400"> Addresse:</span>{" "}
                  {post.address}
                </p>
              </>

              <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 ">
                <span className="text-gray-400"> Description:</span>{" "}
                {post.description}
              </p>

              <>
                <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 ">
                  <span className="text-gray-400"> Type de Terrain:</span>{" "}
                  {post.pitch}
                </p>
              </>

              <>
                <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                  <span className="text-gray-400">
                    {" "}
                    Type d'éclairage (nuit):
                  </span>{" "}
                  {post.light}
                </p>
              </>

              <>
                <p className="bg-gray-50  text-gray-900  text-base md:text-2xl sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 ">
                  <span className="text-gray-400">
                    {" "}
                    Type de chaussure (recommendé):
                  </span>{" "}
                  {post.shoes}
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
