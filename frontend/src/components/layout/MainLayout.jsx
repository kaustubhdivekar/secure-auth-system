import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer'; // If you create one

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 'var(--spacing-unit)', paddingBottom: 'var(--spacing-unit)' }}>
        <Outlet /> {/* Child routes will render here */}
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default MainLayout;