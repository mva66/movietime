// import React from "react";
// import axios from "axios";

// import { connect } from "react-redux";

// import { Button, Navbar, Nav } from "react-bootstrap";

// import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";

// import { BrowserRouter as Router, Route } from "react-router-dom";

// import { setMovies, setLoggedInUser } from "../../actions/actions";

// import MoviesList from "../movies-list/movies-list";
// import { LoginView } from "../login-view/login-view";
// import { RegistrationView } from "../registration-view/registration-view";
// import { MovieView } from "../movie-view/movie-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { DirectorView } from "../director-view/director-view";
// import { GenreView } from "../genre-view/genre-view";
// import { ProfileView } from "../profile-view/profile-view";
// import { UpdateProfile } from "../update-profile/update-profile";

// export class MainView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       user: null,
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user"),
//       });
//       this.getMovies(accessToken);
//     }
//   }

//   getMovies(token) {
//     axios
//       .get("https://myflix16.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         this.props.setMovies(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({ user: authData.user.Username });

//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.Username);
//     this.getMovies(authData.token);
//   }

//   onLogout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     this.setState({
//       user: null,
//     });
//     window.open("/client", "_self");
//   }

//   render() {
//     let { movies } = this.props;
//     let { user } = this.state;

//     return (
//       <Router basename="/client">
//         <Navbar bg="light" expand="lg">
//           <Navbar.Brand as={Link} to="/">
//             <h1>My Flix</h1>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <Nav.Link as={Link} to="/">
//                 <h3>Home</h3>
//               </Nav.Link>
//               <Nav.Link as={Link} to="/user">
//                 <h3>Profile</h3>
//               </Nav.Link>
//               <Button variant="link" onClick={() => this.onLogout()}>
//                 <b>Log Out</b>
//               </Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//         <br></br>
//         <br></br>
//         <br></br>
//         <div className="main-view">
//           <Container>
//             <Route
//               exact
//               path="/"
//               render={() => {
//                 if (!user)
//                   return (
//                     <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//                   );
//                 return <MoviesList movies={movies} />;
//               }}
//             />

//             <Route path="/register" render={() => <RegistrationView />} />

//             <Route
//               path="/movies/:movieId"
//               render={({ match }) => (
//                 <MovieView
//                   movie={movies.find((m) => m._id === match.params.movieId)}
//                 />
//               )}
//             />
//             <Route
//               path="/movies/director/:name"
//               render={({ match }) => {
//                 if (!movies) return <div className="main-view" />;
//                 return (
//                   <DirectorView
//                     director={
//                       movies.find((m) => m.Director.Name === match.params.name)
//                         .Director
//                     }
//                   />
//                 );
//               }}
//             />
//             <Route
//               path="/movies/genres/:name"
//               render={({ match }) => {
//                 if (!movies) return <div className="main-view" />;
//                 return (
//                   <GenreView
//                     genre={
//                       movies.find((m) => m.Genre.Name === match.params.name)
//                         .Genre
//                     }
//                   />
//                 );
//               }}
//             />

//             <Route
//               exact
//               path="/user"
//               render={() => <ProfileView movies={movies} />}
//             />

//             <Route path="/user/update" render={() => <UpdateProfile />} />
//           </Container>
//         </div>
//       </Router>
//     );
//   }
// }

// let mapStateToProps = (state) => {
//   return { movies: state.movies };
// };

// export default connect(mapStateToProps, { setMovies, setLoggedInUser })(
//   MainView
// );

// // import React from "react";
// // import ReactDOM from "react-dom";
// // import axios from "axios";
// // import { LoginView } from "../login-view/login-view";
// // import { MovieCard } from "../movie-card/movie-card";
// // import { MovieView } from "../movie-view/movie-view";
// // import Row from "react-bootstrap/Row";
// // import Col from "react-bootstrap/Col";
// // import Container from "react-bootstrap/Container";
// // import { BrowserRouter as Router, Route } from "react-router-dom";
// // import DirectorView from "../director-view/director-view";
// // import PropTypes from "prop-types";
// // import MovieList from "../movie-list/movie-list";

// // export class MainView extends React.Component {
// //   constructor() {
// //     super();

