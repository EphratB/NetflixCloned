import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.scss";

const api_key = "23b742318d6967818036cb509af011e4";
const URL = "https://api.themoviedb.org/3/";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    (async () => {
      const request = await axios.get(
        `${URL}/discover/tv?with_networks=213&api_key=${api_key}`
      );
      /**
       * getting a random movie from data.results
       */
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      // console.log("movie", movie);
      return request;
    })();
  }, []);
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        {/* some API wont give us the exact response that we wanted , its always to get something if thats the case*/}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>

      {/* <div className="banner_buttons">
        <button className="banner_button">Play</button>
        <button className="banner_button">My List</button>
      </div> */}
      <h1 className="banner_description">{movie?.overview}</h1>
      <div className="banner_fadeBottom"></div>
    </div>
  );
}

export default Banner;
