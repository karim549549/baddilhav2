import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function useThemeTest() {
  const { theme, themeMode, isDark } = useTheme();

  useEffect(() => {
    console.log('Theme Test:', {
      theme,
      themeMode,
      isDark,
      timestamp: new Date().toISOString(),
    });
  }, [theme, themeMode, isDark]);

  return { theme, themeMode, isDark };
}