// //     this.state = {
// //       movies: [],
// //       selectedMovie: null,
// //       user: null
// //     };
// //   }

// //   componentDidMount() {
// //     let accessToken = localStorage.getItem("token");
// //     if (accessToken !== null) {
// //       this.setState({
// //         user: localStorage.getItem("user")
// //       });
// //       this.getMovies(accessToken);
// //     }
// //   }

// //   // onMovieClick {
// //   //   this.setState({
// //   //     selectedMovie: movie
// //   //   });
// //   // }

// //   onLoggedIn(authData) {
// //     console.log(authData);
// //     this.setState({
// //       user: authData.user.UserName
// //     });

// //     localStorage.setItem("token", authData.token);
// //     localStorage.setItem("user", authData.user.UserName);
// //     this.getMovies(authData.token);
// //   }
// //   getUser(token) {
// //     axios
// //       .get("https://dimi-app.herokuapp.com/users", {
// //         headers: { Authorization: `Bearer ${token}` }
// //       })
// //       .then(response => {
// //         this.props.setUser(response.data);
// //       })
// //       .catch(error => {
// //         console.log(error);
// //       });
// //   }
// //   getMovies(token) {
// //     axios
// //       .get("https://dimi-app.herokuapp.com/movies", {
// //         headers: { Authorization: `Bearer ${token}` }
// //       })
// //       .then(response => {
// //         // Assign the result to the state
// //         this.setState({
// //           movies: response.data
// //         });
// //       })
// //       .catch(function(error) {
// //         console.log(error);
// //       });
// //   }
// //   goBack = () => {
// //     this.setState({ selectedMovie: null });
// //   };
// //   render() {
// //     const { movies, selectedMovie, user } = this.state;

// //     // Before the movies have been loaded
// //     if (!movies) return <div className="main-view" />;
// //     // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
// //     return (
// //       <div className="main-view">
// //         <Container style={{ width: "82rem" }}>
// //           <Col>
// //             <Row>
// //               {/* {selectedMovie ? (
// //                 <MovieView goBack={this.goBack} movie={selectedMovie} />
// //               ) : (
// //                 this.state.movies.map(m => (
// //                   <MovieCard
// //                     key={m._id}
// //                     movie={m}
// //                     onClick={m => this.onMovieClick(m)}
// //                   />
// //                 ))
// //               )} */}
// //             </Row>
// //           </Col>
// //         </Container>
// //         <Router>
// //           <Route
// //             exact
// //             path="/"
// //             render={() => {
// //               if (!user)
// //                 return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
// //               return <MovieList movies={movies} />;
// //             }}
// //           />
// //           <Route
// //             path="/movies/:movieId"
// //             render={({ match }) => (
// //               <MovieView
// //                 movie={movies.find(m => m._id === match.params.movieId)}
// //               />
// //             )}
// //           />
// //           <Route
// //             exact
// //             path="/genres/:name"
// //             render={({ match }) => {
// //               if (!movies) return <div className="main-view" />;
// //               return (
// //                 <GenreView
// //                   genre={
// //                     movies.find(m => m.Genre.Name === match.params.name).Genre
// //                   }
// //                 />
// //               );
// //             }}
// //           />
// //           <Route
// //             exact
// //             path="/directors/:name"
// //             render={({ match }) => {
// //               if (!movies || movies.length === 0)
// //                 return <div className="main-view" />;
// //               return (
// //                 <DirectorView
// //                   director={
// //                     movies.find(m => m.Director.Name === match.params.name)
// //                       .Director
// //                   }
// //                   movies={movies}
// //                 />
// //               );
// //             }}
// //           />
// //         </Router>
// //       </div>
// //     );
// //   }
// // }
// // MovieView.propTypes = {
// //   movie: PropTypes.shape({
// //     Title: PropTypes.string,
// //     ImagePath: PropTypes.string,
// //     Description: PropTypes.string,
// //     Genre: PropTypes.exact({
// //       _id: PropTypes.string,
// //       Name: PropTypes.string,
// //       Description: PropTypes.string
// //     }),
// //     Director: PropTypes.shape({
// //       Name: PropTypes.string
// //     })
// //   }).isRequired
// // };
// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import MovieView from "../movie-view/movie-view";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// // import { BrowserRouter as Router, Route } from "react-router-dom";
// import DirectorView from "../director-view/director-view";
// import PropTypes from "prop-types";
// import { Route, Link, BrowserRouter as Router } from "react-router-dom";
// import About from "../Header/about";
// import Contact from "../Header/contact";
// import { RegistrationView } from "../registration-view/registration-view";
// // import { LoginView } from "./components/login-view/login-view";
// import { ProfileView } from "../profile-view/profile-view";
// import MoviesList from "../movies-list/movies-list";
// import {
//   Button,
//   Form,
//   FormControl,
//   Navbar,
//   Nav,
//   NavDropdown
// } from "react-bootstrap";

