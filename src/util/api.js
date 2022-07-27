const FIREBASE_DOMAIN =
  'https://react-movies-reviewer-default-rtdb.europe-west1.firebasedatabase.app';
const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}`;

export async function getAllMoviesForQuery(q, requestData, numOfPages) {
  const fetchArray = [];

  for (let index = 1; index <= numOfPages; index++) {
    fetchArray.push(
      fetch(`${OMDB_URL}&s=${q}&page=${index}`, { ...requestData }).then(
        (response) => response.json()
      )
    );
  }
  let jsonResponses = await Promise.all(fetchArray);
  const mappedResponses = jsonResponses.map((jsonResponse) => {
    return jsonResponse.Search;
  });

  const mergedResults = [].concat.apply([], mappedResponses);

  let mappedSuggestions = [];
  if (mergedResults.length > 0) {
    mappedSuggestions = mergedResults.map((searchResult) => {
      return {
        id: searchResult.imdbID,
        title: searchResult.Title,
        poster: searchResult.Poster,
        year: searchResult.Year,
      };
    });
  }

  return mappedSuggestions;
}

export async function getMovieSearchSuggestions(q, requestData) {
  const response = await fetch(`${OMDB_URL}&s=${q}`, { ...requestData });
  const data = await response.json();
  const { totalResults, Search } = data;

  let mappedSuggestions = [];
  if (totalResults > 0) {
    mappedSuggestions = Search.map((searchResult) => {
      return {
        id: searchResult.imdbID,
        title: searchResult.Title,
        poster: searchResult.Poster,
        year: searchResult.Year,
      };
    });
  }

  return { mappedSuggestions, totalResults, q };
}

export async function getAllQuotes(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    ...requestData,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getMovie(movieId) {
  const response = await fetch(`${OMDB_URL}&i=${movieId}`);
  const movie = await response.json();

  if (!response.ok) {
    throw new Error(movie.message || 'Could not fetch quote.');
  }

  return movie;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {
  // Save comment
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.movieId}.json`,
    {
      method: 'POST',
      body: JSON.stringify(requestData.commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  // Save movie
  await fetch(`${FIREBASE_DOMAIN}/${requestData.movieId}.json`, {
    method: 'POST',
    body: JSON.stringify({ ...requestData.loadedMovie, modified: Date.now() }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(movieId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${movieId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
