import React, { useEffect, useRef, useState } from 'react';
import { Operator } from '../types';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operator: Operator;
}

const Display: React.FC<DisplayProps> = ({ value, previousValue, operator }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Auto-scale text to fit width
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    
    if (container && text) {
      const containerWidth = container.clientWidth;
      const textWidth = text.scrollWidth;
      
      if (textWidth > containerWidth) {
        const newScale = containerWidth / textWidth;
        setScale(Math.max(newScale, 0.4)); // Don't scale below 40%
      } else {
        setScale(1);
      }
    }
  }, [value]);

  return (
    <div className="w-full h-32 sm:h-40 flex flex-col justify-end items-end p-6 sm:p-8 bg-black/20 mb-4 rounded-3xl">
      <div className="text-gray-400 text-lg sm:text-xl font-medium h-8 mb-1">
        {previousValue} {operator}
      </div>
      <div 
        ref={containerRef} 
        className="w-full text-right overflow-hidden"
      >
        <div 
          ref={textRef}
          style={{ transform: `scale(${scale})`, transformOrigin: 'right center' }}
          className="text-5xl sm:text-7xl font-light text-white whitespace-nowrap transition-transform duration-100"
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default Display;