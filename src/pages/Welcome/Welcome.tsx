import AboutCourse from '../../components/AboutCourse/AboutCourse';
import AboutProject from '../../components/AboutProject/AboutProject';
import AboutUS from '../../components/AboutUS/AboutUS';
// import style from './Welcome.module.css';
function Welcome() {
  return (
    <>
      {/* <div className={style.container}> */}
      <AboutCourse />
      <AboutProject />
      <AboutUS />
      {/* </div> */}
    </>
  );
}

export default Welcome;
