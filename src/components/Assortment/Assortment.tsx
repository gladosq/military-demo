import s from './Assortment.module.scss';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import RotateIcon from '../ui/icons/RotateIcon';
import ButtonDecorationIcon from '../ui/icons/ButtonDecorationIcon';
import clsx from 'clsx';
import StopItemImage1 from './../../../public/images/shop-item-1.png';
import StopItemImage2 from './../../../public/images/shop-item-2.png';
import StopItemImage3 from './../../../public/images/shop-item-3.png';
import StopItemImage4 from './../../../public/images/shop-item-4-cut.png';
import StopItemImage5 from './../../../public/images/shop-item-5.png';

import * as motion from 'motion/react-client';
import ModelPreloader from '../ModelPreloader/ModelPreloader';

const Models = [
  {
    title: 'backpack-1',
    url: '/models/backpack-1-compressed.glb',
    scale: 6,
    position: [0, -0.2, 0],
    preview: StopItemImage1,
  },
  {
    title: 'boots',
    url: '/models/boots-compressed.glb',
    scale: 0.14,
    position: [0, 0.6, 0],
    preview: StopItemImage2,
  },
  {
    title: 'knife',
    url: '/models/knife-compressed.glb',
    scale: 0.08,
    position: [0, -0.6, 0],
    preview: StopItemImage3,
    rotation: [0, 1.5, 0.1],
  },
  {
    title: 'backpack-2',
    url: '/models/backpack-2-compressed.glb',
    scale: 4,
    position: [0, 1.6, 0],
    preview: StopItemImage4,
  },
  {
    title: 'vision',
    url: '/models/vision-compressed.glb',
    scale: 0.4,
    position: [0, 0.6, 0],
    preview: StopItemImage5,
  },
];

function Model({
  url,
  scale,
  position,
  rotation = [0, 0, 0],
}: {
  url: string;
  scale: number;
  position: number[];
  rotation?: number[];
}) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

function getCurrentModal(title: string) {
  return Models[Models.findIndex((m) => m.title === title)];
}

export default function Assortment() {
  const [title, setTitle] = useState('backpack-1');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={s.textContainer}>
            <h2>Ознакомьтесь с ассортиментом</h2>
            <p>
              Посмотрите нашу галерею, чтобы увидеть, как наши продукты выглядят в действии. Мы гордимся каждым изделием
              и рады поделиться с вами нашими достижениями
            </p>
          </div>
          <div className={s.navigation}>
            {Models.map((item) => {
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTitle(item.title)}
                  className={clsx(s.button, title === item.title && s.buttonActive)}
                >
                  <img className={s.image} src={item.preview} alt='Иконка товара' />
                  <ButtonDecorationIcon />
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className={s.canvasContainer}>
          <Suspense fallback={<ModelPreloader />}>
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 0, 10], fov: 64 }}
              gl={{
                alpha: true,
                powerPreference: 'high-performance',
                stencil: true,
                antialias: true,
                depth: true,
              }}
              className={clsx(s.canvas, isMobile && s.canvasMobile)}
            >
              <OrbitControls
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={0.7}
                rotateSpeed={0.6}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment files='/environments/sunset.hdr' />
              <group scale={2} position={[0, -4, 0]} rotation={[0, -0.4, 0]}>
                <Model
                  url={getCurrentModal(title).url}
                  scale={getCurrentModal(title).scale}
                  position={getCurrentModal(title).position}
                  rotation={getCurrentModal(title).rotation}
                />
              </group>
            </Canvas>
          </Suspense>
        </div>
        {!isMobile && (
          <div className={s.helper}>
            <RotateIcon />
            <span>Вращайте для просмотра</span>
          </div>
        )}
      </div>
    </div>
  );
}
