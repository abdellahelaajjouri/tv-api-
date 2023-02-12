import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Profil from "../assets/profil-de-lutilisateur.png";
import Star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import list from "../assets/liste.png";

const Nav = () => {
  // The useNavigate hook allows navigation to a different route within the app
  const navigate = useNavigate();

  // State to keep track of the search term entered in the search bar
  const [search, setSearch] = useState("");

  // State to keep track of the TV shows that match the search term
  const [tv, setTv] = useState([]);

  const [value, setValue] = useState("");

  // State to keep track of the visibility of the dropdown menu
  const [hide, setHide] = useState(false);
  // Fetch data from the TV Maze API using the search term
  fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => {
      // Convert the response to JSON
      return response.json();
    })
    .then((data) => {
      // Update the state with the TV shows that match the search term
      setTv(data);
    })
    .catch((err) => console.error(err));



  return (
    <>
      <div className="w-full  backdrop-blur-sm bg-black/30 fixed z-30">
        <div className="container    mx-auto p-5 md:flex flex flex-wrap items-center justify-between  ">
          <NavLink to="/">
            <p className="text-[#D32444] w-32">Logo</p>
          </NavLink>
          <NavLink to="/AllMv">
            <p className="text-[#D32444] w-32">Movies</p>
          </NavLink>
          <NavLink to="/AllMovies">
            <p className="text-[#D32444] w-32">TvShows</p>
          </NavLink>
          <NavLink to="/AnimePage">
            <p className="text-[#D32444] w-32">Anime</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
