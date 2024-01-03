import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app, { usersRef } from "../firebase/firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

// authenticate app
const auth = getAuth(app);

const Signup = () => {
  // signin form data
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // send otp state
  const [sentOTP, setSentOTP] = useState(false);

  // verify otp state
  const [OTP, setOTP] = useState("");

  // navigate to other page
  const navigate = useNavigate();

  // function to generate captcha
  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "captcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  // request otp by mobile number
  const requestOtp = () => {
    setLoading(true);

    // captcha generate
    generateRecapcha();

    let appVarifier = window.recaptchaVerifier;

    // sign in with mobile
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVarifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        // otp send message
        swal({
          text: "OTP Sent..!",
          icon: "success",
          buttons: false,
          timer: 3000,
        });

        setSentOTP(true);

        setLoading(false);
      })
      .catch((e) => {
        // show error
        swal({ text: e.message, icon: "error", buttons: false, timer: 2000 });
      });
  };

  // otp verification function
  const verifyOTP = () => {
    try {
      setLoading(true);

      // verify otp
      window.confirmationResult.confirm(OTP).then((result) => {
        // upload user data into database
        uploadData();

        // register success message
        swal({
          text: "Registered Successfully..!",
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        // navigate to login page
        navigate("/login");

        setLoading(false);
      });
    } catch (error) {
      // otp verify fail message
      swal({ text: error, icon: "error", buttons: false, timer: 2000 });
    }
  };

  // function to upload user data into database
  const uploadData = async () => {
    // password salting
    const salt = bcrypt.genSaltSync(10);

    // hashing password
    const hash = bcrypt.hashSync(form.password, salt);

    // save data into database
    await addDoc(usersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile,
    });
  };

  return (
    <section className="text-gray-600 body-font relative lg:px-96 md:px-56 px-8">
      <div className="py-4 bg-gray-600 md:mt-8 mt-20 mx-10 rounded-lg">
        {/* heading */}
        <div className="flex flex-col text-center w-full mt-5 mb-1">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-lime-500">
            Sign Up
          </h1>
        </div>
        <div className="lg:w-3/4 md:w-3/4 w-3/4 mx-auto">
          <div className="flex flex-wrap -m-2">
            {sentOTP ? (
              // otp form
              <div className="w-full">
                {/* otp field */}
                <div className="px-2 w-full">
                  <div className="relative">
                    {/* label */}
                    <label
                      for="name"
                      className="leading-7 text-sm text-gray-300 font-bold"
                    >
                      OTP
                    </label>

                    {/* input */}
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      placeholder="Fill OTP"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="pt-8 pb-3 w-full">
                  {/* otp verification button */}
                  <button
                    onClick={verifyOTP}
                    className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                  >
                    {loading ? (
                      <TailSpin height={20} width={20} color="white" />
                    ) : (
                      "Confirm OTP"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // user details form
              <div className="w-full">
                {/* name */}
                <div className="px-2 w-full">
                  <div className="relative">
                    <label
                      for="name"
                      className="leading-7 text-sm text-gray-300 font-bold"
                    >
                      Name
                    </label>

                    {/* name field */}
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                {/* mobile */}
                <div className="px-2 w-full mt-4">
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
                      onChange={(e) =>
                        setForm({ ...form, mobile: e.target.value })
                      }
                      placeholder="Enter mobile no"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                {/* password */}
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
                      type={"password"}
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
                  {/* otp send button */}
                  <button
                    onClick={requestOtp}
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    {loading ? (
                      <TailSpin height={20} width={20} color="white" />
                    ) : (
                      "Request OTP"
                    )}
                  </button>
                </div>

                {/* login page link for already registered users */}
                <div className="p-2 w-full pt-3 mt-3 border-t border-gray-200 text-center my-3">
                  <p className="font-medium text-white">
                    Already have an account ?
                    <span>
                      <Link className="text-blue-500 ml-2" to={"/login"}>
                        Login Now
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* captcha container */}
        <div id="captcha-container"></div>
      </div>
    </section>
  );
};

export default Signup;
