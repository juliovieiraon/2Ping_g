import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', uv: 2000 },
  { name: 'Tue', uv: 3000 },
  { name: 'Wed', uv: 2500 },
  { name: 'Thu', uv: 4500 },
  { name: 'Fri', uv: 4000 },
  { name: 'Sat', uv: 6500 },
  { name: 'Sun', uv: 8000 },
];

export const RevenueChart: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="absolute -right-2 top-16 sm:-right-6 sm:top-24 md:-right-16 md:top-48 bg-gray-900/90 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl w-36 sm:w-48 z-30 transform rotate-6 hover:rotate-0 transition-transform duration-300"
    >
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Faturamento</p>
          <p className="text-base sm:text-lg font-bold text-neonGreen">+127%</p>
        </div>
        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-neonGreen animate-pulse mb-1"></div>
      </div>
      <div className="h-12 sm:h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="uv" stroke="#00FF88" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};