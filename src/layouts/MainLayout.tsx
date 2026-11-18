import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-6">
      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;