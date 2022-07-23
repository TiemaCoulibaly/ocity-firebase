import { memo } from "react";
import { Link } from "react-router-dom";
import CarouselImages from "./CarouselImages";

const Post = ({ post }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(post);
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden 2xl:h-72 xl:h-72 lg:h-72 md:h-72 sm:h-96">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full lg:w-2/4 md:w-2/4 2xl:h-52 xl:h-52 lg:h-96 md:h-52 sm:h-64">
            <div className="relative w-full mx-auto">
              <CarouselImages
                heightImage={65}
                widthImage={100}
                arrow={7}
                top={24}
                pictures={post?.pictures}
              />
            </div>
          </div>

          <div className="p-4  w-full md:w-2/5 text-left">
            <Link to={`/post/${post.id}`}>
              <div className="flex items-center">
                <p className="text-base text-gray-400 font-normal">
                  Posté par:{" "}
                  {post?.username.charAt(0).toUpperCase() +
                    post?.username.slice(1)}
                </p>
              </div>

              <p className="my-2 text-xl text-green-900 font-bold w-64">
                City Stade du {post.title}
              </p>

              <p className="my-2 text-base text-gray-500 font-normal w-64">
                <span className="text-gray-600 font-semibold mr-1">
                  Adresse:
                </span>

                {post.address}
              </p>

              <hr className="mt-5 h-1 w-20 bg-green-300" />
              <p className="text-base text-gray-400 italic w-64">
                Posté le:{" "}
                {new Date(
                  post.timeStamp?.toDate().toString()
                ).toLocaleDateString("fr-FR", options)}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap my-5 justify-start lg:justify-around md:justify-end">
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post?.pitch}
          </p>
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post?.light}
          </p>
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post?.shoes}
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(Post);
