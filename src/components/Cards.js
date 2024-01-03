import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  // movie data
  const [data, setData] = useState([]);

  // loading screen
  const [loading, setLoading] = useState(false);

  // getting data from firebase
  useEffect(() => {
    async function getData() {
      setLoading(true);

      // fetch data
      const _data = await getDocs(moviesRef);

      // store into array
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });

      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {/* loading screen logic  */}
      {loading ? (
        <div className="flex w-full justify-center items-center min-h-96">
          <RotatingLines width={70} strokeColor="white" />
        </div>
      ) : (
        // rendering list with dynamic data
        data.map((e, i) => {
          return (
            <Link to={`/details/${e.id}`}>
              <div
                key={i}
                className="bg-zinc-900 shadow-xl p-1 hover:-translate-y-2 cursor-pointer font-medium mt-3 transition-all duration-500 rounded"
              >
                {/* image */}
                <img className="h-60 md:h-72" src={e.imageUrl} alt="" />

                {/* name */}
                <h1>
                  <span className="text-gray-500">Name:</span> {e.title}
                </h1>

                {/* rating */}
                <h1 className="flex items-center">
                  <span className="text-gray-500 mr-1">Rating:</span>

                  {/* show rating using react stars */}
                  <ReactStars
                    size={20}
                    half={true}
                    count={5}
                    edit={false}
                    color1="#bdbdbd"
                    color2="#00e676"
                    value={e.rating / e.rated}
                  />
                </h1>

                {/* year */}
                <h1>
                  <span className="text-gray-500">Year:</span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
