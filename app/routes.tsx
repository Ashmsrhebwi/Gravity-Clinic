import { createBrowserRouter } from 'react-router';
import { Root } from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).Home }) },
      { path: 'dental', lazy: async () => ({ Component: (await import('./pages/Dental')).Dental }) },
      { path: 'hair', lazy: async () => ({ Component: (await import('./pages/Hair')).Hair }) },
      { path: 'articles', lazy: async () => ({ Component: (await import('./pages/Articles')).Articles }) },
      { path: 'doctors', lazy: async () => ({ Component: (await import('./pages/Doctors')).Doctors }) },
      { path: 'booking', lazy: async () => ({ Component: (await import('./pages/Booking')).Booking }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).Contact }) },
    ],
  },
]);
