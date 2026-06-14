import { useRef, useState, MouseEvent, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
}

export function TiltCard({ children, className = '', tiltMax = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * tiltMax}deg) rotateX(${-y * tiltMax}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const onLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)',
      transition: 'transform 0.4s ease-out',
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
