import { useCallback, useEffect, useRef, useState } from 'react';
import s from './Slider.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { usePrevNextButtons } from './SliderButtons';
import '@/styles/embla.scss';
import SliderButtonIcon from '../ui/icons/SliderButtonIcon';

const SLIDES = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  url: `./../../../public/images/slider-${index + 1}.jpg`,
}));

export default function Slider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1, containScroll: 'trimSnaps' }, [
    AutoScroll({ playOnInit: true }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const interactionTimer = useRef<any>(null);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop = autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;

      resetOrStop();
      callback();
      resetInteractionTimer();
    },
    [emblaApi],
  );

  const resetInteractionTimer = useCallback(() => {
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
    }

    interactionTimer.current = setTimeout(() => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (autoScroll && !autoScroll.isPlaying()) {
        autoScroll.play();
      }
      console.log('autoScroll:', autoScroll);
    }, 2000); // 2 секунды бездействия
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));

    resetInteractionTimer();

    // Сбросьте таймер при взаимодействии
    emblaApi.on('pointerDown', resetInteractionTimer);
    emblaApi.on('pointerUp', resetInteractionTimer);

    return () => {
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
    };
  }, [emblaApi, resetInteractionTimer]);

  return (
    <div className={s.root}>
      <div className='embla'>
        <div className={s.header}>
          <div className={s.navigation}>
            <div className='embla__controls'>
              <div className='embla__buttons'>
                <button
                  className={s.emblaButton}
                  onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                  disabled={prevBtnDisabled}
                >
                  <SliderButtonIcon />
                </button>
                <button
                  className={s.emblaButton}
                  onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                  disabled={nextBtnDisabled}
                >
                  <SliderButtonIcon />
                </button>
              </div>
              {/* 
              <button className='embla__play' onClick={toggleAutoplay} type='button'>
                {isPlaying ? 'Stop' : 'Start'}
              </button> */}
            </div>
          </div>
          <div className={s.textContainer}>
            <h3>Мы гордимся каждым изделием</h3>
            <p>
              Каждый день мы вдохновляемся историями и опытом наших подписчиков. Эти изображения — лишь малая часть
              того, как наша аммуниция помогает вам в ваших приключениях и миссиях. Мы благодарны за ваше доверие и рады
              видеть, как наши продукты становятся частью вашей жизни. Продолжайте делиться своими историями и
              вдохновляйте других!
            </p>
          </div>
        </div>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {SLIDES.map(({ url }) => (
              <div className='embla__slide' key={url}>
                <div className={s.imageContainer}>
                  <img src={url} alt='' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
