import { motion } from 'motion/react';
import MilitaryButton from '../ui/MilitaryButton/MilitaryButton';
import s from './Feedback.module.scss';
import ModalDialog from '../ModalDialog/ModalDialog';
import { useState } from 'react';

export default function Feedback() {
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
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.6 }}
          exit={{ scale: 2 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className={s.wrapper}>
            <h2>Остались вопросы? Свяжитесь с нами</h2>
            <MilitaryButton onClick={handleModal} className={s.button} name='Связаться' />
          </div>
        </motion.div>
      </div>
      <ModalDialog show={isShow} onClose={closeModal} />
    </>
  );
}
