import App from "@/App";
import BookDetail from "@/pages/BookDetail";
import { default as BookListPage } from "@/pages/BookListPage";
import BorrowBookList from "@/pages/BorrowBookList";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: BookListPage,
      },
      {
        path: ":bookId",
        Component: BookDetail,
      },
      {
        path: "books",
        children: [
          {
            index: true,
            Component: BookListPage,
          },
          {
            path: ":bookId",
            Component: BookDetail,
          },
        ],
      },
      {
        path: "borrow",
        Component: BorrowBookList,
      },
    ],
  },
]);
