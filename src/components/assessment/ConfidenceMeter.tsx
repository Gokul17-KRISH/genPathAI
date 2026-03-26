import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
  percent: number;
  readinessLevel: string;
}

export const ConfidenceMeter = ({ percent, readinessLevel }: ConfidenceMeterProps) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#4f46e5"
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-bold text-slate-900 tracking-tight"
          >
            {percent}%
          </motion.span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Confidence</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-xs font-medium text-slate-500 mb-1">Status</div>
          <div className="text-sm font-bold text-indigo-600">{readinessLevel}</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-xs font-medium text-slate-500 mb-1">Consistency</div>
          <div className="text-sm font-bold text-emerald-600">High</div>
        </div>
      </div>
    </div>
  );
};
