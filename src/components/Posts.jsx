import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Post from "./Post";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState("");
  const itemsPerPage = 6;

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

  return (
    <section className="w-full px-6 py-8 bg-gray-100">
      <div className="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 gap-6 md:grid-cols-1 sm:grid-cols-1">
        {currentItems?.map((post, key) => {
          return <Post key={key} post={post} />;
        })}
      </div>

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
          currentPage === itemOffset + 1 && "bg-green-300"
        }`}
      />
    </section>
  );
};
Posts.propTypes = {
  currentItems: PropTypes.array,
  pageCount: PropTypes.number,
  itemOffset: PropTypes.number,
  currentPage: PropTypes.string,
  itemsPerPage: PropTypes.number,
  handlePageClick: PropTypes.func,
};
export default memo(Posts);
