import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { movieApi } from "../features/movies/moviesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefauldmiddleware) =>
    getDefauldmiddleware().concat(movieApi.middleware),
});

setupListeners(store.dispatch);
