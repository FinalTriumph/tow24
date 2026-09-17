import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '../../lib/locales';
import RevealWrapper from '../../components/RevealWrapper';
import { Icon } from '../../components/Icons';

// WhatsApp SVG icon (official brand shape)
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function HomePage({ params: { locale } }) {
  setRequestLocale(locale);

  const tHero     = await getTranslations({ locale, namespace: 'hero' });
  const tServices = await getTranslations({ locale, namespace: 'services' });
  const tWhy      = await getTranslations({ locale, namespace: 'why' });
  const tGallery  = await getTranslations({ locale, namespace: 'gallery' });
  const tCta      = await getTranslations({ locale, namespace: 'cta' });
  const tContact  = await getTranslations({ locale, namespace: 'contact' });

  const services = tServices.raw('items');
  const whyItems = tWhy.raw('items');

  const galleryItems = [
    { cls: 'g1' }, { cls: 'g2' }, { cls: 'g3' }, { cls: 'g4' }, { cls: 'g5' },
  ];

  const phone = process.env.PHONE;
  const phoneUrl = phone ? `tel:+${phone}` : '#';

  const whatsappPhone = process.env.WHATSAPP_PHONE;
  const whatsappUrl = whatsappPhone ? `https://wa.me/${whatsappPhone}` : '#';

  const contactItems = [
    { icon: 'phone',    label: tContact('phoneLbl'), value: phone ? `+${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6)}` : '#', href: phoneUrl, className: 'contact-phone' },
    { icon: 'email',    label: tContact('emailLbl'), value: tContact('emailVal'), href: 'mailto:info@tow24.is', className: '' },
    { icon: 'location', label: tContact('areaLbl'),  value: tContact('areaVal'),  href: null,                 className: '' },
    { icon: 'clock',    label: tContact('hoursLbl'), value: tContact('hoursVal'), href: null,                 className: '' },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              🚛 {tHero('badge')}
            </div>

            {/* Title: Tow (red) / 24 (yellow) / subtitle (white) */}
            <h1 className="hero-title">
              <span className="word-tow">Tow</span>
              <span className="word-24">24</span>
              <span className="line2">{tHero('line2')}</span>
            </h1>

            <p className="hero-sub">{tHero('sub')}</p>
            <div className="hero-cta">
              <a href={phoneUrl} className="btn-call">
                <Icon name="phone" size={20} />
                {tHero('callNow')}
              </a>
              <a
                href={whatsappUrl}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp />
                {tHero('whatsapp')}
              </a>
              <a href="#services" className="btn-scroll">
                {tHero('ourServices')}
              </a>
            </div>
            <div className="hero-stats">
              {[
                [tHero('stat1num'), tHero('stat1lbl')],
                [tHero('stat2num'), tHero('stat2lbl')],
                [tHero('stat3num'), tHero('stat3lbl')],
              ].map(([num, lbl], i) => (
                <div key={i} className="stat-item">
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="services-section" id="services">
        <div className="container">
          <RevealWrapper>
            <span className="section-label">{tServices('label')}</span>
            <h2 className="section-title">{tServices('title')}</h2>
            <p className="section-desc">{tServices('desc')}</p>
          </RevealWrapper>
          <div className="services-grid">
            {services.map((s, i) => (
              <RevealWrapper key={i}>
                <div className="service-card">
                  <div className="service-icon"><Icon name={s.icon} size={24} /></div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-price">{s.price}<span>{s.unit}</span></div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="why-section" id="why">
        <div className="container">
          <RevealWrapper>
            <span className="section-label">{tWhy('label')}</span>
            <h2 className="section-title">{tWhy('title')}</h2>
            <p className="section-desc">{tWhy('desc')}</p>
          </RevealWrapper>
          <div className="why-grid">
            {whyItems.map((w, i) => (
              <RevealWrapper key={i}>
                <div className="why-card">
                  <div className="why-num">0{i + 1}</div>
                  <div className="why-title">{w.title}</div>
                  <p className="why-text">{w.text}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────── */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <RevealWrapper>
            <span className="section-label">{tGallery('label')}</span>
            <h2 className="section-title">{tGallery('title')}</h2>
          </RevealWrapper>
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className={`gallery-item ${item.cls}`}>
                <div className="gallery-placeholder">
                  <Icon name="truck" size={36} />
                  <span>{tGallery('placeholder')} {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner">
            <div>
              <div className="cta-title">{tCta('title')}</div>
              <div className="cta-sub">{tCta('sub')}</div>
            </div>
            <a href={phoneUrl} className="btn-call-dark">
              <Icon name="phone" size={20} />{tCta('callNow')}
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="contact-section" id="contact">
        <div className="container">
          <RevealWrapper>
            <span className="section-label">{tContact('label')}</span>
            <h2 className="section-title">{tContact('title')}</h2>
          </RevealWrapper>
          <div className="contact-grid">
            <div className="contact-info">
              {contactItems.map((item, i) => {
                const inner = (
                  <>
                    <div className="contact-icon"><Icon name={item.icon} size={18} /></div>
                    <div>
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-value">{item.value}</div>
                    </div>
                  </>
                );
                return (
                  <RevealWrapper key={i}>
                    {item.href
                      ? <a href={item.href} className={`contact-item${item.className ? ' ' + item.className : ''}`}>{inner}</a>
                      : <div className="contact-item">{inner}</div>
                    }
                  </RevealWrapper>
                );
              })}
            </div>
            <RevealWrapper>
              <div className="contact-map">
                <Icon name="map" size={36} />
                <span>Iceland</span>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <IconWhatsApp />
      </a>
    </>
  );
}
