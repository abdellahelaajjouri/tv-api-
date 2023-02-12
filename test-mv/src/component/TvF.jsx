import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Play from "../assets/jouer.png";
import Star from "../assets/star.png";
import ReactPlayer from "react-player";

import { ThreeDots } from "react-loader-spinner";

const TvF = () => {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tv, setTv] = useState();
  const [tvTrailer, setTvTrailer] = useState({});
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setLoading(false);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setTv(data);
        setLoading(true);
      });

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
      });
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarMovies(data.results.slice(0, 8));
      });

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0]);
        setTvTrailer(data.results[0]);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <div>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
            }}
            className="  text-white w-full md:h-[100vh] h-[1200px]  bg-cover bg-center  relative overflow-hidden"
          >
            <div className=" absolute md:top-[30%] top-[10%]  md:left-[5%] left-1 md:w-[1000px] w-96  h-[300px] items-center     flex md:flex-nowrap flex-wrap justify-center  container mx-auto">
              <img
                className="shadow-2xl h-96 md:w-96 w-80 rounded-xl md:mx-10 mx-0"
                src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                alt=""
              />
              <div className="">
                <h1
                  style={{
                    textShadow:
                      "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
                  }}
                  className="mx-2 my-3 text-4xl"
                >
                  {tv.name}
                </h1>
                <div className="flex mb-2 items-center  ">
                  {tv.genres &&
                    tv.genres.slice(0, 5).map((genre, index) => (
                      <span
                        key={index}
                        className="text-white bg-[#D32444]  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 
                     focus:outline-none dark:focus:ring-blue-800"
                      >
                        {genre.name}
                      </span>
                    ))}
                </div>

                <p
                  style={{
                    textShadow:
                      "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
                  }}
                  className="text-gray-100 drop-shadow-2xl"
                >
                  {tv.overview}
                </p>
                <div className="flex md:mb-4 mb-1 items-center  px-1">
                  <div className="flex items-center ">
                    <img src={Star} className="w-6 " alt="" />
                    <p className="mr-3 ml-1 ">
                      {tv.vote_average == null ? "8.6" : tv.vote_average}
                      <span className="text-gray-500">/10</span>
                    </p>
                  </div>

                  <span className="border rounded-xl px-2">{}</span>
                </div>
                <div>
                  <div className="flex w-max  items-center">
                    <button
                      type="button"
                      onClick={() => {
                        // Toggle the visibility of the dropdown menu
                        setHide(!hide);
                        console.log(hide);
                      }}
                      className="text-gray-300 bg-transparent h-10 mx-2 border border-gray-100 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 "
                    >
                      <img
                        src={Play}
                        className="w-8  mr-2 -ml-1"
                        alt="profile"
                      />
                      Watch Trailer
                    </button>
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
              {tvTrailer != undefined ? (
                <ReactPlayer
                  className="relative react-player"
                  url={
                    tvTrailer &&
                    `https://www.youtube.com/embed/${tvTrailer.key}`
                  }
                  controls
                />
              ) : (
                <p style={{ color: "white" }}>No Trailer available</p>
              )}
            </div>
          </div>
          <div className="">
            <h1 className="text-[#D32444] text-[30px]">Top casT</h1>
            <div className="flex flex-wrap justify-center">
              {loading ? (
                cast.slice(0, 5).map((ca, index) => {
                  return (
                    <div
                      key={index}
                      className="w-96 my-2 p-2 flex  items-center"
                    >
                      <img
                        className="w-20 h-20 rounded-full mx-10"
                        src={`https://image.tmdb.org/t/p/original${ca.profile_path}`}
                        alt=""
                      />
                      <div className="text-[#99988b]">
                        <h1 className="text-gray-100">{ca.name}</h1>
                        <p>{ca.character}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#D32444"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              )}
            </div>
          </div>
          <div className="section mb-3">
            <div className="section__header mb-2">
              <h2>Similar Movies</h2>
            </div>
            <div className="w-full   flex-wrap flex text-white items-center justify-center  ">
              {similarMovies.map((movie, index) => {
                if (movie.poster_path != null) {
                  return (
                    <Link
                      to={`/TvF/${movie.id}`}
                      key={index}
                      className=" mx-4 mb-14 flex text-white  justify-center  "
                    >
                      <div className="w-64  ">
                        <div className=" w-ful mb-2">
                          <img
                            className="w-100%  rounded-sm"
                            src={
                              movie.poster_path != null &&
                              `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            }
                            alt=""
                          />
                        </div>
                        <h1 className="h-10 mb-2">{movie.name}</h1>
                        <div className="flex  items-center justify-between px-1">
                          <div className="flex items-center ">
                            <img src={Star} className="w-6 " alt="" />
                            <p className="mx-1 ">{movie.vote_average}</p>
                          </div>
                          <span className="border rounded-xl text-[10px] p-1 ">
                            {movie.first_air_date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#D32444"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </>
  );
};

export default TvF;
