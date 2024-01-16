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
            <h3>{DataAboutCourse[lan].title}</h3>
            <p className={style.title}>{DataAboutCourse[lan].p1}</p>
            <p className={style.texte}>{DataAboutCourse[lan].p2}</p>
            <p className={style.list}>{DataAboutCourse[lan].p3}</p>
          </div>
          <p className={style.logo__wrapper}>
            <img src={Rss} className={style.logorss} alt="logorss" />
          </p>
        </div>
      </div>
    </>
  );
}

export { AboutCourse };
