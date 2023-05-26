import React, { useState, useEffect } from "react";
import "./styles.scss";
import { FaCircleNotch } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import * as database from "../.././database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyList() {
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true
  const [movies, setMovies] = useState([]); // Rename moviees to movies

  useEffect(() => {
    // Load the database
    // IIFE immediately Invoked fucntion expression
    (async () => {
      try {
        const data = await database.load();
        console.log("Loading database", data);
        // Set data from database
        setMovies(data);
        setIsLoading(false); // Set isLoading to false after data is loaded
      } catch (error) {
        console.error("Failed to load movies from database", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      }
    })();
  }, []);

  const navigate = useNavigate();

  const imageUrl = `https://image.tmdb.org/t/p/w500`;

  const handleClickImage = (id) => {
    console.log("iddddd", id);
    navigate(`/showdetails/${id}`);
  };

  // Remove the movie from the database
  async function handleDeleteWatchedMovies(id) {
    console.log("mylist from handleDeleteWatchedMovies", id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmed) {
      // Remove from memory
      const filteredTasks = movies.filter((movies) => movies.id !== id);

      setMovies(filteredTasks);

      const removed = await database.remove(id);

      if (removed) {
        toast.success("Movie deleted successfully!");
      } else {
        toast.error("Failed to delete movie.");
      }
    }
  }

  return (
    <>
      <div className="container">
        <h1>My List</h1>
        {isLoading ? ( // Show loading spinner while data is being loaded
          <div>Loading...</div>
        ) : movies.length > 0 ? (
          // Use the movies array from state
          <div className="movies-container">
            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <Link to={`/mylist/${movie.id}`} key={index}>
                  <img
                    src={`${imageUrl}${movie.poster_path}`}
                    alt={movie.title}
                    onClick={() => handleClickImage(movie.id)}
                  />
                </Link>
                <div className="rating-circle">
                  <FaCircleNotch />
                  <div className="rating-number">{movie.vote_average}</div>
                  {/* <div className="rating-number">{movie.id}</div> */}
                </div>
                <div className="delete_watched">
                  Watched |{" "}
                  <RiDeleteBinLine
                    onClick={() => {
                      handleDeleteWatchedMovies(movie.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="Mylist_text">Your list is empty!</p>
        )}
      </div>
    </>
  );
}

export default MyList;
