import LogoIcon from '../ui/icons/LogoIcon';
import s from './Footer.module.scss';
import BannerImg from './../../../public/images/banner.png';

export default function Footer() {
  return (
    <div className={s.root}>
      <img className={s.image} src={BannerImg} alt='' />
      <div className={s.wrapper}>
        <div className={s.logoWrapper}>
          <a href='/'>
            <LogoIcon />
            AMMO MERCH
          </a>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem
          placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
          vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.
          Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos.
        </p>
      </div>
    </div>
  );
}
