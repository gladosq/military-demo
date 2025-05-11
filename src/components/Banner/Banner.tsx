import s from './Banner.module.scss';
import BannerImg from './../../../public/images/banner.png';
import MilitaryButton from '../ui/MilitaryButton/MilitaryButton';
import ModalDialog from '../ModalDialog/ModalDialog';
import { useState } from 'react';

export default function Banner() {
  const [isShow, setIsShow] = useState(false);
  const handleModal = () => {
    setIsShow(!isShow);
  };

  const closeModal = () => {
    setIsShow(false);
  };

  return (
    <>
      <div className={s.root}>
        <div className={s.wrapper}>
          <h1>Новый облик силы и надежности</h1>
          <MilitaryButton onClick={handleModal} className={s.button} name='Узнать больше' />
        </div>
        <img className={s.image} src={BannerImg} alt='Изображение шлема' />
      </div>
      <ModalDialog show={isShow} onClose={closeModal} />
    </>
  );
}
