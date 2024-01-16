import {
  DataAboutProgect,
  TitleAboutProject,
} from '../../utils/data/DataAbout';
import style from './AboutProject.module.css';
import Rss from '../../assets/logo/graphql-email-api.png';
import { useLanguage } from '../../context/contextLanguage';
import { PrintText } from '../../functions/TextAboutProject';

function AboutProject() {
  const { lan } = useLanguage();
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.text}>
            <h3> {TitleAboutProject[lan]}</h3>
            {PrintText(lan, DataAboutProgect)}
          </div>
          <p className={style.logo__wrapper}>
            <img src={Rss} className={style.logorss} alt="logorss" />
          </p>
        </div>
      </div>
    </>
  );
}

export { AboutProject };
