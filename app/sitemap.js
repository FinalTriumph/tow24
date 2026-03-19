export default function sitemap() {
  const base = 'https://tow24.is';
  const locales = ['is', 'en', 'ru', 'lv'];
  const pages = ['', '/privacy-policy'];

  return locales.flatMap(locale =>
    pages.map(page => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'monthly' : 'yearly',
      priority: page === '' ? (locale === 'is' ? 1.0 : 0.9) : 0.3,
    }))
  );
}
