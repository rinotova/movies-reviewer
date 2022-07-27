import { useEffect } from 'react';
import MovieTile from '../components/MovieTile';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import { gettAllReviewsData } from '../util/api';

const AllMovies = () => {
  const {
    sendRequest,
    status,
    data: loadedMovies,
    error,
  } = useHttp(gettAllReviewsData, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (loadedMovies.length === 0) {
    return (
      <p className="text-white text-4xl font-teko">
        No movies with reviews found!
      </p>
    );
  }

  const mappedMovies = loadedMovies.map((movie) => {
    return (
      <MovieTile
        key={movie.imdbID}
        loadedMovie={movie}
        numberOfComments={movie.numberOfComments}
      />
    );
  });

  return <section className="mt-8">{mappedMovies}</section>;
};

export default AllMovies;
