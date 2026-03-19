import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './locales';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale) ? locale : defaultLocale;
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
