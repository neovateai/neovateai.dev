import { useState, useEffect } from 'react';

type Locale = 'en' | 'zh-CN';

const LOCALE_STORAGE_KEY = 'neovate-locale';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      if (storedLocale && (storedLocale === 'en' || storedLocale === 'zh-CN')) {
        setLocale(storedLocale);
      }
    }
  }, []);

  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  const getLocalizedUrl = (url: string) => {
    return url.replace(/^\/en\//, `/${locale}/`);
  };

  return {
    locale,
    updateLocale,
    getLocalizedUrl,
  };
}