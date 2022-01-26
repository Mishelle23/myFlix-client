import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap';

export function DirectorView(props) {
  const { director } = props;
  console.log(director);
  return (
    <div className="director-view">
      <div className="director-name">
        <span className="label">Name: </span>
        <span className="value">{director.Name}</span>
      </div>

      <div className="director-bio">
        <span className="label">Bio: </span>
        <span className="value">{director.Bio}</span>
      </div>
      <div className="director-birth">
        <span className="label">Birth Year: </span>
        <span className="value">director.Birth</span>
      </div>
      <Link to={`/`}>
        <Button className='backButton' variant='dark'>Back to Movie List</Button>
      </Link>
    </div>
  )
}
