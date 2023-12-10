import AboutCourse from '../../components/AboutCourse/AboutCourse';
import AboutProject from '../../components/AboutProject/AboutProject';
import AboutUS from '../../components/AboutUS/AboutUS';
import WelcomeLinks from '../../components/WelcomeLinks/WelcomeLinks';
import { useLanguage } from '../../context/contextLanguage';
import style from './Welcome.module.css';
function Welcome() {
  const { lan } = useLanguage();

  return (
    <>
      <WelcomeLinks />
      <AboutCourse />
      <AboutProject />
      <h2 className={style.develops}>
        {lan === 'en' ? 'Project developers' : 'Разработчики проекта'}
      </h2>
      <AboutUS />
    </>
  );
}

export default Welcome;
