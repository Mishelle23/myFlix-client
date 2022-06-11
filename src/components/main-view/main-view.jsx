import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';

import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


class MainView extends React.Component {


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));

      this.getMovies(accessToken);
    }
  }



  getMovies(token) {
    axios.get('https://safe-coast-49930.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.props.setUser(
      authData.user.Username
    );


    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null)
  }

  render() {

    let { movies } = this.props;
    let { user } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <button onClick={() => {
          this.onLoggedOut()
        }}>Logout</button>
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:id" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.id)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/movie-director/:id"
              render={({ match, history }) => {
                return <Col>
                  <DirectorView movie={movies.find(m => m._id === match.params.id)}
                    onBackClick={() => history.goBack()} />
                </Col>
              }} />

            <Route path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                  <ProfileView movies={movies}
                    user={user} onBackClick={() => history.goBack()} />
                </Col>
              }} />

            <Route path={`/user-update/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                  <UserUpdate user={user} onBackClick={() => history.goBack()} />
                </Col>
              }} />


            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);