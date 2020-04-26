import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";

//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`https://mehak-movieapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteFavoriteMovie(movieId) {
    console.log(this.props.movies);
    axios
      .delete(
        `https://mehak-movieapi.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert("Removed movie from favorites");
      })
      .catch((e) => {
        alert("error removing movie" + e);
      });
  }

  deleteUser(e) {
    axios
      .delete(
        `https://mehak-movieapi.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/");
      })
      .catch((event) => {
        alert("failed to delete user");
      });
  }

  render() {
    const favoriteMovieList = this.props.movies.filter((m) =>
      this.state.FavoriteMovies.includes(m._id)
    );

    return (
      <div>
        <Container>
          <Col>
            <h1>My Profile</h1>
            <br />

            <Card>
              <Card.Body>
                <Card.Text>Username: {this.state.Username}</Card.Text>
                <Card.Text>Password: xxxxxx</Card.Text>
                <Card.Text>Email: {this.state.Email}</Card.Text>
                <Card.Text>Birthday {this.state.Birthday}</Card.Text>
                Favorite Movies:
                {favoriteMovieList.map((m) => (
                  <div key={m._id} className="fav-movies-button">
                    <Link to={`/movies/${m._id}`}>
                      <Button variant="link">{m.Title}</Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={(e) => this.deleteFavoriteMovie(m._id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <br />
                <br />
                <Link to={"/user/update"}>
                  <Button variant="primary">Update Profile</Button>
                </Link>
                <br />
                <br />
                <Button onClick={() => this.deleteUser()}>Delete User</Button>
                <br />
                <br />
                <Link to={`/`}>Back</Link>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}
export default connect(({ movies, users }) => ({ movies, users }))(ProfileView);
