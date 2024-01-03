import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import { RotatingLines } from "react-loader-spinner";
import Review from "./Review";

const Detail = () => {
  // get data from url
  const { id } = useParams();

  // loader
  const [loading, setLoading] = useState(false);

  // single movie data
  const [data, setData] = useState({
    title: "",
    description: "",
    rating: 0,
    imageUrl: "",
    year: "",
    rated: 0,
  });

  // get single data from firebase
  useEffect(() => {
    async function getData() {
      setLoading(true);

      // get data using id
      const _data = await getDoc(movieRef(id));

      setData(_data.data());

      setLoading(false);
    }

    getData();
  }, []);

  // loading logic
  return loading ? (
    <div className="flex justify-center items-center min-h-96 w-full">
      <RotatingLines width={60} strokeColor="white" />
    </div>
  ) : (
    <div className="p-4 mt-4 flex w-full justify-center flex-col md:flex-row  md:items-start items-center">
      {/* movie image */}
      <img className="h-96 block md:sticky top-28" src={data.imageUrl} alt="" />
      <div className="md:ml-4 ml-0 mt-2 md:mt-0 w-full md:w-1/2">
        {/* movie name and year */}
        <h1 className="text-3xl font-bold text-gray-400">
          {data.title} <span className="text-xl">({data.year})</span>
        </h1>

        {/* rating */}
        <ReactStars
          size={26}
          half={true}
          count={5}
          edit={false}
          color1="#bdbdbd"
          color2="#00e676"
          value={data.rating / data.rated}
        />

        {/* description */}
        <p className="mt-2 text-justify">{data.description}</p>

        {/* add review component */}
        <Review movieid={id} prevRating={data.rating} userRated={data.rated} />
      </div>
    </div>
  );
};

export default Detail;
