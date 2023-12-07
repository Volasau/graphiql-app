import { DataAboutCourse } from '../../utils/data/DataAbout';
import style from './AboutCouse.module.css';
import Rss from '../../../public/RSS.png';
import { useLanguage } from '../../context/contextLanguage';

function AboutCourse() {
  const { lan } = useLanguage();
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.text}>
            <h3>{lan === 'en' ? 'About Course' : 'О курсе'}</h3>
            <p>
              {lan === 'en'
                ? DataAboutCourse.en.discription
                : DataAboutCourse.ru.discription}
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
