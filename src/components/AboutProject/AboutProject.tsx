import { DataAboutProgect } from '../../utils/data/DataAbout';
import style from './AboutProject.module.css';
import Rss from '../../assets/logo/graphql-email-api.png';
import { useLanguage } from '../../context/contextLanguage';

function AboutProject() {
  const { lan } = useLanguage();
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.text}>
            <h3> {lan === 'en' ? 'GraphiQL Project' : 'GraphiQL Проект'}</h3>
            {lan === 'en'
              ? DataAboutProgect.en.map((paragraph, index) => (
                  <p key={index} className={style[index]}>
                    {paragraph}
                  </p>
                ))
              : DataAboutProgect.ru.map((paragraph, index) => (
                  <p key={index} className={style[index]}>
                    {paragraph}
                  </p>
                ))}
          </div>
          <p className={style.logo__wrapper}>
            <img src={Rss} className={style.logorss} alt="logorss" />
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutProject;
