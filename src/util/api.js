const FIREBASE_DOMAIN = 'https://react-prep-default-rtdb.firebaseio.com';
const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}`;

export async function getMovieSearchSuggestions(requestData, q) {
  const response = await fetch(`${OMDB_URL}&s=${q}`, { ...requestData });
  const data = await response.json();
  const { totalResults, Search } = data;
  console.log(data);

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

  return mappedSuggestions;
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
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: 'POST',
      body: JSON.stringify(requestData.commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

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
