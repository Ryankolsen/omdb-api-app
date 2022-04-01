import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../../index";

export const movieApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://www.omdbapi.com/`,
  }),
  endpoints: (builder) => ({
    getMatrix: builder.query({
      query: () => `?t=matrix?&apikey=${API_KEY}`,
    }),
    getMovieByTitle: builder.query({
      query: (movieTitle) => `?t=${movieTitle}?&apikey=${API_KEY}`,
    }),
  }),
});

export const { useGetMatrixQuery, useGetMovieByTitleQuery } = movieApi;
