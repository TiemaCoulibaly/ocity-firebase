import React, { memo, useEffect, useState, createRef } from "react";
import ReactPaginate from "react-paginate";
import Post from "./Post";
import PropTypes from "prop-types";
import MapView from "./MapView";

const Posts = ({ posts }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [childClicked, setChildClicked] = useState(null);
  const [elRefs, setElRefs] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;

    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };
  //grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 gap-6 md:grid-cols-1 sm:grid-cols-1"

  useEffect(() => {
    const refs = Array(posts.length)
      .fill()
      ?.map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, []);

  return (
    <section>
      <div className="flex justify-around px-6 py-8 bg-gray-100">
        {currentItems ? (
          <div className="w-full md:w-2/3 lg:2/3">
            {currentItems?.map((post, i) => {
              return (
                <div ref={elRefs[i]} key={i}>
                  <Post
                    post={post}
                    refProp={elRefs[i]}
                    selected={Number(childClicked === i)}
                  />
                </div>
              );
            })}

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="my-4 flex justify-center gap-3 cursor cursor-pointer"
              pageLinkClassName="p-2 rounded-md hover:bg-green-300 shadow-lg"
              previousLinkClassName="p-2 rounded-md hover:bg-green-300 shadow-lg"
              nextLinkClassName="p-2 rounded-md hover:bg-green-300 shadow-lg"
              activeLinkClassName={`p-2 rounded-md hover:bg-green-300 ${
                currentPage && "bg-green-300"
              }`}
            />
          </div>
        ) : (
          <div className="w-full md:w-2/3 lg:2/3">
            <h1 className="w-bg-red-300">
              IL NYA PAS DE CITY POUR LINSTANT...
            </h1>
          </div>
        )}
        <div className="hidden sticky top-1 mb-2 h-screen md:flex lg:flex">
          <MapView posts={currentItems} setChildClicked={setChildClicked} />
        </div>
      </div>
    </section>
  );
};
Posts.propTypes = {
  currentItems: PropTypes.array,
  pageCount: PropTypes.number,
  itemOffset: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  handlePageClick: PropTypes.func,
  elRefs: PropTypes.array,
};
export default memo(Posts);
