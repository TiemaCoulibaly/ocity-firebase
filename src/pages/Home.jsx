import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Posts from "../components/Posts";
import Header from "../components/Header";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState([]);

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

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner-border animate-spin  w-10 h-10 lg:w-16 lg:h-16 md:w-16 md:h-16 border-t-2 border-b-2 rounded-full border-green-600"></div>
        </div>
      ) : (
        <div className="flex">{<Posts posts={posts} date={date} />}</div>
      )}
    </>
  );
};

export default Home;
