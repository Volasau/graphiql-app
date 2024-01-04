import style from './Footer.module.css';
import LogoRss from '../../assets/logo/RSS.png';
import LogoGitHub from '../../assets/logo/github-logo.png';

function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div>&copy; 2023</div>
        <ul className={style.wrapper_link}>
          <li>
            <a
              href="https://github.com/verapoletaeva87"
              className={style.link_github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LogoGitHub} className={style.logogit} />
              <p className={style.link_name}>Poletaeva</p>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/azimkhan93"
              className={style.link_github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LogoGitHub} className={style.logogit} />
              <span className={style.link_name}>Abdulsatarov</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Volasau/"
              className={style.link_github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LogoGitHub} className={style.logogit} />
              <p className={style.link_name}>Volasau</p>
            </a>
          </li>
        </ul>
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
      </div>
    </>
  );
}

export default Footer;
