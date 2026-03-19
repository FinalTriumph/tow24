import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../lib/locales';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CookieBanner from '../../components/CookieBanner';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  if (!locales.includes(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('title'), description: t('description') };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const tFooter = await getTranslations({ locale, namespace: 'footer' });
  const tCookie = await getTranslations({ locale, namespace: 'cookie' });
  const tCta    = await getTranslations({ locale, namespace: 'cta' });

  // All URLs now always include locale prefix
  const privacyUrl = `/${locale}/privacy-policy`;

  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer
        locale={locale}
        t={{
          tagline:  tFooter('tagline'),
          services: tFooter('services'),
          contact:  tFooter('contact'),
          privacy:  tFooter('privacy'),
          copy:     tFooter('copy'),
          callNow:  tCta('callNow'),
        }}
      />
      <CookieBanner
        t={{
          message: tCookie('message'),
          privacy: tCookie('privacy'),
          dismiss: tCookie('dismiss'),
        }}
        privacyUrl={privacyUrl}
      />
    </>
  );
}
