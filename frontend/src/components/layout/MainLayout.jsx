import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import Footer from './Footer'; // If you create one

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 'var(--spacing-unit)', paddingBottom: 'var(--spacing-unit)' }}>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Set to dark theme for consistency
      />
      {/* <Footer /> */}
    </>
  );
};
export default MainLayout;