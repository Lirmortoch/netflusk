import { useEffect, useRef, lazy, Suspense } from 'react';
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';

import { useAppTheme } from './hooks/useAppTheme';

import { createGuestSession, handleClearGuestSession, setGuestSession } from './store/guestSessionReducer';
import { handleRestoreSession } from './store/loginSessionReducer';

import Home from './pages/Home/Home';

import { getJSON } from './utils/utils';

const ConfirmAccount = lazy(() => delayForDemo(import('./components/AuthComponents/ConfirmAccount')));
const AuthCallback = lazy(() => delayForDemo(import('./components/AuthComponents/AuthCallback')));

function App() {
  const dispatch = useDispatch();
  
  useAppTheme();

  const initStarted = useRef(false);

  useEffect(() => {
    if (initStarted.current) return;
    if (window.location.pathname === '/auth/callback') return;
    initStarted.current = true;

    const initSession = async () => {
      const authed = await dispatch(handleRestoreSession());

      if (authed) {
        dispatch(handleClearGuestSession());
        return;
      }
      
      const savedGuestSession = getJSON('tmdb_guest_session');
      const expiresAt = savedGuestSession?.expires_at
        ? new Date(savedGuestSession.expires_at.replace(' UTC', 'Z').replace(' ', 'T'))
        : null;

      if (expiresAt && expiresAt > new Date()) {
        const payload = {
          guestSession: savedGuestSession,
          status: 'guestSession-succeeded',
          error: null,
        }
        dispatch(setGuestSession(payload));
      }
      else dispatch(createGuestSession());
    }

    initSession();
  }, [dispatch]);

  return (
    <>
      <div className="wrap">
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/confirm-account/:request_token' element={
            <Suspense fallback={<div className='loader-1'></div>}>
              <ConfirmAccount />
            </Suspense>
          } />
          <Route path='/auth/callback' element={
            <Suspense fallback={<div className='loader-1'></div>}>
              <AuthCallback />
            </Suspense>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App