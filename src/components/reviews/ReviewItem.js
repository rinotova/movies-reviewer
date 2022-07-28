import reviewer from '../../img/reviewer.png';

const ReviewItem = ({ comment }) => {
  return (
    <li className="mt-4 min-w-full block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-col">
        <div className="flex">
          <img
            src={reviewer}
            alt="Reviewer"
            width="28"
            height="28"
            loading="lazy"
          />
          <p className="text-white ml-4">- Anonymous -</p>
          <p className="text-white ml-4">{comment.date}</p>
        </div>
        <p className="mt-4 text-white ml-6">{comment.text}</p>
      </div>
    </li>
  );
};

export default ReviewItem;
