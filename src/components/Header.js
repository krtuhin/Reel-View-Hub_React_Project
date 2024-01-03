import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppState } from "../App";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Header = () => {
  const appLogin = useContext(AppState);

  return (
    <div className="sticky top-0 z-10 bg-neutral-900 text-white text-3xl font-bold p-3 border-b-2 border-gray-500 flex justify-between items-center">
      {/* link for home page */}
      <Link to={"/"}>
        <span>
          Reel <span className="text-red-400">View</span> Hub
        </span>
      </Link>

      {!appLogin.login ? (
        <Link to={"/login"}>
          <div className="uppercase text-white bg-emerald-500 hover:bg-emerald-700 transition-all duration-300 rounded font-medium text-sm px-5 py-2 m-1 flex justify-center items-center">
          <PersonAddAltIcon /><span className="ml-1">
            login
            </span>
          </div>
        </Link>
      ) : (
        // link for add movie form
        <Link to={"/add-movie"}>
          <Button className="text-lg flex items-center">
            <AddIcon className="mr-1" color="info" />
            <span className="text-white">Add New</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
