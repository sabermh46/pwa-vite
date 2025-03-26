import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {initializeTheme } from "../../features/theme/themeSlices"

const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return null;
};

export default ThemeInitializer;