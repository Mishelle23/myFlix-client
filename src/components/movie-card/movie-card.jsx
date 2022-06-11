import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  addFavouriteMovie(movieId) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.post(`https://safe-coast-49930.herokuapp.com/users/${username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((response) => {
        console.log(response);
        alert("Movie added");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button onClick={() => { this.addFavouriteMovie(movie._id) }}>Add to Favourites</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,

};