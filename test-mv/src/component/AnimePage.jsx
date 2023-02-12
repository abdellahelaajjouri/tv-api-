import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from "../assets/star.png";
const AnimePage = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [anime, setAnime] = useState([]);
    const [keyword, setKeyword] = useState('');


  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime?${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setAnime(data.data);
      });
  }, []);
  const loadMore = () => {
    fetch(`https://api.jikan.moe/v4/anime?page=${pageNumber + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime([...anime, ...data.data]);
      });

    setPageNumber(pageNumber + 1);
  };
  return (
    <div className="pt-32 mb-5  ">
      <div className="flex items-center mb-5 justify-between flex-wrap container mx-auto">
        <h1 className="text-white text-md w-32   ">All Anime </h1>
      </div>
      <div className="w-full flex-wrap flex text-white items-center justify-center ">
        {anime.map((an , index) => {
          return an ? (
            <div key={index} className="m-5 flex text-white items-center justify-center  ">
              <div
                onClick={() => {
                  navigate(`AnimeInfo/${an.mal_id}`);
                }}
                className="w-[250px] "
              >
                <div className="h-[280px] w-full  ">
                  <img
                    src={an.images && an.images.jpg.image_url}
                    className="w-full h-full rounded-xl"
                    alt="movie"
                  />
                </div>
                <h1 className="m-2 h-10">{an.title}</h1>
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center ">
                    <img src={Star} className="w-6 " alt="" />
                    <p className="mx-1 ">{an.score}/10</p>
                  </div>
                  <span className="border rounded-xl text-[10px] p-1 ">
                    {an.aired.prop.from.day} / {an.aired.prop.from.month} /{" "}
                    {an.aired.prop.from.year}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            "loading..."
          );
        })}
      </div>
      <button onClick={loadMore}>See more</button>
    </div>
  );
};

export default AnimePage;
