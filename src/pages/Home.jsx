import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Posts from "../components/Posts";
import Header from "../components/Header";
import SearchCity from "../components/SearchCity";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // LISTEN TO REALTIME UPDATE
    const unsub = onSnapshot(
      collection(db, "city-stade"),
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

  const filteredPost = posts.filter((val) =>
    val.address.toLowerCase().includes(searchTerm.toLowerCase())
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
            <SearchCity searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex">
              {<Posts posts={filteredPost} date={date} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
