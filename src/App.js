import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { requests } from "./restapi";
import Movies from "./components/Movies/movies";
import PageNotFound from "./Pages/PageNotFound";
import SignIn from "./components/Auth/signIn";
import SignUp from "./components/Auth/signUp";
import TvShows from "./Pages/TvShows";
import PopularTvShowsPage from "./Pages/TvShows/PopularTvShowsPage";
import AiringTodayPage from "./Pages/TvShows/AiringTodayPage";
import TopRatedPage from "./Pages/TvShows/TopRatedPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import MyList from "./Pages/MyList";
import AuthContext from "./AuthContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // const authenticateUser = () => {
  //   // Simulating authentication
  //   setIsAuthenticated(true);
  // };

  // const logoutUser = () => {
  //   // Simulating logout
  //   setIsAuthenticated(false);
  // };
  return (
    <div className="app">
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Nav />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route
            path="/signin"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
          {isAuthenticated && (
            <>
              <Route path="movies/:id" element={<Movies />} />
              <Route path="mylist/:id" element={<ShowDetailsPage />} />
              <Route path="mylist" element={<MyList />} />
              <Route
                path="tvshows/popular"
                element={
                  <PopularTvShowsPage
                    title="Popular TV Shows"
                    fetchUrl={requests.popularTvShows}
                  />
                }
              />
              <Route
                path="tvshows/toprated"
                element={
                  <TopRatedPage
                    title="Top Rated TV Shows"
                    fetchUrl={requests.topRated}
                  />
                }
              />
              <Route
                path="tvshows/airingtoday"
                element={
                  <AiringTodayPage
                    title="Currently Airing TV Shows"
                    fetchUrl={requests.airingToday}
                  />
                }
              />
              <Route path="tvshows/*" element={<TvShows />} />
            </>
          )}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
