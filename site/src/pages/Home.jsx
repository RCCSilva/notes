import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { groupBySection } from '../topics/registry';

export default function Home() {
  const { locale, t } = useI18n();
  return (
    <>
      <section className="hero">
        <h1>{t('ui.tagline')}</h1>
        <p>{t('ui.home.lead')}</p>
      </section>
      {groupBySection().map((section) => (
        <section key={section.id} className="home-section" aria-labelledby={`section-${section.id}`}>
          <h2 id={`section-${section.id}`} className="home-section-title">{t(`ui.home.sections.${section.id}.title`)}</h2>
          <p className="home-section-desc">{t(`ui.home.sections.${section.id}.desc`)}</p>
          <div className="cards">
            {section.topics.map((topic) => (
              <Link key={topic.id} to={`/${locale}/${topic.id}`} className="card topic-card">
                {topic.Art && <div className="card-art"><topic.Art /></div>}
                <div className="card-body">
                  <h3>{t(`${topic.id}.name`)}</h3>
                  <p>{t(`${topic.id}.blurb`)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
