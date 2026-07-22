import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './assets/reset.css';
import './App.css';

import Header from './components/Header/Header';
import { useAppTheme } from './hooks/useAppTheme';

import { createGuestSession } from './store/guestSessionReducer';

function App() {
  const dispatch = useDispatch();
  const { guestSession, status, error, } = useSelector(({ guestSession }) => guestSession);

  useAppTheme();

  useEffect(() => {
    dispatch(createGuestSession());
  }, [dispatch]);

  if (status === 'loading') return <p>Загрузка...</p>;
  if (status === 'failed') return <p>Ошибка: {error}</p>;

  return (
    <>
      <div className="wrap">
        <Header />

        
      </div>
    </>
  )
}

export default App