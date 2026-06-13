import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { handleSetTheme } from '../store/appReducer';

const handleSystemThemeChange = e => {
  const hasLocalTheme = localStorage.getItem('app-theme') !== null;

  if (hasLocalTheme) {
    const newSystemTheme = e.matches ? 'light' : 'dark';
    dispatch(handleSetTheme(newSystemTheme));
  }
}

export const useAppTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(({ appSettings }) => appSettings.theme);

  useEffect(() => {
    const localTheme = localStorage.getItem('app-theme');
    const mediaQueryObj = window.matchMedia('(prefers-color-scheme: light)');
    const browserPreference = mediaQueryObj.matches ? 'light' : 'dark';
    const initialTheme = localTheme !== null ? localTheme : browserPreference;

    dispatch(handleSetTheme(initialTheme));
  }, [dispatch]);
  useEffect(() => {
    if (!theme) return;

    document.body.style.colorScheme = theme;

    const mediaQueryObj = window.matchMedia('(prefers-color-scheme: light)');

    mediaQueryObj.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQueryObj.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme, dispatch]);

  return theme;
}