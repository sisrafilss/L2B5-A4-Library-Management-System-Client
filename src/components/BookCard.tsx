import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import BorrowBookModal from "./BorrowBookModal";
import ConfirmDialog from "./ConfirmDialog";
import EditBookModal from "./EditBookModal";
import FullScreenSpinner from "./Spinner";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description: string;
  onBorrow?: (id: string) => void;
};

const BookCard = (book: Book) => {
  const { _id, title, author, genre, isbn, copies, description, available } =
    book;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDeleteClick = () => {
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBook(_id).unwrap();
      toast.success("Book deleted successfully");
    } catch {
      toast.error("Failed to delete the book");
    } finally {
      setOpenConfirm(false);
    }
  };

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm mx-auto sm:mx-0">
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
                available ? "text-green-600" : "text-red-600"
              }`}
            >
              {available ? "Available" : "Not Available"}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {/* <button
            onClick={() => onEdit?.(_id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-1 rounded-md transition"
          >
            Edit
          </button> */}
          <EditBookModal
            book={{
              id: _id,
              title,
              author,
              genre,
              isbn,
              description,
              copies,
              available,
            }}
          />
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md transition"
          >
            Delete
          </button>
          {/* <button
            onClick={() => onBorrow?.(_id)}
            className={`${
              available
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white text-sm px-4 py-1 rounded-md transition`}
            disabled={!available}
          >
            Borrow
          </button> */}
          <BorrowBookModal bookId={_id} disabled={!available} />
          <Link to={`${_id}`}>
            <button
              // onClick={() => onBorrow?.(_id)}
              className={`bg-green-600 text-white text-sm px-4 py-1 rounded-md transition`}
              disabled={!available}
            >
              Detail
            </button>
          </Link>
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${title}"?`}
      />
    </>
  );
};

export default BookCard;
