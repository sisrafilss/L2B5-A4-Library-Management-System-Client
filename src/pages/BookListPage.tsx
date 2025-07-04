import BookCard from "@/components/BookCard";

const BookListPage = () => {
  const handleEdit = (id: string) => {
    console.log("Edit book with ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete book with ID:", id);
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
        {mockBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </div>
  );
};

export default BookListPage;
const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    isbn: "978-0743273565",
    copies: 4,
    isAvailable: true,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical Fiction",
    isbn: "978-0061120084",
    copies: 2,
    isAvailable: true,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "978-0451524935",
    copies: 0,
    isAvailable: false,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    isbn: "978-1503290563",
    copies: 1,
    isAvailable: true,
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0547928227",
    copies: 3,
    isAvailable: true,
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    isbn: "978-0316769488",
    copies: 0,
    isAvailable: false,
  },
  {
    id: "7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    isbn: "978-0062315007",
    copies: 5,
    isAvailable: true,
  },
  {
    id: "8",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    isbn: "978-0060850524",
    copies: 2,
    isAvailable: true,
  },
  {
    id: "9",
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    isbn: "978-1503280786",
    copies: 0,
    isAvailable: false,
  },
  {
    id: "10",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Gothic",
    isbn: "978-0141441146",
    copies: 3,
    isAvailable: true,
  },
];
