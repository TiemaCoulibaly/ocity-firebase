import { memo } from "react";
import { Link } from "react-router-dom";
import CarouselImages from "./CarouselImages";

type PostProps = {
  post: any;
  selected: number;
  refProp: any;
  pictures: string;
};
type OptionProps = {
  weekday: "long" | "short" | "narrow";
  year: "numeric" | "2-digit" | undefined;
  month: "long" | "short" | "narrow";
  day: "numeric" | "2-digit" | undefined;
};
const Post = ({ post, selected, refProp }: PostProps) => {
  const options: OptionProps = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(post.timeStamp?.toDate().toString());

  const formattedDate = date.toLocaleDateString("en-US", options);

  //When click on marker it will render the exact item clicked
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <div
        className={`${
          selected ? "bg-green-100" : "bg-white"
        } mb-4 w-10/12 mx-auto rounded-lg shadow-lg overflow-hidden h-72 2xl:h-72 xl:h-64 lg:h-44 md:h-52 sm:h-96`}
      >
        {/* xl:w-2/3 lg:w-4/5 md:w-3/3 */}
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full lg:w-2/4 md:w-2/4 ">
            {/* 2xl:h-52 xl:h-52 lg:h-96 md:h-52 sm:h-64 */}
            <div className="relative w-full mx-auto 2xl:h-52 xl:h-44 lg:h-60 md:h-52 ">
              <CarouselImages
                heightImage={50}
                widthImage={100}
                arrow={7}
                top={16}
                pictures={post?.pictures}
              />
            </div>
          </div>

          <div className="px-2 w-full md:w-2/5 text-left">
            <Link to={`/post/${post.id}`}>
              <div className="flex items-center">
                <p className="mt-2 text-base text-gray-400 font-normal">
                  Posté par:{" "}
                  {post?.username.charAt(0).toUpperCase() +
                    post?.username.slice(1)}
                </p>
              </div>

              <p className="my-2 text-xl text-green-900 font-bold w-64">
                City Stade {post.title}
              </p>

              <p className="my-2 text-base text-gray-500 font-normal w-64">
                <span className="text-gray-600 font-semibold mr-1">
                  Adresse:
                </span>

                {post.address}
              </p>

              <hr className="mt-3 h-1 w-20 bg-green-300" />
              <p className="text-base text-gray-400 italic w-64">
                Posté le: {formattedDate}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap my-1 justify-start lg:justify-around md:justify-end">
          <p
            className={`mx-2 p-2 mt-2 rounded-full  text-green-700 ${
              selected ? "bg-white" : "bg-green-100"
            }`}
          >
            # {post?.pitch}
          </p>
          <p
            className={`mx-2 p-2 mt-2 rounded-full  text-green-700 ${
              selected ? "bg-white" : "bg-green-100"
            }`}
          >
            # {post?.light}
          </p>
          <p
            className={`mx-2 p-2 mt-2 rounded-full  text-green-700 ${
              selected ? "bg-white" : "bg-green-100"
            }`}
          >
            # {post?.shoes}
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(Post);
