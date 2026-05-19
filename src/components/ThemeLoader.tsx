'use client';

import { useEffect } from 'react';
import { store } from '@/lib/pjlStore';

export default function ThemeLoader() {
  useEffect(() => {
    const applyTheme = () => {
      const theme = store.theme.get();
      if (theme) {
        document.documentElement.style.setProperty('--gold', theme.gold);
        document.documentElement.style.setProperty('--navy', theme.navy);
      }
    };

    applyTheme();

    // Listen to localStorage changes across tabs, or custom events from admin panel
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'pjl_theme') {
        applyTheme();
      }
    };

    // Custom event to handle in-tab immediate updates
    const handleCustomChange = () => applyTheme();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('pjl_theme_update', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pjl_theme_update', handleCustomChange);
    };
  }, []);

  return null;
}
