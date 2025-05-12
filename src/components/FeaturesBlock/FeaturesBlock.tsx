import { Suspense, useEffect, useRef, useState } from 'react';
import s from './FeaturesBlock.module.scss';
import { Canvas, useFrame, Vector3 } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { calcRotateAngle } from '../../utils/math';
import { ScrollModelRefType } from '../../types/scrollRef';
import { motion } from 'motion/react';
import ModelPreloader from '../ModelPreloader/ModelPreloader';

type FeaturesBlockProps = {
  scrollModelRef: React.RefObject<ScrollModelRefType>;
};

function Model({ url, scrollModelRef }: FeaturesBlockProps & { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);

  const [scale, setScale] = useState(11);
  const [position, setPosition] = useState<Vector3>([4, -3, 0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setScale(5);
        setPosition([2, -1.7, -2]);
      } else {
        setScale(11);
        setPosition([4, -3, 0]);
      }
    };

    // Установите обработчик изменения размера окна
    window.addEventListener('resize', handleResize);

    // Вызовите обработчик при монтировании компонента
    handleResize();

    // Удалите обработчик при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame(() => {
    if (groupRef.current && scrollModelRef.current) {
      const positionMultiplier = 0.01; // Коэффициент для изменения положения
      const rotationMultiplier = scale === 11 ? 0.0004 : 0.003; // Коэффициент для изменения вращения по оси Y
      const maxPosition = scale === 11 ? 6 : -0.5; // Максимальное значение позиции по X
      const minPosition = scale === 11 ? 10 : 3; // Минимальное значение позиции по X

      let newPosition = scrollModelRef.current.scrollTop * positionMultiplier * calcRotateAngle(rotationMultiplier);
      newPosition = Math.min(maxPosition, Math.max(minPosition, newPosition));

      groupRef.current.position.x = newPosition;
      groupRef.current.rotation.y = scrollModelRef.current.scrollTop * rotationMultiplier;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 0, scale === 11 ? 0 : -0.5]}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export default function FeaturesBlock({ scrollModelRef }: FeaturesBlockProps) {
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
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
            >
              <Environment files='/environments/apartment.hdr' />
              <Model url={'/models/weapon-compressed.glb'} scrollModelRef={scrollModelRef} />
            </Canvas>
          </Suspense>
        </div>
        <div className={s.textContainer}>
          <h2 className={s.firstCaption}>Только лучшие материалы и технологии</h2>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, transform: 'translate(-100px)' }}
            whileInView={{ opacity: 1, transform: 'translate(0)' }}
          >
            <h2 className={s.secondCaption}>Постоянное развитие и внедрение новых решений</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
