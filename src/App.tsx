import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
