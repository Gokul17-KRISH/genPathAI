import React from 'react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-50">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
    </div>
  );
};
