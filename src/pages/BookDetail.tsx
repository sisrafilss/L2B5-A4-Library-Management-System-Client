import FullScreenSpinner from "@/components/Spinner";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const BookDetail = () => {
  const { bookId } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(bookId);

  const book = data?.data;

  console.log(book);
  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {book?.title}
          </h2>
          <p className="text-sm text-gray-500">by {book?.author}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
              book?.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book?.available ? "Available" : "Not Available"}
          </span>
        </div>
        <div className="text-sm text-gray-400">
          <p>Added: {new Date(book?.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(book?.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-700 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Genre:</p>
          <p>{book?.genre}</p>
        </div>
        <div>
          <p className="font-medium">ISBN:</p>
          <p>{book?.isbn}</p>
        </div>
        <div>
          <p className="font-medium">Total Copies:</p>
          <p>{book?.copies}</p>
        </div>
        <div>
          <p className="font-medium">Description:</p>
          <p className="text-gray-600">{book?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
