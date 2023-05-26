import axios from "axios";

const api_key = "23b742318d6967818036cb509af011e4";
const URL = "https://api.themoviedb.org/3/";

export async function read(fetchUrl) {
  try {
    const response = await axios.get(`${URL}${fetchUrl}&api_key=${api_key}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    let message;
    const status = err.response?.status;
    switch (status) {
      case 401:
        message = "It failed to authenticate";
        break;

      case 404:
        message = "Server failed";
        break;

      default:
        message = "Unexpected error";
    }
    return {
      success: false,
      error: message,
    };
  }
}

export const requests = {
  fetchNetflixOriginals: `/discover/tv?with_networks=213`,
  fetchTrending: `/trending/all/week?language=en-US`,
  fetchTopRated: `/movie/top_rated?language=en-US`,
  fetchHorrorMovies: `/discover/movie?with_genres=27`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749`,
  fetchDocumentaries: `/discover/movie?with_genres=99`,
  popularTvShows: `/tv/popular?language=en-US&page=1 `,
  topRated: `/tv/top_rated?language=en-US&page=1`,
  airingToday: `/tv/airing_today?language=en-US&page=1&timezone=America/New_York`,
};
