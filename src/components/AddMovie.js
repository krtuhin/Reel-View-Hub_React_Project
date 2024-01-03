import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import swal from "sweetalert";

// form control
const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    imageUrl: "",
    description: "",
    rated: 0,
    rating: 0,
  });

  // loading screen
  const [loading, setLoading] = useState(false);

  // add data into firebase
  const addMovie = async () => {
    setLoading(true);

    // add data
    await addDoc(movieRef, form);

    // sweet alert function
    swal({
      title: "Added Successfully..!!",
      icon: "success",
      buttons: false,
      timer: 2000,
      className: "py-4",
    });

    setLoading(false);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-8 mx-auto">
        {/* add movie title */}
        <div className="flex flex-col text-center w-full mb-2">
          <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
            Add Movie
          </h1>
        </div>

        {/* input fields */}
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            {/* title field */}
            <div className="p-2 w-1/2">
              <div className="relative">
                {/* label */}
                <label
                  for="name"
                  className="leading-7 text-sm text-gray-300 font-medium"
                >
                  Title
                </label>

                {/* input */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* year field */}
            <div className="p-2 w-1/2">
              <div className="relative">
                {/* label */}
                <label
                  for="email"
                  className="leading-7 text-sm text-gray-300 font-medium"
                >
                  Year
                </label>

                {/* input */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* image url field */}
            <div className="p-2 w-full">
              <div className="relative">
                {/* label */}
                <label
                  for="email"
                  className="leading-7 text-sm text-gray-300 font-medium"
                >
                  Image URL
                </label>

                {/* input */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* description field */}
            <div className="p-2 w-full">
              <div className="relative">
                {/* label */}
                <label
                  for="message"
                  className="leading-7 text-sm text-gray-300 font-medium"
                >
                  Description
                </label>

                {/* input */}
                <textarea
                  id="message"
                  name="message"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>

            {/* add button */}
            <div className="p-2 w-full">
              <button
                onClick={addMovie}
                className="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-all duration-200"
              >
                {/* loading button logic */}
                {loading ? <TailSpin height={25} color="white" /> : "ADD"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
