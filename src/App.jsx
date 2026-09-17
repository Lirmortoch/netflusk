import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate, useParams } from 'react-router-dom';

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';
import Loading from './components/ui/Loading/Loading';
import { useAppTheme } from './hooks/useAppTheme';

import { createGuestSession } from './store/guestSessionReducer';

function ConfirmAccount() {
  const { request_token } = useParams();

  useEffect(() => {
    const approvalUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
    window.location.href = approvalUrl;
  }, []);

  return null;
}

function App() {
  const dispatch = useDispatch();

  useAppTheme();

  useEffect(() => {
    dispatch(createGuestSession());
  }, [dispatch]);

  return (
    <>
      <div className="wrap">
        <Header />

        <Routes>
          <Route path='/confirm-account/:request_token' element={<ConfirmAccount />} />
          <Route path='/auth/callback' element={<Loading />} />
        </Routes>
      </div>
    </>
  )
}

export default App