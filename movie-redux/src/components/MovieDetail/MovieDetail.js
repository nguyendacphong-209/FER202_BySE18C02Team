import React, { useEffect, useState } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import ReviewComponent from "../../features/ReviewComponent";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  const [videoUrl, setVideoUrl] = useState("");
  const API_KEY = "";

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  useEffect(() => {
    if (data.Title) {
      const fetchYouTubeVideo = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
              data.Title
            )}&type=video&key=${API_KEY}`
          );
          const result = await response.json();

          if (result.items && result.items.length > 0) {
            const videoId = result.items[0].id.videoId;
            setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
          } else {
            console.log("Not found.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchYouTubeVideo();
    }
  }, [data.Title, API_KEY]);

  //Phan them phim yeu thich cua PhongND

  // Thêm tính năng "Yêu thích"
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((movie) => movie.imdbID === data.imdbID));
  }, [data.imdbID]);

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter(
        (movie) => movie.imdbID !== data.imdbID
      );
    } else {
      savedFavorites.push({
        imdbID: data.imdbID,
        Title: data.Title,
        Poster: data.Poster,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);

    // Gửi sự kiện để FavoriteMovies cập nhật lại
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <>
      <div className="movie-section">
        {Object.keys(data).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left">
              <div className="movie-title">{data.Title}</div>
              <div className="movie-rating">
                <span>
                  IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
                </span>
                <span>
                  IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                  {data.imdbVotes}
                </span>
                <span>
                  Runtime <i className="fa fa-film"></i> : {data.Runtime}
                </span>
                <span>
                  Year <i className="fa fa-calendar"></i> : {data.Year}
                </span>
              </div>
              <div className="movie-plot">{data.Plot}</div>
              <div className="movie-info">
                <div>
                  <span>Director</span>
                  <span>{data.Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{data.Actors}</span>
                </div>
                <div>
                  <span>Genres</span>
                  <span>{data.Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{data.Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{data.Awards}</span>
                </div>
                {/* 🛠 Nút Thêm/Xóa Yêu Thích */}
                <div>
                  <button className="favorite-btn" onClick={toggleFavorite}>
                    {isFavorite
                      ? "💔 Xóa khỏi yêu thích"
                      : "❤️ Thêm vào yêu thích"}
                  </button>
                </div>
              </div>
            </div>
            <div className="section-right">
              <img src={data.Poster} alt={data.Title} />
            </div>
          </>
        )}
      </div>

      {videoUrl && (
        <div className="movie-trailer">
          <h3 style={{ color: "#ccc", margin: "10px 0" }}>Trailer</h3>
          <iframe
            width="100%"
            style={{ height: "35vw" }}
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Thêm phần review */}
      <ReviewComponent />
    </>
  );
};

export default MovieDetail;
