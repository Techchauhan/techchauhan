'use client';
import React, { useEffect } from 'react';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: ${vertical ? 'translateY(0)' : 'translateX(100%)'}; }
        100% { transform: ${vertical ? 'translateY(-100%)' : 'translateX(-100%)'}; }
      }
      @keyframes marqueeInner {
        0% { transform: ${vertical ? 'translateY(0)' : 'translateX(0)'}; }
        100% { transform: ${vertical ? 'translateY(${repeat * 100}%)' : 'translateX(${repeat * 100}%)'}; }
      }
      .marquee-container:hover .marquee-inner {
        animation-play-state: ${pauseOnHover ? 'paused' : 'running'};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [vertical, pauseOnHover, repeat]);

  const marqueeStyles: React.CSSProperties = {
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: vertical ? 'normal' : 'nowrap',
    position: 'relative',
    width: '100%', // Fixed width of the container
    height: vertical ? '100%' : 'auto',
  };

  const marqueeInnerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    gap: '1rem',
    animation: `marquee ${reverse ? 'reverse' : 'normal'} linear infinite`,
    animationDuration: '40s', // Adjust the duration as needed
    minWidth: '100%',
  };

  return (
    <div {...props} className={`marquee-container ${className}`} style={marqueeStyles}>
      <div className="marquee-inner" style={marqueeInnerStyles}>
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {children}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
