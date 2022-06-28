import { Link } from "react-router-dom";
import CarouselImages from "./CarouselImages";

const Post = ({ post }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full lg:w-2/4 md:w-2/4 h-80">
            <div className="relative w-full mx-auto">
              <CarouselImages
                heightImage={100}
                widthImage={100}
                arrow={7}
                top={32}
                pictures={post.pictures}
              />
            </div>
          </div>

          <div className="p-4  w-full md:w-2/5 text-left">
            <Link to={`/post/${post.id}`}>
              <div className="flex items-center">
                <p className="text-base text-gray-400 font-normal">
                  Posté par: {post.username}
                </p>
              </div>

              <p className="my-2 text-xl text-green-900 font-bold">
                City Stade du {post.title}
              </p>

              <p className="my-2 text-base text-gray-500 font-normal">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span className="text-gray-600">Adresse:</span> {post.address}
              </p>

              <hr className="mt-7 h-1 w-20 bg-green-300 " />
              <p className="text-base text-gray-400 italic">
                Posté le:
                {new Date(
                  post.timeStamp.toDate().toString()
                ).toLocaleDateString("fr-FR", options)}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap my-3 justify-start lg:justify-around md:justify-around">
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post.pitch}
          </p>
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post.light}
          </p>
          <p className="mx-2 p-2 mt-2 rounded-full bg-green-100 text-green-700">
            # {post.shoes}
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
