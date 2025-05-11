import { AnimatePresence, motion } from 'motion/react';
import s from './ModalDialog.module.scss';
import { Form, Input, message, Modal, Select, Slider } from 'antd';
import MilitaryButton from '../ui/MilitaryButton/MilitaryButton';
import CloseIcon from '../ui/icons/CloseIcon';

export default function ModalDialog({ show, onClose }: { show: boolean; onClose: () => void }) {
  const onFinish = async () => {
    onClose();
    message.success('Форма успешно отправлена');
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className={s.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key='box'
            onClick={(e) => e.stopPropagation()}
          >
            <div className={s.root}>
              <button className={s.closeButton} onClick={onClose}>
                <CloseIcon />
              </button>
              <div className={s.form}>
                <p className={s.headerCaption}>
                  Пожалуйста, заполните эту форму, чтобы помочь нам улучшить нашу продукцию. Ваши отзывы и предложения
                  помогут нам создать лучшую экипировку для ваших нужд.
                </p>
                <Form
                  initialValues={{ rating: '30', type: 'backpacks' }}
                  onFinish={onFinish}
                  className={s.form}
                  scrollToFirstError
                  layout='vertical'
                  autoComplete='off'
                >
                  <Form.Item name='name' className={s.formItem} rules={[{ required: true, message: 'Введите имя' }]}>
                    <Input className={s.input} placeholder='Имя' size='large' />
                  </Form.Item>
                  <Form.Item name='email' className={s.formItem} rules={[{ required: true, message: 'Введите email' }]}>
                    <Input className={s.input} placeholder='Email' size='large' />
                  </Form.Item>
                  <p className={s.questionCaption}>Какой тип продукции вы используете?</p>
                  <Form.Item name='type' className={s.formItem}>
                    <Select
                      style={{ width: '200px' }}
                      options={[
                        { value: 'backpacks', label: 'Рюкзаки' },
                        { value: 'boots', label: 'Обувь' },
                        { value: 'helmets', label: 'Шлемы' },
                      ]}
                    />
                  </Form.Item>
                  <p className={s.questionCaption}>Оцените широту ассортимента:</p>
                  <Form.Item name='rating' className={s.formItem_slider}>
                    <Slider />
                  </Form.Item>
                  <MilitaryButton className={s.submitButton} name='Отправить' />
                </Form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
