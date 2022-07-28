import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NewReviewForm from './NewReviewForm';
import useHttp from '../../hooks/use-http';
import ReviewsList from './ReviewsList';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { getAllComments } from '../../util/api';

const Reviews = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { movieId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(movieId);
  }, [movieId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(movieId);
  }, [sendRequest, movieId]);

  let comments;

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <ReviewsList comments={loadedComments} />;
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className="flex flex-col min-w-full text-white mt-12">
      {!isAddingComment && (
        <button
          onClick={startAddCommentHandler}
          type="button"
          className="max-w-max text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add review
        </button>
      )}
      {isAddingComment && (
        <NewReviewForm
          movieId={movieId}
          onAddedComment={addedCommentHandler}
          loadedMovie={props.loadedMovie}
        />
      )}
      <p className="font-teko font-semibold text-2xl mb-2 mt-4 ml-1s">
        User Comments
      </p>

      {comments}
    </section>
  );
};

export default Reviews;
