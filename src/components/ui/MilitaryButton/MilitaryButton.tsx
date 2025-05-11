import React, { useRef } from 'react';
import s from './MilitaryButton.module.scss';
import clsx from 'clsx';
import { motion } from 'motion/react';

type MilitaryButtonProps = {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
};

export default function MilitaryButton({ name, isLoading, isDisabled, className, onClick }: MilitaryButtonProps) {
  const buttonClasses = clsx(
    s.button,
    {
      [s.isLoading]: isLoading,
      [s.isDisabled]: isDisabled,
    },
    className,
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
      onClick={onClick}
      disabled={isLoading}
      ref={buttonRef}
    >
      {name}
    </motion.button>
  );
}
