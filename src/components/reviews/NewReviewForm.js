import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { addComment } from '../../util/api';

const getDate = () => {
  let now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  now = mm + '/' + dd + '/' + yyyy;
  return now;
};

const NewReviewForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;

    sendRequest({
      commentData: {
        text: enteredText,
        date: getDate(),
      },
      movieId: props.movieId,
      loadedMovie: props.loadedMovie,
    });
  };

  return (
    <form className="" onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className="" onSubmit={submitFormHandler}>
        <textarea
          required
          ref={commentTextRef}
          id="comment"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your review..."
        ></textarea>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="max-w-max text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default NewReviewForm;
