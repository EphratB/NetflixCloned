import React, { useEffect, useState } from "react";
import * as restAPI from "../../restapi";

function PopularTvShowsPage({ fetchUrl, title }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500`;

  const [isLoading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setShows([]);
    const fetchData = async () => {
      try {
        const result = await restAPI.read(fetchUrl);
        console.log(result);
        if (result.success) {
          const showList = result.data.results;
          setShows(showList);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      }
      setLoading(false);
    };
    fetchData();
  }, [fetchUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="tvshows_posters">
        {shows.map((show) => (
          <div key={show.id} className="movie_card">
            <div className="movie_poster_button">
              <img src={`${imageUrl}${show.poster_path}`} alt={show.name} />
            </div>
            <div className="movie_card_title">{show.name}</div>
            <div className="movie_card_overview">{show.release_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularTvShowsPage;
