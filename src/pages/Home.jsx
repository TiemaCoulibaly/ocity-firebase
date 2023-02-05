import { memo, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Posts from "../components/Posts";
import Header from "../components/Header.tsx";
import SearchCity from "../components/SearchCity.tsx";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
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
        <Spinner
          heightScreen={"h-screen"}
          justify={"center"}
          width={16}
          height={16}
        />
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
