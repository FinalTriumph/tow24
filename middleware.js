import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/locales';

const LANG_COOKIE = 'tow24_lang';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // all locales have prefix: /is, /en, /ru, /lv
});

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // For the bare root path only: read cookie and redirect to the right locale
  if (pathname === '/') {
    const cookieLang = request.cookies.get(LANG_COOKIE)?.value;
    const locale = locales.includes(cookieLang) ? cookieLang : defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = '/' + locale;
    return NextResponse.redirect(url);
  }

  // For all other paths, let next-intl handle locale detection and routing
  const response = intlMiddleware(request);

  // If the URL starts with a valid locale, save it to cookie
  const segments = pathname.split('/').filter(Boolean);
  if (locales.includes(segments[0])) {
    response.cookies.set(LANG_COOKIE, segments[0], {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|favicon\\.ico|images|.*\\..*).*)', '/'],
};
