import { Suspense, useRef } from 'react';
import s from './FeaturesBlock.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
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

  useFrame(() => {
    if (groupRef.current && scrollModelRef.current) {
      const positionMultiplier = 0.01; // Коэффициент для изменения положения
      const rotationMultiplier = 0.0004; // Коэффициент для изменения вращения по оси Y
      const maxPosition = 7; // Максимальное значение позиции по X
      const minPosition = 12; // Минимальное значение позиции по X

      let newPosition = scrollModelRef.current.scrollTop * positionMultiplier * calcRotateAngle(rotationMultiplier);
      newPosition = Math.min(maxPosition, Math.max(minPosition, newPosition));

      groupRef.current.position.x = newPosition;
      groupRef.current.rotation.y = scrollModelRef.current.scrollTop * rotationMultiplier;
    }
  });

  return (
    <group ref={groupRef} position={[4, -3, -4]} rotation={[0, 0, 0]}>
      <primitive object={scene} scale={14} />
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
