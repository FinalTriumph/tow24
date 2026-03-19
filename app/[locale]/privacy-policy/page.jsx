import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { locales } from '../../../lib/locales';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: `${t('title')} – TOW24` };
}

export default async function PrivacyPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  const homeUrl = `/${locale}`;

  const sections = [
    { title: t('s1title'), content: t('s1'), type: 'p' },
    { title: t('s2title'), intro: t('s2intro'), items: t.raw('s2items'), type: 'list' },
    { title: t('s3title'), intro: t('s3intro'), items: t.raw('s3items'), type: 'list' },
    { title: t('s4title'), p1: t('s4p1'), items: t.raw('s4items'), p2: t('s4p2'), type: 'list2' },
    { title: t('s5title'), content: t('s5'), type: 'p' },
    { title: t('s6title'), content: t('s6'), type: 'p' },
    { title: t('s7title'), content: t('s7'), type: 'p' },
    { title: t('s8title'), content: t('s8'), type: 'p' },
    { title: t('s9title'), content: t('s9'), type: 'p' },
    { title: t('s10title'), content: t('s10'), type: 'p' },
  ];

  return (
    <div className="container">
      <div className="policy-page">
        <Link href={homeUrl} className="back-link">{t('backHome')}</Link>
        <h1>{t('title')}</h1>
        <span className="policy-date">{t('updated')}</span>

        {sections.map((s, i) => (
          <div key={i}>
            <h2>{s.title}</h2>
            {s.type === 'p' && <p>{s.content}</p>}
            {s.type === 'list' && (
              <>
                <p>{s.intro}</p>
                <ul>{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </>
            )}
            {s.type === 'list2' && (
              <>
                <p>{s.p1}</p>
                <ul>{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                <p>{s.p2}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
