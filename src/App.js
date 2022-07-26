import { Route, Switch, Redirect } from 'react-router-dom';

import AllMovies from './pages/AllMovies';
import MovieDetail from './pages/MovieDetail';
import NewMovieReview from './pages/NewMovieReview';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/movies" />
        </Route>
        <Route path="/movies" exact>
          <AllMovies />
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
