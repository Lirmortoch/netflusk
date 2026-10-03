import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate, useParams, replace } from 'react-router-dom';

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';
import Modal from './components/ui/Modal/Modal';
import Loading from './components/ui/Loading/Loading';

import { useAppTheme } from './hooks/useAppTheme';

import { createGuestSession, handleClearGuestSession, setGuestSession } from './store/guestSessionReducer';
import { createSession, getUserData, handleRestoreSession } from './store/loginSessionReducer';
import { handleSetHasAuth } from './store/appReducer';
import Home from './pages/Home';

import { getJSON } from './utils/utils';

function ConfirmAccount({}) {
  const { request_token } = useParams();

  useEffect(() => {
    const approvalUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
    window.location.href = approvalUrl;
  }, []);

  return null;
}

function AuthCallback({}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasStarted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finishAuth = async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const rawToken = localStorage.getItem('tmdb_req_token');   
    if (!rawToken) {
      setIsOpen(false);
      navigate('/');
      return;
    }

    const token = JSON.parse(rawToken);

    try {
      const session = await dispatch(createSession(token.request_token)).unwrap();

      if (!session.success) {
        throw new Error(`Can't create new session: ${session.error}`);
      }

      const user = await dispatch(getUserData(session.session_id)).unwrap();

      if (user.id) {
        localStorage.removeItem('tmdb_req_token');

        dispatch(handleSetHasAuth(true));
      }
      else dispatch(handleSetHasAuth(false));
    }
    catch (err) {
      dispatch(handleSetHasAuth(false));
      throw new Error(`Can't auth user: ${err.error}`);
    }
    finally {
      setIsOpen(false);
      navigate('/');
    }
  }
  const cleanupAuth = async () => {
    localStorage.removeItem('tmdb_req_token')
  }

  return (
    <Modal open={isOpen} >
      <Loading callback={finishAuth} cleanupFnc={cleanupAuth}>
        <div className='loader'></div>
      </Loading>
    </Modal>
  );
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useAppTheme();

  const initStarted = useRef(false);

  useEffect(() => {
    if (initStarted.current) return;
    initStarted.current = true;

    const initSession = async () => {
      const authed = await dispatch(handleRestoreSession());

      if (authed) {
        dispatch(handleClearGuestSession());
        return;
      }
      
      const savedGuestSession = getJSON('tmdb_guest_session');
      const expiresAt = savedGuestSession && new Date(savedGuestSession.expires_at.replace(' UTC', 'Z').replace(' ', 'T'));

      if (expiresAt && expiresAt > new Date()) {
        const payload = {
          guestSession: savedGuestSession,
          status: 'guestSession-succeeded',
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

          <Route path='/confirm-account/:request_token' element={<ConfirmAccount />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
        </Routes>
      </div>
    </>
  )
}

export default App