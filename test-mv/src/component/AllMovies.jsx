import React, { useState, useEffect } from "react";
// import { InfinitySpin  } from 'react-loader-spinner'
import Star from "../assets/star.png";
import { useNavigate, Link } from "react-router-dom";

import { ThreeDots } from "react-loader-spinner";

const AllMovies = () => {
  const [keyword, setKeyword] = useState(undefined);
  const [sort, setSort] = useState("top_rated");
  const [allTvShows, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${sort}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAll(data.results);
        setLoading(true);
      });
  }, [sort]);

  const loadMore = () => {
    if (keyword == undefined) {
      fetch(
        `https://api.themoviedb.org/3/tv/${sort}?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=${
          pageNumber + 1
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setAll([...allTvShows, ...data.results]);
        });

      setPageNumber(pageNumber + 1);
    } else {
      if (pageNumber < totalPages) {
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&query=${keyword}&page=${
            pageNumber + 1
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            setAll([...allTvShows, ...data.results]);
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
        `https://api.themoviedb.org/3/search/tv?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&query=${keyword}&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setAll(data.results);
          if (data.total_pages) {
            setTotalPages(data.total_pages);
          }
          setLoading(true);
        });
    }
  };

  return (
    <>
      <div className="pt-32 mb-5  ">
        {/* <InfinitySpin width='200'color="#4fa94d"/> */}
        <div className="flex items-center mb-5 justify-between flex-wrap container mx-auto">
          <h1 className="text-white text-md w-32   ">All Tv Show </h1>
        </div>
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

        <div>
          {loading ? (
            allTvShows.length !== 0 && (
              <div>
                <div className="w-full flex-wrap flex text-white items-center justify-center  ">
                  {allTvShows.map((tv, index) => {
                    if (tv.poster_path != null) {
                      return (
                        <Link
                          to={`/TvF/${tv.id}`}
                          key={index}
                          className="w-[220px] m-4 "
                        >
                          <div className="h-[300px] w-full  ">
                            <img
                              src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                              className="w-full h-full rounded-xl"
                              alt="movie"
                            />
                          </div>
                          <h1 className="m-2 h-10">{tv.name}</h1>
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center ">
                              <img src={Star} className="w-6 " alt="" />
                              <p className="mx-1 ">
                                {tv.vote_average == null
                                  ? "8.6"
                                  : tv.vote_average}
                              </p>
                            </div>
                            <span className="border rounded-xl text-[10px] p-1 ">
                              {tv.first_air_date}
                            </span>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
                <button onClick={loadMore}>See More</button>
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
      </div>
    </>
  );
};

export default AllMovies;
