import axios from "axios";

// API URL AND TOKEN
const baseUrl = "https://api.themoviedb.org";
const acces_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2UxZjM0OGM3ZmI1M2Q4OGYyZjI4YWE3NGUyNjU4ZSIsInN1YiI6IjY1MGE4ZTMzMGQ1ZDg1MDBlMDUyMDdkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EXkm4SmPFwO-VYVsUtWH7OoCu8LpwIwVGIhELmjlAo0";

// IMAGE PATH
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;
export const nullImage =
  "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png?20170513175923";
export const nullAvatar =
  "https://pariwisata.bengkuluprov.go.id/assets/images/no-avatar.jpg";

// ENDPOINT
const trendingEndpoint = `${baseUrl}/3/trending/movie/day`;
const upcomingEndpoint = `${baseUrl}/3/movie/upcoming`;
const topRatedEndpoint = `${baseUrl}/3/movie/top_rated`;
const searchMoviesEndpoint = `${baseUrl}/3/search/movie`;

// DYNAMIC ENDPOINT
const movieDetailEndpoint = (id) => `${baseUrl}/3/movie/${id}`;
const movieCreditsEndpoint = (id) => `${baseUrl}/3/movie/${id}/credits`;
const movieSimilarEndpoint = (id) => `${baseUrl}/3/movie/${id}/similar`;
const personDetailEndpoint = (id) => `${baseUrl}/3/person/${id}`;
const personMoviesEndpoint = (id) => `${baseUrl}/3/person/${id}/movie_credits`;

// API CALL FUNCTION
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${acces_token}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// API FETCH MOVIES
export const fetchTrending = () => {
  return apiCall(trendingEndpoint);
};
export const fetchUpcoming = () => {
  return apiCall(upcomingEndpoint);
};
export const fetchTopRated = () => {
  return apiCall(topRatedEndpoint);
};
export const searchMovie = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchMovieSimiliar = (id) => {
  return apiCall(movieSimilarEndpoint(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};
