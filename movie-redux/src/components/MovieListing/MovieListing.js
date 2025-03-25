import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const [searchTerm, setSearchTerm] = useState("");

  let renderMovies, renderShows = "";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.Response === "True" 
    ? movies.Search.filter(movie => 
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  const filteredShows = shows.Response === "True" 
    ? shows.Search.filter(show => 
        show.Title.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  renderMovies =
    filteredMovies.length > 0 ? (
      filteredMovies.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>No movies found.</h3>
      </div>
    );

  renderShows =
    filteredShows.length > 0 ? (
      filteredShows.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="shows-error">
        <h3>No shows found.</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for movies or shows..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className="movie-list">
        <h2 class = 'category'>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="show-list">
        <h2  class = 'category'>Shows</h2>
        <div className="movie-container">{renderShows}</div>
      </div>
    </div>
  );
};

export default MovieListing;
