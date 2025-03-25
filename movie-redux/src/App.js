import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import "./App.scss";
import LoginForm from "./components/login/LoginForm";
import ProfileComponent from "./features/profile/ProfileComponent";
import FavoriteMovie from "./features/favoritemovie/FavoriteMovie";
import AboutUsComponent from "./components/Header/AboutUsConponents";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/favorite" element={<FavoriteMovie />} />
            <Route path="/about" element={<AboutUsComponent />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
