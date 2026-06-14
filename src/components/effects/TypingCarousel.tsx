import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const carNames = [
  'Nissan Skyline R33 GT-R',
  'Toyota Supra MK4',
  'Mitsubishi Evo IX',
  'Mazda RX-7 FD',
  'Honda NSX Type R',
  'Subaru Impreza STI',
  'Nissan Silvia S15',
];

export function TypingCarousel() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = carNames[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 30);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % carNames.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-primary">
      {text}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  );
}
