import { useCallback, useEffect, useRef, useState } from 'react';
import s from './Slider.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { usePrevNextButtons } from './SliderButtons';
import '@/styles/embla.scss';
import SliderButtonIcon from '../ui/icons/SliderButtonIcon';
import SliderImage1 from './../../../public/images/slider-1.jpg';
import SliderImage2 from './../../../public/images/slider-2.jpg';
import SliderImage3 from './../../../public/images/slider-3.jpg';
import SliderImage4 from './../../../public/images/slider-4.jpg';
import SliderImage5 from './../../../public/images/slider-5.jpg';
import SliderImage6 from './../../../public/images/slider-6.jpg';
import SliderImage7 from './../../../public/images/slider-7.jpg';

const SLIDES = [
  { id: 1, url: SliderImage1 },
  { id: 2, url: SliderImage2 },
  { id: 3, url: SliderImage3 },
  { id: 4, url: SliderImage4 },
  { id: 5, url: SliderImage5 },
  { id: 6, url: SliderImage6 },
  { id: 7, url: SliderImage7 },
];

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
    }, 3000);
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
