import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BorrowFormInputs = {
  quantity: number;
  dueDate: string;
};

interface BorrowBookModalProps {
  bookId: string;
  disabled?: boolean;
}

const BorrowBookModal = ({ bookId, disabled }: BorrowBookModalProps) => {
  const [open, setOpen] = useState(false);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BorrowFormInputs>({
    defaultValues: {
      quantity: 1,
      dueDate: format(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd"
      ), // Default to 7 days later
    },
  });

  const onSubmit = async (data: BorrowFormInputs) => {
    const payload = {
      book: bookId,
      quantity: data.quantity,
      dueDate: data.dueDate,
    };

    try {
      await borrowBook(payload).unwrap();
      toast.success("Book borrowed successfully!");
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to borrow book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="text-sm" disabled={disabled}>
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h2 className="text-xl font-semibold text-center mb-4">Borrow Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Quantity */}
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "At least 1 required" },
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
