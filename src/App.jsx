import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './assets/reset.css';
import './App.css';

import Header from './components/Header';
import { useAppTheme } from './hooks/useAppTheme';

function App() {
  useAppTheme();

  return (
    <>
      <div className="wrap">
        <Header />

        
      </div>
    </>
  )
}

export default App