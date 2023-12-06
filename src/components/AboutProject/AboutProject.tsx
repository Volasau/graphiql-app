import { DataAboutProgect } from '../../utils/data/DataAbout';
import style from './AboutProject.module.css';
import Rss from '../../../public/graphql-email-api.png';

function AboutProject() {
  const lan = 'en';
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.text}>
            <h3>GraphiQL Project</h3>
            <p>
              {lan === 'en'
                ? DataAboutProgect.en.discription
                : DataAboutProgect.ru.discription}
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

export default AboutProject;
