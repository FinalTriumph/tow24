'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const COOKIE_NAME = 'tow24_cookie_notice';

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export default function CookieBanner({ t, privacyUrl }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      setTimeout(() => setVisible(true), 900);
    }
  }, []);

  function dismiss() {
    setCookie(COOKIE_NAME, '1', 365);
    setVisible(false);
  }

  return (
    <div className={`cookie-banner${visible ? ' show' : ''}`} role="region" aria-label="Cookie notice">
      <p>
        {t.message}{' '}
        <Link href={privacyUrl}>{t.privacy}</Link>.
      </p>
      <button className="btn-cookie-dismiss" onClick={dismiss}>
        {t.dismiss}
      </button>
    </div>
  );
}
