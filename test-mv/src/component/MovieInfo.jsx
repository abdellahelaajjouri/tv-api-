import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Play from "../assets/jouer.png";
import Star from "../assets/star.png";
import Quiter from "../assets/retirer.png";
import ReactPlayer from "react-player";

const MovieInfo = () => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0]);
        setMovieTrailer(data.results[0]);
      });
  }, []);
  const { id } = useParams();
  const [hide, setHide] = useState(false);
  const [movie, setMovie] = useState([]);
  const url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const [movieTrailer, setMovieTrailer] = useState({});

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${url})`,
        }}
        className="  text-white w-full md:h-[100vh] h-[1200px]  bg-cover bg-center  relative overflow-hidden"
      >
        <div
          className=" absolute md:top-[30%] top-[10%]  md:left-[5%] left-1 md:w-[1000px] w-96  h-[300px] items-center     flex md:flex-nowrap flex-wrap justify-center  container mx-auto"
          
        >
          <img
            className="shadow-2xl h-96 md:w-80 w-80 rounded-xl md:mx-10 mx-0"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
          />
          <div className="">
            <h1
              style={{
                textShadow: "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
              }}
              className="mx-2 my-3 text-4xl"
            >
              {movie.original_title}
            </h1>
            <p
              style={{
                textShadow: "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
              }}
              className="text-gray-100 drop-shadow-2xl"
            >
              {movie.overview}
            </p>
            <div className="flex md:mb-4 mb-1 items-center  px-1">
              <div className="flex items-center ">
                <img src={Star} className="w-6 " alt="" />
                <p className="mr-3 ml-1 ">
                  {}
                  <span>
                    {movie.vote_average == null ? "8.6" : movie.vote_average}
                  </span>
                </p>
              </div>
              <span className="border rounded-xl px-2">{}</span>
            </div>
            <div>
              <div className="flex w-max  items-center">
                <button
                  onClick={() => {
                    // Toggle the visibility of the dropdown menu
                    setHide(!hide);
                    console.log(hide);
                  }}
                  type="button"
                  className="text-gray-300 bg-transparent h-10 mx-2 border border-gray-100 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 "
                >
                  <img src={Play} className="w-8  mr-2 -ml-1" alt="profile" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          hide === false
            ? "hidden "
            : " block  w-full md:h-full h-[1200px] flex justify-center items-center absolute top-0 backdrop-blur-sm bg-black/60"
        }
        onClick={() => {
            // Toggle the visibility of the dropdown menu
            setHide(!hide);
          }}
      >
        <ReactPlayer
          className="relative react-player"
          url={
            movieTrailer &&
            `https://www.youtube.com/watch?v=${movieTrailer.key}`
          }
          controls
        />
      </div>
    </>
  );
};

export default MovieInfo;
