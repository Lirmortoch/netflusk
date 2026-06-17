import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { handleSetTheme } from '../store/appReducer';

export const useAppTheme = () => {
  const dispatch = useDispatch();
  const themePreference = useSelector(({ appSettings }) => appSettings.theme);

  useEffect(() => {
    const localTheme = localStorage.getItem('app-theme');
    dispatch(handleSetTheme(localTheme || 'system'));
  }, [dispatch]);

  useEffect(() => {
    if (!themePreference) return;

    const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');

    const applyResolvedTheme = () => {
      let resolvedTheme;

      if (themePreference === 'system') {
        resolvedTheme = mediaQueryObj.matches ? 'dark' : 'light';
      } else {
        resolvedTheme = themePreference;
      }

      document.body.style.colorScheme = resolvedTheme;
    };

    applyResolvedTheme();

    const handleSystemThemeChange = () => {
      if (themePreference === 'system') {
        applyResolvedTheme();
      }
    };

    mediaQueryObj.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQueryObj.removeEventListener('change', handleSystemThemeChange);
    }
  }, [themePreference]);

  return themePreference;
}