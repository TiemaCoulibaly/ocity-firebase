import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <section className="w-full px-6 py-12 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:grid-cols-1">
        {posts.map((post, key) => {
          return <Post key={key} post={post} />;
        })}
      </div>
    </section>
  );
};

export default Posts;
