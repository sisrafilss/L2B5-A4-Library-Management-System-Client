import App from "@/App";
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
        path: "books",
        Component: BookListPage,
      },
      {
        path: "borrow",
        Component: BorrowBookList,
      },
    ],
  },
]);
