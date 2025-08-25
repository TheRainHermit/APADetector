import React from 'react';
import '../LegalPage.css';
import useT from '../../i18n/useT';

export default function PrivacyPolicy() {
  const t = useT();

  return (
    <div className="legal-container">
      <img src="/APADetector.png" alt="Logo APA Detector" style={{ height: 100, marginBottom: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      <h1>{t('legal.privacyTitle')}</h1>
      <div className="legal-date">{t('legal.privacyDate')}</div>

      <h2>{t('legal.privacySections.section1')}</h2>
      <p>{t('legal.privacySections.intro1')}</p>
      <p>{t('legal.privacySections.intro2')}</p>

      <h2>{t('legal.privacySections.section2')}</h2>
      <p>{t('legal.privacySections.info1')}</p>
      <ul>
        {t('legal.privacySections.infoList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h2>{t('legal.privacySections.section3')}</h2>
      <p>{t('legal.privacySections.use1')}</p>
      <ul>
        {t('legal.privacySections.useList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h2>{t('legal.privacySections.section4')}</h2>
      <p>{t('legal.privacySections.share1')}</p>
      <p>{t('legal.privacySections.share2')}</p>

      <h2>{t('legal.privacySections.section5')}</h2>
      <p>{t('legal.privacySections.security')}</p>

      <h2>{t('legal.privacySections.section6')}</h2>
      <p>{t('legal.privacySections.rights1')}</p>
      <ul>
        {t('legal.privacySections.rightsList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <p>{t('legal.privacySections.rights2')}</p>

      <h2>{t('legal.privacySections.section7')}</h2>
      <p>{t('legal.privacySections.changes')}</p>

      <h2>{t('legal.privacySections.section8')}</h2>
      <p>{t('legal.privacySections.contact1')}</p>
      <ul>
        {t('legal.privacySections.contactList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}