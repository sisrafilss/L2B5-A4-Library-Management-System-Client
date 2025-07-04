import FullScreenSpinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BookFormInputs = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
};

const AddBookModal = () => {
  const [open, setOpen] = useState(false);

  const [createBook, { isLoading }] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>({
    defaultValues: {
      available: true,
    },
  });

  const onSubmit = async (data: BookFormInputs) => {
    console.log("📘 Book Data Submitted:", data);

    if (data.copies < 1) {
      data.available = false;
    } else {
      data.available = true;
    }

    const result = await createBook(data);
    console.log("result: ", result);

    toast.success("Book added successfully!");
    setOpen(false);
    reset(); // Reset the form
  };

  if (isLoading) return <FullScreenSpinner />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add a Book</Button>
      </DialogTrigger>
      <DialogTitle className="sr-only"> Add a New Book</DialogTitle>
      <DialogContent className="sm:max-w-[425px]">
        <div className="">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add a New Book
          </h2>
          <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block font-medium mb-1">Author *</label>
                <input
                  type="text"
                  {...register("author", { required: "Author is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block font-medium mb-1">Genre *</label>
                <input
                  type="text"
                  {...register("genre", { required: "Genre is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm">{errors.genre.message}</p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label className="block font-medium mb-1">ISBN *</label>
                <input
                  type="text"
                  {...register("isbn", { required: "ISBN is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm">{errors.isbn.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">Description *</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Copies */}
              <div>
                <label className="block font-medium mb-1">Copies *</label>
                <input
                  type="number"
                  {...register("copies", {
                    required: "Copies is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Must be at least 0" },
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.copies && (
                  <p className="text-red-500 text-sm">
                    {errors.copies.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
