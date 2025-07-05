import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { Book } from "@/types";

const BookListPage = () => {
  const { data, isError, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }
  console.log("data", data);

  const handleEdit = (id: string) => {
    console.log("Edit book with ID:", id);
  };

  const handleBorrow = (id: string) => {
    console.log("Borrow book with ID:", id);
  };

  return (
    <div className=" py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Available Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isError &&
          data?.data.map((book: Book) => (
            <BookCard
              key={book._id}
              {...book}
              onEdit={handleEdit}
              onBorrow={handleBorrow}
            />
          ))}

        {/* {mockBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBorrow={handleBorrow}
          />
        ))} */}
      </div>
    </div>
  );
};

export default BookListPage;
