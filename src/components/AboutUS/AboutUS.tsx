import style from './AboutUS.module.css';
import Ryhor from '../../../public/photo/Ruhor.jpg';
import Azim from '../../../public/photo/Azim.jpg';
import Vera from '../../../public/photo/Vera.jpg';

function AboutUS() {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper_persone}>
          <div>
            <img src={Vera} className={style.photo} alt="" />
            <h3>Vera Poletaeva</h3>
            <p>
              I received a specialty related to computing systems at the
              aviation academy in Rybinsk. I have been working as a programmer
              since 2008. I developed a cost accounting system for the
              production of road vehicle parts. Then I worked on developing
              modules for Unigraphix - a 3D modeling system. For a five years I
              have been setting up the financial and budget control systems,
              developed printed forms and reports. Now I am a frontend
              developer. I like to learn something new.
            </p>
          </div>
        </div>
        {/*About Azim*/}
        <div className={style.wrapper_persone}>
          <div>
            <img src={Azim} className={style.photo} alt="" />
            <h3>Azimkhan Abdulsatarov</h3>
            <p>
              I am a finance professional and Power BI developer with more than
              7 years experience. Well-versed in building Statement of Income,
              Statement of Financial position and Statement of Cash Flow,
              consolidation, proficient user of 1C Accounting software,
              experienced in M and DAX language, connecting databases. Excellent
              analytical skills and knowledge in reporting. Audited banks, F&B
              and chemical production companies. Built financial system in a
              logistics company and successfully developed financial reports
              dashboard in Power BI.
            </p>
          </div>
        </div>
        {/*About Ryhor*/}
        <div className={style.wrapper_persone}>
          <div>
            <img src={Ryhor} className={style.photo} alt="" />
            <h3>Ryhor Volasau</h3>
            <p>
              I am 41 years old. Married, I have two children (boys). I am from
              Belarus, from the city of Gomel, but now I live in Georgia in the
              city of Batumi. After university, I sold auto parts in the market
              (17 years). In March 2022, I sold the entire business and moved to
              Georgia. I love sports, fishing and hunting. 2006 Gomel State
              Technical University named after. P.O. Sukhoi / Mechanical and
              technological University: Gomel State Technical University named
              after. P.O. Sukhoi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUS;
