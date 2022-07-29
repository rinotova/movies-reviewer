import React, { Suspense } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { searchSuggestionsActions } from './store/slices/search-suggestions-slice';
import LoadingSpinner from './UI/LoadingSpinner';

const MovieDetail = React.lazy(() => import('./pages/MovieDetail'));
const AllSearchResults = React.lazy(() => import('./pages/AllSearchResults'));
const AllMovies = React.lazy(() => import('./pages/AllMovies'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener('click', () => {
      dispatch(searchSuggestionsActions.hideSuggestions());
    });
  }, [dispatch]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/all-movie-results/:q" element={<AllSearchResults />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
