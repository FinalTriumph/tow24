'use client';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '../lib/locales';

const LANG_LABELS = {
  is: { flag: '🇮🇸', label: 'IS' },
  en: { flag: '🇬🇧', label: 'EN' },
  ru: { flag: '🇷🇺', label: 'RU' },
  lv: { flag: '🇱🇻', label: 'LV' },
};
const LANG_COOKIE = 'tow24_lang';

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export default function Header({ locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLocaleSwitch(targetLocale) {
    setCookie(LANG_COOKIE, targetLocale, 365);
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = targetLocale;
    router.push('/' + segments.join('/'));
  }

  return (
    <header className="topbar">
      <div className="container">
        <div className="topbar-inner">
          {/* Logo: Tow (red) + 24 (yellow) + .is (red) */}
          <a href={`/${locale}`} className="logo" aria-label="Tow24.is — home">
            <span className="tow">Tow</span>
            <span className="num">24</span>
            <span className="tld">.is</span>
          </a>

          <div className="topbar-right">
            <nav className="lang-switcher" aria-label="Language">
              {locales.map(loc => (
                <button
                  key={loc}
                  onClick={() => handleLocaleSwitch(loc)}
                  className={locale === loc ? 'active' : ''}
                  aria-label={`Switch to ${LANG_LABELS[loc].label}`}
                >
                  <span className="lang-flag">{LANG_LABELS[loc].flag}</span>
                  <span className="lang-label">{LANG_LABELS[loc].label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
