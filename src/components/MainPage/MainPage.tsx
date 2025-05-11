import { useRef } from 'react';
import Banner from '../Banner/Banner';
import FeaturesBlock from '../FeaturesBlock/FeaturesBlock';
import Header from '../Header/Header';
import s from './MainPage.module.scss';
import { ScrollModelRefType } from '../../types/scrollRef';
import Assortment from '../Assortment/Assortment';
import Slider from '../Slider/Slider';
import Footer from '../Footer/Footer';
import Feedback from '../Feedback/Feedback';

export default function MainPage() {
  const scrollModelRef = useRef<ScrollModelRefType>({ scrollTop: 0 });
  const windowScrollRef = useRef(null);

  const handleScroll = () => {
    if (windowScrollRef.current) {
      const { scrollTop } = windowScrollRef.current;
      scrollModelRef.current = { scrollTop };
    }
  };

  return (
    <div className={s.root} style={{ overflow: 'auto' }} ref={windowScrollRef} onScroll={handleScroll}>
      <Header />
      <Banner />
      <FeaturesBlock scrollModelRef={scrollModelRef} />
      <Assortment />
      <Slider />
      <Feedback />
      <Footer />
    </div>
  );
}