// export class MainView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       selectedMovie: null,
//       user: null,
//       userInfo: null
//     };
//   }

//   // componentDidMount() {
//   //   let accessToken = localStorage.getItem("token");
//   //   if (accessToken !== null) {
//   //     this.setState({
//   //       user: localStorage.getItem("user")
//   //     });
//   //     this.getMovies(accessToken);
//   //   }
//   // }

//   // onMovieClick(movie) {
//   //   this.setState({
//   //     selectedMovie: movie
//   //   });
//   // }

//   // onLoggedIn(authData) {
//   //   console.log(authData);
//   //   this.setState({
//   //     user: authData.user.UserName
//   //   });

//   //   localStorage.setItem("token", authData.token);
//   //   localStorage.setItem("user", authData.user.UserName);
//   //   this.getMovies(authData.token);
//   // }
//   // getUser(token) {
//   //   axios
//   //     .get("https://dimi-app.herokuapp.com/users", {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //     .then(response => {
//   //       this.props.setUser(response.data);
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   // }
//   // getMovies(token) {
//   //   axios
//   //     .get("https://dimi-app.herokuapp.com/movies", {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     })
//   //     .then(response => {
//   //       // Assign the result to the state
//   //       this.setState({
//   //         movies: response.data
//   //       });
//   //     })
//   //     .catch(function(error) {
//   //       console.log(error);
//   //     });
//   // }
//   // goBack = () => {
//   //   this.setState({ selectedMovie: null });
//   // };

//   getMovies(token) {
//     axios
//       .get("https://terranovas.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         this.props.setMovies(response.data);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

//   getUser(token) {
//     axios
//       .get("https://terranovas.herokuapp.com/users", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         this.props.setUser(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   updateUser(data) {
//     this.setState({
//       userInfo: data
//     });
//     localStorage.setItem("user", data.Username);
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user")
//       });
//       this.getMovies(accessToken);
//       this.getUser(accessToken);
//     }
//   }

//   onMovieClick(movie) {
//     this.setState({
//       selectedMovie: movie
//     });
//   }

//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({
//       user: authData.user.Username,
//       userInfo: authData.user
//     });
//     this.props.setUser(authData.user);
//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.Username);
//     this.getMovies(authData.token);
//   }

//   onLoggedOut() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     this.setState({
//       user: null
//     });
//     window.open("/client", "_self");
//   }

//   register() {
//     this.setState({ register: true });
//   }

//   goToLogin() {
//     this.setState({ register: false });
//   }
//   render() {
//     // const { movies, selectedMovie, user, token } = this.state;
//     let { movies } = this.props;
//     let { user, userInfo, token } = this.state;

//     // Before the movies have been loaded
//     if (!movies) return <div className="main-view" />;
//     // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//     return (
//       <div className="main-view">
//         <Router basename="/client">
//           <Navbar bg="light" expand="lg">
//             <Navbar.Brand as={Link} to="/">
//               MovieMania
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="mr-auto">
//                 <Nav.Link as={Link} to="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/users">
//                   Profile
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/about">
//                   About
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/contact">
//                   Contact
//                 </Nav.Link>
//                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.2">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.3">
//                     Something
//                   </NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action/3.4">
//                     Separated link
//                   </NavDropdown.Item>
//                 </NavDropdown>
//                 <Button size="sm" onClick={() => this.onLoggedOut()}>
//                   <b>Log Out</b>
//                 </Button>
//               </Nav>
//               <Form inline>
//                 <FormControl
//                   type="text"
//                   placeholder="Search"
//                   className="mr-sm-2"
//                 />
//                 <Button variant="outline-success">Search</Button>
//               </Form>
//             </Navbar.Collapse>
//           </Navbar>

