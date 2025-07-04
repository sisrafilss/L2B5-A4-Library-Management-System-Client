type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  isAvailable: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onBorrow?: (id: string) => void;
};

const BookCard = ({
  id,
  title,
  author,
  genre,
  isbn,
  copies,
  isAvailable,
  onEdit,
  onDelete,
  onBorrow,
}: Book) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md mx-auto sm:mx-0">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>

      <div className="text-gray-700 text-sm space-y-1">
        <p>
          <span className="font-medium">Author:</span> {author}
        </p>
        <p>
          <span className="font-medium">Genre:</span> {genre}
        </p>
        <p>
          <span className="font-medium">ISBN:</span> {isbn}
        </p>
        <p>
          <span className="font-medium">Copies:</span> {copies}
        </p>
        <p>
          <span className="font-medium">Availability:</span>
          <span
            className={`ml-1 font-semibold ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit?.(id)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-1 rounded-md transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md transition"
        >
          Delete
        </button>
        <button
          onClick={() => onBorrow?.(id)}
          className={`${
            isAvailable
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white text-sm px-4 py-1 rounded-md transition`}
          disabled={!isAvailable}
        >
          Borrow
        </button>
      </div>
    </div>
  );
};

export default BookCard;
