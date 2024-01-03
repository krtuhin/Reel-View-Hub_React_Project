import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import { AppState } from "../App";

const Login = () => {
  // context api to access data
  const appLogin = useContext(AppState);

  // navigator
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: null,
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // login function
  const doLogin = async () => {
    setLoading(true);
    try {
      // create query
      const q = query(usersRef, where("mobile", "==", form.mobile));

      // query result
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        // get document from result
        const _data = doc.data();

        // set user by matching password
        const isUser = bcrypt.compareSync(form.password, _data.password);

        if (isUser) {
          // set data into context api
          appLogin.setLogin(true);
          appLogin.setUserName(_data.name);

          // success message
          swal({
            title: `Welcome ${_data.name}..!!`,
            text: "Logged In",
            icon: "success",
            buttons: false,
            timer: 2000,
          });

          // navigate to home page
          navigate("/");
        } else {
          // error message
          swal({
            text: "Invalid Credential",
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        }
      });
    } catch (error) {
      // internal error message
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 2000,
      });
    }

    setLoading(false);
  };

  return (
    <section className="text-gray-600 body-font relative lg:px-96 md:px-56 px-8">
      <div className="py-4 bg-gray-600 md:mt-10 mt-20 mx-10 rounded-lg">
        {/* heading */}
        <div className="flex flex-col text-center w-full mt-5 mb-1">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-lime-500">
            Login Here!
          </h1>
        </div>
        <div className="lg:w-3/4 md:w-3/4 w-3/4 mx-auto">
          <div className="flex flex-wrap -m-2">
            {/* mobile number */}
            <div className="px-2 w-full">
              <div className="relative">
                <label
                  for="name"
                  className="leading-7 text-sm text-gray-300 font-bold"
                >
                  Mobile No.
                </label>

                {/* mobile field */}
                <input
                  type="number"
                  id="name"
                  name="name"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="Enter mobile no"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            {/* password field */}
            <div className="px-2 w-full mt-4">
              <div className="relative">
                <label
                  for="email"
                  className="leading-7 text-sm text-gray-300 font-bold"
                >
                  Password
                </label>

                {/* password field */}
                <input
                  type={"text"}
                  id="email"
                  name="email"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter password"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="pt-8 pb-3 w-full">
              {/* login button */}
              <button
                onClick={doLogin}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {loading ? (
                  <TailSpin height={20} width={20} color="white" />
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* sign up page link for new user */}
            <div className="p-2 w-full pt-3 mt-3 border-t border-gray-200 text-center my-3">
              <p className="font-medium text-white">
                Do not have account ?
                <span>
                  <Link className="text-blue-500 ml-2" to={"/signup"}>
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
