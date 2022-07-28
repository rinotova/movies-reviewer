import ReviewItem from './ReviewItem';

const ReviewsList = (props) => {
  return (
    <section>
      <ul className="">
        {props.comments.map((comment) => (
          <ReviewItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
};

export default ReviewsList;
