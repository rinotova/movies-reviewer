import { Route, Switch, Redirect } from 'react-router-dom';

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
      <Switch>
        <Route path="/" exact>
          <Redirect to="/movies" />
        </Route>
        <Route path="/movies" exact>
          <AllMovies />
        </Route>
        <Route path="/all-movie-results/:q" exact>
          <AllSearchResults />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
        <Route path="/new-movie-review">
          <NewMovieReview />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
