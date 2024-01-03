import { addDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { movieRef, reviewsRef } from "../firebase/firebase";
import swal from "sweetalert";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AppState } from "../App";

const Review = ({ movieid, prevRating, userRated }) => {
  // loader
  const [loading, setLoading] = useState(false);

  const appLogin = useContext(AppState);

  // add review form data
  const [form, setForm] = useState({
    movieId: movieid,
    name: appLogin.userName,
    rating: 0,
    thought: "",
    timestamp: new Date().getTime(),
  });

  // review loader
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // add review into firestore
  const addReview = async () => {
    setLoading(true);

    // add data
    await addDoc(reviewsRef, form);

    // update movie data
    await updateDoc(movieRef(movieid), {
      rating: form.rating + prevRating,
      rated: userRated + 1,
    });

    // success message
    swal({
      title: "Review Sent Successfully..!!",
      text: "Thanks for sharing..!",
      icon: "success",
      buttons: false,
      timer: 3000,
      className: "p-4",
    });

    setLoading(false);
  };

  // get all ratings from database
  useEffect(() => {
    const getReviews = async () => {
      setReviewsLoading(true);

      // create query for getting all ratings by movie id
      let q = query(reviewsRef, where("movieId", "==", movieid));

      // get data using query
      const querySnapshot = await getDocs(q);

      // load data
      querySnapshot.forEach((doc) => {
        setReviews((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    };

    getReviews();
  }, []);

  return (
    <div className="mt-6 w-full border-t-2 border-gray-400">
      {/* rating input field */}
      <ReactStars
        size={40}
        half={true}
        count={5}
        edit={true}
        value={form.rating}
        color1="#bdbdbd"
        color2="#00e676"
        onChange={(newRating) => setForm({ ...form, rating: newRating })}
      />

      {/* review input field */}
      <input
        type="text"
        placeholder="Share your thoughts..."
        className="w-full p-2 outline-none bg-slate-600 rounded-md h-20"
        onChange={(e) => setForm({ ...form, thought: e.target.value })}
        value={form.thought}
      />

      {/* share review button */}
      <button
        onClick={addReview}
        className="mt-2 p-2 w-full bg-green-500 hover:bg-green-700 rounded-md uppercase duration-500 font-medium flex justify-center"
      >
        {/* button loading logic */}
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {/* review loading logic */}
      {reviewsLoading ? (
        <div className="mt-3 flex justify-center">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {reviews.map((item, i) => {
            return (
              // single review card
              <div
                key={i}
                className="bg-zinc-900 rounded-sm text-xs mt-2 p-2 w-full border-b-2 border-slate-500"
              >
                {/* user name */}
                <p className="text-gray-400 capitalize font-medium mb-2">
                  {item.name}

                  {/* review date and time */}
                  <span className="ml-3 text-yellow-200 uppercase">
                    [ {new Date(item.timestamp).toLocaleString()} ]
                  </span>
                </p>

                {/* rating */}
                <ReactStars
                  size={17}
                  half={true}
                  count={5}
                  edit={false}
                  color1="#bdbdbd"
                  color2="#00e676"
                  value={item.rating}
                />

                {/* review thought */}
                <h1 className="text-lg text-white mt-1">{item.thought}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
