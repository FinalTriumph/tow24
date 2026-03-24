import { Icon } from './Icons';

const phone = process.env.PHONE;
const phoneUrl = phone ? `tel:+${phone}` : '#';

export default function Footer({ locale, t, privacyUrl }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">TOW<span>24</span></div>
            <div className="footer-tagline">{t.tagline}</div>
          </div>
          <div className="footer-links">
            <a href={`/${locale}#services`}>{t.services}</a>
            <a href={`/${locale}#contact`}>{t.contact}</a>
            <a href={privacyUrl}>{t.privacy}</a>
          </div>
          <div>
            <a href={phoneUrl} className="btn-call" style={{ fontSize: '1rem', padding: '14px 24px' }}>
              <Icon name="phone" size={18} />
              {t.callNow}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">{t.copy}</span>
          <div className="footer-legal">
            <a href={privacyUrl}>{t.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
