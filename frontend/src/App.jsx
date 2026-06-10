import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLoader } from '@/components/common/PageLoader';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function LazyFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LazyFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            className:
              'glass-premium !text-slate-100 !rounded-2xl',
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}