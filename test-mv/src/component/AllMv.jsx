import React, { useEffect, useState } from "react";
import Star from "../assets/star.png";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const AllMv = () => {
  const [keyword, setKeyword] = useState(undefined);
  const [sort, setSort] = useState("top_rated");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${sort}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(true);
      });
  }, [sort]);

  const loadMore = () => {
    if (keyword == undefined) {
      fetch(
        `https://api.themoviedb.org/3/movie/${sort}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=${
          pageNumber + 1
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies([...movies, ...data.results]);
        });

      setPageNumber(pageNumber + 1);
    } else {
      if (pageNumber < totalPages) {
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&query=${keyword}&page=${
            pageNumber + 1
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            setMovies([...movies, ...data.results]);
          });

        setPageNumber(pageNumber + 1);
      }
    }
  };
  const goToSearch = () => {
    setLoading(false);
    setPageNumber(1);
    if (keyword.trim().length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&query=${keyword}&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          if (data.total_pages) {
            setTotalPages(data.total_pages);
          }
          setLoading(true);
        });
    }
  };

  return (
    <>
      <div className="pt-32  ">
        <h1 className="text-white text-md  mb-8 container mx-auto">
          All Movies
        </h1>
        <div className="movie-search">
          <input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="small" onClick={goToSearch}>
            Search
          </button>
        </div>

        {
          <div>
            {loading ? (
              movies.length !== 0 && (
                <div className="w-full   flex-wrap flex text-white items-center justify-center  ">
                  {movies.map((movie, index) => {
                    if (movie.poster_path != null) {
                      return (
                        <Link
                          to={`/movieInfo/${movie.id}`}
                          key={index}
                          className=" mx-4 mb-14 flex text-white  justify-center  "
                        >
                          <div className="w-64  ">
                            <div className=" w-ful mb-2">
                              <img
                                className="w-100%  rounded-sm"
                                src={movie.poster_path != null && `https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt=""
                              />
                            </div>
                            <h1 className="h-10 mb-2">
                              {movie.original_title}
                            </h1>
                            <div className="flex  items-center justify-between px-1">
                              <div className="flex items-center ">
                                <img src={Star} className="w-6 " alt="" />
                                <p className="mx-1 ">{movie.vote_average}</p>
                              </div>
                              <span className="border rounded-xl text-[10px] p-1 ">
                                {movie.release_date}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  })}
                  <button onClick={loadMore}>See more</button>
                </div>
              )
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
        }
      </div>
    </>
  );
};

export default AllMv;
