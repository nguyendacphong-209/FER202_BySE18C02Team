import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FavoriteMovie.scss";

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);

  // Hàm cập nhật danh sách phim yêu thích từ localStorage
  const updateFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  };

  useEffect(() => {
    // Lần đầu load dữ liệu
    updateFavorites();

    // Lắng nghe sự kiện thay đổi từ localStorage
    const handleStorageChange = () => {
      updateFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  const removeFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // Gửi sự kiện để các component khác cập nhật lại
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="favorite-movies-container">
      <h2>🎬 Danh sách phim yêu thích</h2>
      {favorites.length === 0 ? (
        <p>Danh sách trống. Hãy thêm một số phim!</p>
      ) : (
        <div className="favorite-movies-list">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-movie">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <div className="movie-actions">
                <Link to={`/movie/${movie.imdbID}`} className="view-btn">
                  Xem chi tiết
                </Link>
                <button onClick={() => removeFavorite(movie.imdbID)} className="remove-btn">
                  ❌ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
