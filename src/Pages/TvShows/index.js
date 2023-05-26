import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.scss";

function TvShows() {
  const [showNotes, setShowNotes] = useState(true);

  const handleToggleNotes = () => {
    setShowNotes(false);
  };

  return (
    <>
      <div className="tv-shows-container">
        <aside className="side-menu">
          <div className="side-menu-header">TV Shows</div>

          <div className="nav-links">
            <div className="nav-link">
              <NavLink
                to="/tvshows/popular"
                activeclassname="active"
                onClick={handleToggleNotes}
              >
                Popular TV Shows
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to="/tvshows/toprated"
                activeclassname="active"
                onClick={handleToggleNotes}
              >
                Top Rated TV Shows
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink
                to="/tvshows/airingtoday"
                activeclassname="active"
                onClick={handleToggleNotes}
              >
                TV Shows Airing Today
              </NavLink>
            </div>
          </div>
        </aside>
        <article className="tv-shows-content">
          <h2>Welcome to the TV Shows section</h2>
          {showNotes && (
            <>
              <p>
                Here you can find the most popular TV shows, top rated TV shows,
                and TV shows airing today. Simply click on the links in the menu
                on the left to browse through the different categories.
              </p>
              <p>
                In addition to the categories mentioned above, we also offer a
                wide selection of genres for TV shows. Whether you're in the
                mood for drama, comedy, action, or something else, you can
                easily browse through our collection by clicking on the "Genres"
                link in the menu. We also provide detailed information about
                each TV show, including a synopsis, cast and crew information,
                ratings and reviews from other users, and more. You can easily
                access this information by clicking on a specific TV show in our
                collection. Furthermore, we regularly update our collection with
                the latest and greatest TV shows, so be sure to check back often
                to discover new favorites and stay up-to-date on the hottest
                trends in television.
              </p>
            </>
          )}
          <Outlet />
        </article>
      </div>
    </>
  );
}

export default TvShows;
