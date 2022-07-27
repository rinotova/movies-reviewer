import ReviewItem from './ReviewItem';

const ReviewsList = (props) => {
  return (
    <section>
      <ul className="">
        {props.comments.map((comment) => (
          <ReviewItem key={comment.id} text={comment.text} />
        ))}
      </ul>
    </section>
  );
};

export default ReviewsList;
