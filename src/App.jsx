import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';
import { useAppTheme } from './hooks/useAppTheme';

import { createGuestSession } from './store/guestSessionReducer';

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
          <Route path='/confirm-account:request_token' Component={() => {
            const approvalUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(window.location.origin + '/')}`;
            window.location.href = approvalUrl;

            return null;
          }} />
        </Routes>
      </div>
    </>
  )
}

export default App