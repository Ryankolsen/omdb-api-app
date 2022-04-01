import React, { useRef, useEffect, useState } from "react";
import { useGetMatrixQuery, useGetMovieByTitleQuery } from "./moviesApi";
import { Button, Card, Alert, Dropdown, Form } from "react-bootstrap";
import "./movies.css";

export const Movies = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [SelectedMovies, setSelectedMovies] = useState([]);
  const { data, error, isLoading } = useGetMovieByTitleQuery(movieTitle);
  const movieTitleSearch = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieTitle(movieTitleSearch.current.value);
  };

  useEffect(() => {
    const oldMovies = [...SelectedMovies];

    setSelectedMovies(oldMovies.concat(data));
  }, [data]);

  console.log(SelectedMovies);
  return (
    <div className="movie__container">
      <Card className="movie__card">
        <Card.Header>
          <h2 className="movie__h2 text-center mb-4 pt-4">OMDB Movie Api</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formMovieTitleSearch">
              <Form.Label>Search By Movie Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Movie Title"
                ref={movieTitleSearch}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>

        <div></div>
        <Card.Body>
          {error ? (
            <>An error Occurred!</>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : SelectedMovies ? (
            SelectedMovies.map((movie) => {
              console.log(movie);
              if (movie !== undefined && movie.Response !== "False")
                return (
                  <>
                    <h2 className="movie_h2-movie-title"> {movie.Title} </h2>

                    <div className="movie_poster-and-text__container">
                      <img src={movie.Poster} alt={movie.Title}></img>
                      <div className="movie__p-plot">
                        <p>{movie.Plot}</p>
                        <p className="movie__p-titles">
                          Awards: <>{movie.Awards}</>
                        </p>
                        <p>Actors: {movie.Actors}</p>
                        <p>Director(s): {movie.Director}</p>
                        <p>Genre: {movie.Genre}</p>
                        <p>Released: {movie.Released}</p>
                        <p>Runtime: {movie.Runtime}</p>
                        <p>imdbRating: {movie.imdbRating}</p>
                      </div>
                    </div>
                  </>
                );
            })
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
};
