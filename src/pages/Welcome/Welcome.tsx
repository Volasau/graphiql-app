import AboutCourse from '../../components/AboutCourse/AboutCourse';
import AboutProject from '../../components/AboutProject/AboutProject';
import AboutUS from '../../components/AboutUS/AboutUS';
import WelcomeLinks from '../../components/WelcomeLinks/WelcomeLinks';
import style from './Welcome.module.css';

function Welcome() {
  return (
    <>
      <div data-testid="welcome" className={style.wrapper}>
        <WelcomeLinks />
        <AboutCourse />
        <AboutProject />
        <AboutUS />
      </div>
    </>
  );
}

export default Welcome;