//           <br />

//           <div className="main-view">
//             <Container>
//               <Route exact path="/users" component={ProfileView} />
//               <Route path="/about" component={About} />
//               <Route path="/contact" component={Contact} />
//               <Route path="/register" render={() => <RegistrationView />} />
//               <Route path="/login" render={() => <LoginView />} />
//               <Route
//                 exact
//                 path="/"
//                 render={() => {
//                   if (!user)
//                     return (
//                       <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//                     );
//                   // return movies.map(m => <MovieCard key={m._id} movie={m} />);
//                   return <MovieList />;
//                 }}
//               />
//               {/* <Route
//                 exact
//                 path="/"
//                 render={() => {
//                   if (!user)
//                     return (
//                       <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//                     );
//                   return <MovieList movies={movies} />;
//                 }}
//               /> */}
//             </Container>
//             <Route
//               path="/movies/:id"
//               render={({ match }) => <MovieView movieId={match.params.id} />}
//             />

//             <Route
//               exact
//               path="/directors/:name"
//               render={({ match }) => (
//                 <DirectorView directorName={match.params.name} />
//               )}
//             />
//             <Route
//               exact
//               path="/genres/:name"
//               render={({ match }) => (
//                 <GenreView genreName={match.params.name} />
//               )}
//             />
//             <Route
//               path="/users/:Username"
//               render={({ match }) => {
//                 if (!user)
//                   return (
//                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//                   );
//                 return <ProfileView />;
//               }}
//             />
//             <Route
//               path="/update/:Username"
//               render={() => (
//                 <UpdateProfileView
//                   userInfo={userInfo}
//                   user={user}
//                   token={token}
//                   updateUser={data => this.updateUser(data)}
//                 />
//               )}
//             />
//           </div>
//         </Router>
//       </div>
//     );
//   }
// }
// MainView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       Title: PropTypes.string,
//       ImageUrl: PropTypes.string,
//       Description: PropTypes.string,
//       Genre: PropTypes.exact({
//         _id: PropTypes.string,
//         Name: PropTypes.string,
//         Description: PropTypes.string
//       }),
//       Director: PropTypes.shape({
//         Name: PropTypes.string
//       })
//     })
//   )
// };

import React from "react";
//Routing
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Actions
import { setMovies, setUser } from "../../actions/actions";
//Views
import MoviesList from "../movies-list/movies-list";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
// import { UpdateProfileView } from "../profile-view/update-profile";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
// import About from "../Header/about";
// import Contact from "../Header/contact";
//Styling
import Container from "react-bootstrap/Container";
import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      register: false,
      userInfo: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://myflix16.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("https://myflix16.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateUser(data) {
    this.setState({
      userInfo: data,
    });
    localStorage.setItem("user", data.Username);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      userInfo: authData.user,
    });
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/client", "_self");
  }

  register() {
    this.setState({ register: true });
  }

  goToLogin() {
    this.setState({ register: false });
  }

  render() {
    let { movies } = this.props;
    let { user, userInfo, token } = this.state;

    return (
      <Router basename="/client">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            MovieMania
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Button size="sm" onClick={() => this.onLoggedOut()}>
                <b>Log Out</b>
              </Button>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <br />

        <div className="main-view">
          <Container>
            <Route exact path="/users" component={ProfileView} />
            {/* <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} /> */}
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/login" render={() => <LoginView />} />
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                return <MoviesList movies={movies} />;
              }}
            />
          </Container>
          {/* <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} /> */}
          <Route
            path="/movies/:id"
            render={({ match }) => <MovieView movieId={match.params.id} />}
          />

          <Route
            exact
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView directorName={match.params.name} />
            )}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => <GenreView genreName={match.params.name} />}
          />
          <Route
            path="/users/:Username"
            render={({ match }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return <ProfileView />;
            }}
          />
          <Route
            path="/update/:Username"
            render={() => (
              <UpdateProfileView
                userInfo={userInfo}
                user={user}
                token={token}
                updateUser={(data) => this.updateUser(data)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
