import { Route, Navigate, Routes } from 'react-router-dom';

import AllMovies from './pages/AllMovies';
import MovieDetail from './pages/MovieDetail';
import NewMovieReview from './pages/NewMovieReview';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { searchSuggestionsActions } from './store/slices/search-suggestions-slice';
import AllSearchResults from './pages/AllSearchResults';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener('click', () => {
      dispatch(searchSuggestionsActions.hideSuggestions());
    });
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/movies" />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/all-movie-results/:q" element={<AllSearchResults />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/new-movie-review" element={<NewMovieReview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
