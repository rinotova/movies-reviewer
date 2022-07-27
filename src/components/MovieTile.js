import { Link } from 'react-router-dom';
import reviewer from '../img/reviewer.png';

const MovieTile = ({ loadedMovie, numberOfComments }) => {
  const badges = loadedMovie.Genre.split(',').map((genre, index) => {
    return (
      <span
        key={Math.random() * (1000 - index) + index + 1}
        className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
      >
        {genre}
      </span>
    );
  });

  const ratings = loadedMovie.Ratings.map((rating, index) => {
    return (
      <p key={Math.random() * (1000 - index) + index + 1}>
        <span className="font-bold">{rating.Source}: </span>
        {rating.Value}
      </p>
    );
  });

  return (
    <section>
      <div className="flex mt-8">
        {loadedMovie.Poster !== 'N/A' && (
          <img
            className="mr-4 h-44 w-28 md:w-[300px] md:h-[444px] shrink-0"
            src={loadedMovie.Poster}
            loading="lazy"
            alt={loadedMovie.Title}
            height="auto"
            width="auto"
          />
        )}
        {loadedMovie.Poster === 'N/A' && (
          <div className="flex items-center border border-1 border-gray-400 justify-center text-center mr-4 h-44 w-28 md:w-[300px] md:h-[444px] shrink-0">
            <img
              src={reviewer}
              className="h-20 w-20"
              alt="Reviewer"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col text-white">
          <p className="font-teko text-xl md:text-4xl">{loadedMovie.Title}</p>
          <p className="font-teko text-xl md:text-4xl">{loadedMovie.Year}</p>
          <div className="my-4">{badges}</div>
          <div className="hidden md:flex flex-col">
            <p className="mt-4">{loadedMovie.Plot}</p>
            <p className="mt-4 border-b border-solid border-gray-500 pb-4">
              <span className="font-bold">Director:</span>{' '}
              {loadedMovie.Director}
            </p>
            <p className="mt-2 border-b border-solid border-gray-500 pb-4">
              <span className="font-bold">Writer:</span> {loadedMovie.Writer}
            </p>
            <p className="mt-4 border-b border-solid border-gray-500 pb-4">
              <span className="font-bold">Stars:</span> {loadedMovie.Actors}
            </p>
            <div className="mt-4 border-b border-solid border-gray-500 pb-4">
              {ratings}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col text-white">
        <p className="mt-4">{loadedMovie.Plot}</p>
        <p className="mt-4 border-b border-solid border-gray-500 pb-4">
          <span className="font-bold">Director:</span> {loadedMovie.Director}
        </p>
        <p className="mt-2 border-b border-solid border-gray-500 pb-4">
          <span className="font-bold">Writer:</span> {loadedMovie.Writer}
        </p>
        <p className="mt-4 border-b border-solid border-gray-500 pb-4">
          <span className="font-bold">Stars:</span> {loadedMovie.Actors}
        </p>
        <div className="mt-4 border-b border-solid border-gray-500 pb-4">
          {ratings}
        </div>
      </div>
      {numberOfComments > 0 && (
        <Link to={`/movies/${loadedMovie.imdbID}`}>
          <p className="font-teko text-white text-xl mt-4 mb-14 border-b border-solid border-gray-500 pb-4">
            See ({numberOfComments}){' '}
            {numberOfComments === 1 ? 'comment' : 'comments'}
          </p>
        </Link>
      )}
    </section>
  );
};

export default MovieTile;
