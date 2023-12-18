import style from './AboutUS.module.css';
import Ryhor from '../../assets/photo/Ruhor.jpg';
import Azim from '../../assets/photo/Azim.jpg';
import Vera from '../../assets/photo/Vera.jpg';
import { DataAboutUs } from '../../utils/data/DataAbout';
import { useLanguage } from '../../context/contextLanguage';

function AboutUS() {
  const { lan } = useLanguage();

  return (
    <>
      <div className={style.wrapper}>
        <h2 className={style.develops}>
          {lan === 'en' ? 'Project developers' : 'Разработчики проекта'}
        </h2>
        <div className={style.container}>
          <div className={style.wrapper_persone}>
            <div>
              <img src={Vera} className={style.photo} alt="" />
              <h3>{lan === 'en' ? 'Vera Poletaeva' : 'Вера Полетаева'}</h3>
              <p>{lan === 'en' ? DataAboutUs.en.vera : DataAboutUs.ru.vera}</p>
            </div>
          </div>
          {/*About Azim*/}
          <div className={style.wrapper_persone}>
            <div>
              <img src={Azim} className={style.photo} alt="" />
              <h3>
                {lan === 'en'
                  ? 'Azimkhan Abdulsatarov'
                  : 'Азимхан Абдулсатаров'}
              </h3>
              <p>{lan === 'en' ? DataAboutUs.en.azim : DataAboutUs.ru.azim}</p>
            </div>
          </div>
          {/*About Ryhor*/}
          <div className={style.wrapper_persone}>
            <div>
              <img src={Ryhor} className={style.photo} alt="" />
              <h3>{lan === 'en' ? 'Ryhor Volasau' : 'Григорий Волосов'}</h3>
              <p>
                {lan === 'en' ? DataAboutUs.en.ryhor : DataAboutUs.ru.ryhor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUS;
