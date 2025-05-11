import LogoIcon from '../ui/icons/LogoIcon';
import s from './Header.module.scss';

export default function Header() {
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.logoWrapper}>
          <a href='/'>
            <LogoIcon />
            AMMO MERCH
          </a>
        </div>
      </div>
    </div>
  );
}
