import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate initial gentle floating hearts
    const generated: Heart[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 16) + 14,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.3,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -bottom-10 text-rose-400 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.id % 3 === 0 ? '❤️' : h.id % 3 === 1 ? '💖' : '💕'}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) rotate(45deg) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
