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
  "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/dykOcAqI01Fci5cKQW3bEUrPWwU.jpg";

// ENDPOINT
const trendingEndpoint = `${baseUrl}/3/trending/movie/day`;
const upcomingEndpoint = `${baseUrl}/3/movie/upcoming`;
const topRatedEndpoint = `${baseUrl}/3/movie/top_rated`;

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
