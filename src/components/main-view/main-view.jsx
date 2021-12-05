import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: "6120232ed6f1b9e9bf34fbed", Title: 'The Impossible', Description: 'The story of a tourist family in Thailand caught in the destruction and chaotic aftermath of the 2004 Indian Ocean tsunami.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/f/fd/The_Impossible.png' },
        { _id: "6120236ed6f1b9e9bf34fbef", Title: 'Sully', Description: 'The story of Chesley Sullenberger, an American pilot who became a hero after landing his damaged plane on the Hudson River in order to save the flight passengers and crew.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/82/Sully_xxlg.jpeg' },
        { _id: "612023a7d6f1b9e9bf34fbf2", Title: 'Arctic', Description: 'A man stranded in the Arctic after a plane crash must decide whether to remain in the relative safety of his makeshift camp or to embark on a deadly trek through the unknown.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Arctic_film_poster.jpg' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
          this.setSelectedMovie(newSelectedMovie);
        }} /> : movies.map(movie => (<MovieCard key={movie._id} movie={movie}
          onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
        ))
        }
      </div>
    );
  }
}