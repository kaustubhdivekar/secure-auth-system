// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('./pages/Auth/ResetPasswordPage.jsx'));
const VerifyEmailPage = lazy(() => import('./pages/Auth/VerifyEmailPage.jsx'));
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage.jsx'));
const UnauthorizedPage = lazy(() => import('./pages/Status/UnauthorizedPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/Status/NotFoundPage.jsx'));
const ContactUsPage = lazy(() => import('./pages/ContactUs/ContactUsPage.jsx'));
// const AdminPage = lazy(() => import('./pages/Admin/AdminPage.jsx'));
const BlogListingPage = lazy(() => import('./pages/Blog/BlogListingPage.jsx'));
const BlogDetailsPage = lazy(() => import('./pages/Blog/BlogDetailsPage.jsx'));
const CreateBlogPage = lazy(() => import('./pages/Blog/CreateBlogPage.jsx')); // Content Creator page


const LoadingFallback = () => <div style={{ textAlign: 'center', color: 'var(--color-text-primary)', marginTop: '60px', fontSize: '1.5rem' }}>Loading Page...</div>;

function App() {
  const { isLoading: isAuthContextLoading } = useAuth();

  if (isAuthContextLoading) { // Prevents route rendering before auth state is known
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} /> {/* Dashboard is protected */}
          </Route>

          {/* Example Role-Specific Protected Route */}
          {/* <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route> */}

          <Route element={<ProtectedRoute allowedRoles={['Content Creator']} />}>
            <Route path="/blogs/create" element={<CreateBlogPage />} />
          </Route>
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;