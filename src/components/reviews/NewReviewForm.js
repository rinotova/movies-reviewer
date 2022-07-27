import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { addComment } from '../../util/api';

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

    // optional: Could validate here

    sendRequest({
      commentData: { text: enteredText },
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
        <label htmlFor="comment">Your Comment</label>
        <textarea
          required
          id="comment"
          rows="5"
          ref={commentTextRef}
        ></textarea>
      </div>
      <div className="">
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewReviewForm;
