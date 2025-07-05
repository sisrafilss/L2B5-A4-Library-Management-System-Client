import FullScreenSpinner from "@/components/Spinner";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import React from "react";

const BorrowSummary: React.FC = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (isError || !data?.success) {
    return (
      <div className="w-full text-center py-10 text-red-500 font-medium">
        Failed to load borrow summary.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-20 mx-auto  bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold p-4 border-b">📚 Borrow Summary</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Book Title</th>
              <th className="px-6 py-3">ISBN</th>
              <th className="px-6 py-3">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.data.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {item.book.title}
                  </td>
                  <td className="px-6 py-3 text-gray-700">{item.book.isbn}</td>
                  <td className="px-6 py-3 text-blue-600 font-semibold">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-500 py-6 italic"
                >
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
