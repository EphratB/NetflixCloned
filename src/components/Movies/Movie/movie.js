import { useEffect, useState } from "react";
import * as restAPI from "../../.././restapi";
import "./styles.scss";
import * as database from "./../../.././database";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Movie({
  title,
  fetchUrl,
  isLargeRow,
  className,
  handleAddSelectedMovie,
}) {
  const imageUrl = `https://image.tmdb.org/t/p/w500`;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState("");
  const [isMovieAlreadyAdded, setIsMovieAlreadyAdded] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await restAPI.read(fetchUrl);
      if (result.success) {
        const movieList = result.data.results;
        setMovies(movieList);
      } else {
        setError(result.error);
      }
      setLoading(false);
    })();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplayer: 1,
    },
  };

  // fucntion that handles to show the movie trailer

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  // adding to the Mylist
  const handleAddToList = async (movie) => {
    const { title, id, vote_average, poster_path, backdrop_path, overview } =
      movie;

    // check if movie with same ID already exists in database

    const existingMovie = await database.get(id);
    if (existingMovie) {
      setIsMovieAlreadyAdded("Movie already exists in your list");
      return;
    } else {
      setIsMovieAlreadyAdded("");
    }

    //saving it to database
    const saveId = await database.save(movie);
    movie.id = saveId;
    console.log("save me", saveId);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
    handleAddSelectedMovie(
      title,
      vote_average,
      poster_path,
      backdrop_path,
      overview
    ); // call handleAddSelectedMovie function
  };

  return (
    <div className="row">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {movies.length !== 0 && <p>{isMovieAlreadyAdded}</p>}
          <h2>{title}</h2>
          {showMessage && (
            <p className="user_address">Movie added to your list!</p>
          )}
          <div className="row__posters">
            {movies.map((movie) => (
              <div key={movie.id} className="movie_poster">
                <img
                  onClick={() => handleClick(movie)}
                  className={`row__poster ${
                    isLargeRow ? "netflix__originals" : ""
                  } ${className}`}
                  // we sometimes dont get what we want from the API sometimes might be undefined
                  // always render it conditionally
                  src={
                    movie.poster_path ? `${imageUrl}${movie.poster_path}` : ""
                  }
                  alt={movie.title}
                />

                <div className="controllers">
                  {title === "Trending Add to Watchlist" && (
                    <>
                      <div
                        className="my-list-btn"
                        onClick={() => handleAddToList(movie)}
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {trailerUrl ? (
            <YouTube videoId={trailerUrl} opts={opts} />
          ) : (
            <p>{error}</p>
          )}
        </>
      )}
    </div>
  );
}

export default Movie;
