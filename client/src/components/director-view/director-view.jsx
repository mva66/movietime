import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movie } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Director Bio: {director.Bio}</Card.Text>
              <Card.Text>Birth Year: {director.Birth}</Card.Text>
              <Card.Text>Death Year: {director.Death}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string,
  }).isRequired,
};
