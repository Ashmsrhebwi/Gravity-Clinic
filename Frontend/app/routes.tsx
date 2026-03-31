import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './Root';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy load the dashboard
const Dashboard = React.lazy(async () => ({ default: (await import('./pages/Dashboard')).Dashboard }));
const ArticleDetail = React.lazy(async () => ({ default: (await import('./pages/ArticleDetail')).ArticleDetail }));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).Home }) },
      { path: 'dental', element: <Navigate to="/" replace /> },
      { path: 'hair', element: <Navigate to="/" replace /> },
      { path: 'blog', lazy: async () => ({ Component: (await import('./pages/Articles')).Articles }) },
      { path: 'blog/:slug', element: <Suspense fallback={<div className="min-h-screen bg-[#F8F9FE]" />}><ArticleDetail /></Suspense> },
      { path: 'articles', element: <Navigate to="/blog" replace /> },
      { path: 'doctors', lazy: async () => ({ Component: (await import('./pages/Doctors')).Doctors }) },
      { path: 'appointment', lazy: async () => ({ Component: (await import('./pages/Booking')).Booking }) },
      { path: 'booking', element: <Navigate to="/appointment" replace /> },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).Contact }) },
      
      // Specialist Treatment Routes (Fixed Slug Mappings)
      { path: 'treatment/:slug', lazy: async () => ({ Component: (await import('./pages/TreatmentDetailPage')).TreatmentDetailPage }) },
      { path: 'contact-us', element: <Navigate to="/contact" replace /> },

      { path: 'hollywood-smile', element: <Navigate to="/treatment/hollywood-smile" replace /> },
      { path: 'hair/male', element: <Navigate to="/treatment/male-hair-transplant" replace /> },
      { path: 'hair/female', element: <Navigate to="/treatment/female-hair-transplant" replace /> },
      { path: 'hair/beard', element: <Navigate to="/treatment/beard-moustache-transplant" replace /> },
      { path: 'hair/eyebrow', element: <Navigate to="/treatment/eyebrow-transplant" replace /> },
      { path: 'login', lazy: async () => ({ Component: (await import('./pages/auth/Login')).Login }) },
      { path: 'otp', lazy: async () => ({ Component: (await import('./pages/auth/OTP')).OTP }) },
      { path: 'forgot-password', lazy: async () => ({ Component: (await import('./pages/auth/ForgotPassword')).ForgotPassword }) },
      { path: 'reset-password', lazy: async () => ({ Component: (await import('./pages/auth/ResetPassword')).ResetPassword }) },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={
          <div
            className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #1E1C4B 0%, #12112e 50%, #1a1040 100%)' }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(242,133,34,0.07) 0%, transparent 70%)' }}
            />
            <div className="absolute w-64 h-64 rounded-full border border-[#F28522]/15 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-48 h-48 rounded-full border border-[#F28522]/25 animate-ping" style={{ animationDuration: '2.4s', animationDelay: '0.4s' }} />
            <div className="absolute w-36 h-36 rounded-full border border-[#F28522]/40 animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.8s' }} />
            <div
              className="relative z-10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-7 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(242,133,34,0.25)',
                boxShadow: '0 0 36px rgba(242,133,34,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-2xl font-black tracking-tighter text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>GC</span>
            </div>
            <p className="relative z-10 text-[10px] font-black tracking-[0.4em] uppercase text-white/25 mb-2">Gravity Clinic</p>
            <p className="relative z-10 text-sm font-medium text-white/40" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Preparing your experience&hellip;</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(242,133,34,0.8) 50%, transparent 100%)' }} />
            </div>
          </div>
        }>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
