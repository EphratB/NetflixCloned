import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";

import * as database from "../database";
import PageNotFound from "./PageNotFound";

function ShowDetailsPage() {
  const imageUrl = `https://image.tmdb.org/t/p/w500`;
  const params = useParams();

  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      const loadedPost = await database.loadById(params.id);
      console.log("i am from detail", params.id);
      setMovie(loadedPost);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <PageNotFound />;
  }

  return (
    <div className="row">
      <h1>Movie Details</h1>
      {Object.keys(movie).length > 0 && (
        <div className="showDetail_card">
          <div className="showDetail_card_title">{movie.title}</div>
          <div className="showDetail_card_image">
            <img src={`${imageUrl}${movie.backdrop_path}`} alt={movie.title} />
          </div>
          <div className="showDetail_card_vote_average">
            <FaCircleNotch />
            <svg>
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {movie.vote_average}/10
              </text>
            </svg>
          </div>
          <strong className="showDetail_card_overview">Overview:</strong>
          <div className="showDetail_card_overview">{movie.overview}</div>
          <strong className="showDetail_card_language">Language:</strong>{" "}
          {movie.language}
          <div className="showDetail_card_language">
            {movie.original_language}
          </div>
          <strong className="showDetail_card_release_date">
            Release Date:
          </strong>
          <div className="showDetail_card_release_date">
            {movie.release_date}
          </div>
          <strong className="showDetail_card_vote_count">Vote Count:</strong>
          <div className="showDetail_card_vote_count">{movie.vote_count}</div>
        </div>
      )}
      <p>
        <Link to="/mylist">Go Back</Link>
      </p>
    </div>
  );
}

export default ShowDetailsPage;
