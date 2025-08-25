import React from 'react';
import '../LegalPage.css';
import useT from '../../i18n/useT';

export default function TermsOfUse() {
  const t = useT();

  return (
    <div className="legal-container">
      <img src="/APADetector.png" alt="Logo APA Detector" style={{ height: 100, marginBottom: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      <h1>{t('legal.termsTitle')}</h1>
      <div className="legal-date">{t('legal.termsDate')}</div>

      <h2>{t('legal.termsSections.section1')}</h2>
      <p>{t('legal.termsSections.intro1')}</p>

      <h2>{t('legal.termsSections.section2')}</h2>
      <p>{t('legal.termsSections.desc1')}</p>
      <ul>
        {t('legal.termsSections.descList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <p><strong>{t('legal.termsSections.disclaimer')}</strong></p>

      <h2>{t('legal.termsSections.section3')}</h2>
      <p>{t('legal.termsSections.license1')}</p>
      <ul>
        {t('legal.termsSections.licenseList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h2>{t('legal.termsSections.section4')}</h2>
      <p>{t('legal.termsSections.conduct1')}</p>
      <ul>
        {t('legal.termsSections.conductList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h2>{t('legal.termsSections.section5')}</h2>
      <p>{t('legal.termsSections.userContent')}</p>

      <h2>{t('legal.termsSections.section6')}</h2>
      <p>{t('legal.termsSections.limitation1')}</p>
      <ul>
        {t('legal.termsSections.limitationList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <p>{t('legal.termsSections.limitation2')}</p>

      <h2>{t('legal.termsSections.section7')}</h2>
      <p>{t('legal.termsSections.modifications1')}</p>
      <ul>
        {t('legal.termsSections.modificationsList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <p>{t('legal.termsSections.modifications2')}</p>

      <h2>{t('legal.termsSections.section8')}</h2>
      <p>{t('legal.termsSections.law')}</p>

      <h2>{t('legal.termsSections.section9')}</h2>
      <p>{t('legal.termsSections.contact1')}</p>
      <ul>
        {t('legal.termsSections.contactList').map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}