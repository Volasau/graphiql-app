import style from './Footer.module.css';
import LogoRss from '../../../public/RSS.png';
import LogoGitHub from '../../../public/github-logo.png';

function Footer() {
  return (
    <>
      <div>&copy; 2023</div>

      {/*ссылка на github verapoletaeva87*/}
      <ul className={style.wrapper_link}>
        <li>
          <a
            href="https://github.com/verapoletaeva87"
            className={style.link_github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LogoGitHub} className={style.logogit} />
            <p>Poletaeva</p>
          </a>
        </li>
        {/*ссылка на github azimkhan93*/}
        <li>
          <a
            href="https://github.com/azimkhan93"
            className={style.link_github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LogoGitHub} className={style.logogit} />
            <span>Abdulsatarov</span>
          </a>
        </li>
        {/*ссылка на github Volasau*/}
        <li>
          <a
            href="https://github.com/Volasau/"
            className={style.link_github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LogoGitHub} className={style.logogit} />
            <p>Volasau</p>
          </a>
        </li>
      </ul>
      {/*ссылка на rrschool*/}
      <div className={style.logo_container}>
        <a
          href="https://rs.school/react/"
          className={style.logorss}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={LogoRss} className={style.logorss} />
        </a>
      </div>
    </>
  );
}

export default Footer;
