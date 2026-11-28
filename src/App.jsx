import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';
import Loader1 from './components/ui/Loaders/Loader1';

import { useAppTheme } from './hooks/useAppTheme';

import Home from './pages/Home/Home';

import useInitSession from './hooks/useInitSession';

const ConfirmAccount = lazy(() => import('./components/AuthComponents/ConfirmAccount'));
const AuthCallback = lazy(() => import('./components/AuthComponents/AuthCallback'));

function App() {
  useAppTheme();
  useInitSession();

  return (
    <>
      <div className="wrap">
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/confirm-account/:request_token' element={
            <Suspense fallback={<Loader1 />}>
              <ConfirmAccount />
            </Suspense>
          } />
          <Route path='/auth/callback' element={
            <Suspense fallback={<Loader1 />}>
              <AuthCallback />
            </Suspense>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App