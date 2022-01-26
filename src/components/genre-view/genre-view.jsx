import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

export function GenreView(props) {
  const { genre } = props
  console.log(genre)
  return (
    <>
      <Row className="genre-view">
        <Col>
          <div className="genre-name">
            <span className="label">Name: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label">Description: </span>
          </div>
          <Link to={`/`}>
            <Button className='backButton' variant='dark'>Go Back</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}