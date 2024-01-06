import { DataAboutCourse } from '../../utils/data/DataAbout';
import style from './AboutCouse.module.css';
import Rss from '../../assets/logo/RSS.png';
import { useLanguage } from '../../context/contextLanguage';

function AboutCourse() {
  const { lan } = useLanguage();
  return (
    <>
      <div data-testid="about_course" className={style.container}>
        <div className={style.wrapper}>
          <div className={style.text}>
            <h3>{lan === 'en' ? 'About Course' : 'О курсе'}</h3>
            <p className={style.title}>
              {lan === 'en' ? DataAboutCourse.en.p1 : DataAboutCourse.ru.p1}
            </p>
            <p className={style.texte}>
              {lan === 'en' ? DataAboutCourse.en.p2 : DataAboutCourse.ru.p2}
            </p>
            <p className={style.list}>
              {lan === 'en' ? DataAboutCourse.en.p3 : DataAboutCourse.ru.p3}
            </p>
          </div>
          <p className={style.logo__wrapper}>
            <img src={Rss} className={style.logorss} alt="logorss" />
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutCourse;
