import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios
      .get("https://myflix16.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({ user });
  }

  onRegister(user) {
    this.setState({ user });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) {
      return (
        <div className="test">
          <h1>Welcome to my flix</h1>
          <button onClick={() => this.onLoggedIn()}>Log In</button>
        </div>
      );
      //return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      // return <RegistrationView onRegister={user => this.onRegister(user)} />;
    }

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClick={() => {
              return this.onMovieClick(null);
            }}
          />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
