import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getMovie } from '../util/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import MovieTile from '../components/MovieTile';
import Reviews from '../components/reviews/Reviews';

const MovieDetail = () => {
  const params = useParams();
  const { movieId } = params;
  const {
    sendRequest,
    status,
    data: loadedMovie,
    error,
  } = useHttp(getMovie, true);

  useEffect(() => {
    sendRequest(movieId);
  }, [sendRequest, movieId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (loadedMovie.Response === 'False') {
    return <p>No movie found!</p>;
  }

  return (
    <Fragment>
      <MovieTile loadedMovie={loadedMovie} />
      <Reviews loadedMovie={loadedMovie} />
    </Fragment>
  );
};

export default MovieDetail;
