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
    <section className="">
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewReviewForm
          movieId={movieId}
          onAddedComment={addedCommentHandler}
          loadedMovie={props.loadedMovie}
        />
      )}
      {comments}
    </section>
  );
};

export default Reviews;
