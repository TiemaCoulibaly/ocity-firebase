import React, { memo, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Posts from "../components/Posts";
import Header from "../components/Header.tsx";
import SearchCity from "../components/SearchCity";
import PropTypes from "prop-types";
// import QueryAddress from "../components/QueryAddress";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    //Collection docRef
    const colRef = collection(db, "city-stade");
    //Query
    const q = query(colRef, orderBy("timeStamp", "desc"));

    // Listen to realtime update
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let lists = [];
        snapShot.docs.forEach((doc) => {
          lists.push({ id: doc.id, ...doc.data() });
        });
        setPosts(lists);
        setDate(lists);
        setIsLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const filteredPost = posts?.filter((val) =>
    val?.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 h-screen">
          <div className="spinner-border animate-spin  w-10 h-10 lg:w-16 lg:h-16 md:w-16 md:h-16 border-t-2 border-b-2 rounded-full border-green-600"></div>
        </div>
      ) : (
        <>
          <Header />
          <div className="mt-4 bg-gray-100">
            {/* <div className="flex justify-center">
              <QueryAddress address={searchTerm} setAddress={setSearchTerm} />
            </div> */}
            <SearchCity searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {<Posts posts={filteredPost} date={date} />}
          </div>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  posts: PropTypes.array,
  date: PropTypes.array,
  isLoading: PropTypes.bool,
  searchTerm: PropTypes.string,
};

export default memo(Home);
