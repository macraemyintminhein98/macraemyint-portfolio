import { useRef, useState, MouseEvent, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = '', strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setStyle({
      transform: `translate(${x * strength}px, ${y * strength}px)`,
      transition: 'transform 0.2s ease-out',
    });
  };

  const onLeave = () => {
    setStyle({
      transform: 'translate(0px, 0px)',
      transition: 'transform 0.5s ease-out',
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
