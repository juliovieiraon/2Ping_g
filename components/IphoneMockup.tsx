import React from 'react';
import { Lock, Play, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const IphoneMockup: React.FC = () => {
  return (
    <div className="relative z-10 perspective-1000">
      <motion.div 
        className="relative mx-auto border-gray-900 dark:border-gray-900 bg-black border-[8px] sm:border-[10px] rounded-[2.5rem] sm:rounded-[3.5rem] h-[550px] w-[270px] sm:h-[650px] sm:w-[320px] lg:h-[700px] lg:w-[350px] shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] ring-1 ring-white/10"
        initial={{ y: 20, rotateY: -5, rotateX: 5 }}
        animate={{ y: -20, rotateY: -10, rotateX: 5 }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "mirror", 
          duration: 4, 
          ease: "easeInOut" 
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-0 z-20 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-8 bg-black rounded-b-2xl flex justify-center items-center">
            <div className="w-12 sm:w-16 h-3 sm:h-4 bg-black rounded-full flex space-x-2 items-center justify-end pr-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            </div>
        </div>
        
        {/* Side Buttons */}
        <div className="h-[36px] sm:h-[46px] w-[2px] sm:w-[3px] bg-gray-800 absolute -left-[10px] sm:-left-[13px] top-[90px] sm:top-[115px] rounded-l-lg"></div>
        <div className="h-[36px] sm:h-[46px] w-[2px] sm:w-[3px] bg-gray-800 absolute -left-[10px] sm:-left-[13px] top-[140px] sm:top-[175px] rounded-l-lg"></div>
        <div className="h-[50px] sm:h-[64px] w-[2px] sm:w-[3px] bg-gray-800 absolute -right-[10px] sm:-right-[13px] top-[135px] sm:top-[170px] rounded-r-lg"></div>

        {/* Screen Content */}
        <div className="rounded-[2rem] sm:rounded-[3rem] overflow-hidden w-full h-full bg-gray-900 relative flex flex-col">
          
          {/* App Header */}
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-end p-4 sm:p-6 pb-2">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                    <img src="https://picsum.photos/100/100?random=1" className="rounded-full border border-black" alt="Avatar" />
                </div>
                <span className="text-white text-xs sm:text-sm font-semibold shadow-sm">@julianavip</span>
            </div>
            <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] sm:text-[10px] font-bold text-white border border-white/10">
                AO VIVO
            </div>
          </div>

          {/* Main Content - Vertical Video/Image Preview */}
          <div className="h-full w-full relative">
            <img 
                src="https://picsum.photos/400/800?random=2" 
                className="object-cover w-full h-full filter blur-md scale-110 opacity-80" 
                alt="Censored Content" 
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="white" />
                </div>
            </div>
          </div>

          {/* Bottom Action Sheet */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-16 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-5 z-20 flex flex-col gap-3 sm:gap-4">
            
            <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight">Pack Exclusivo: Noite em Paris 🔥</h3>
                <p className="text-gray-300 text-[10px] sm:text-xs line-clamp-2">Acesso imediato ao conteúdo completo sem censura. Vídeo 4K + 10 fotos.</p>
            </div>

            <button className="w-full group relative overflow-hidden rounded-xl bg-hotPink p-3 sm:p-4 transition-all hover:bg-pink-600 active:scale-95">
                <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-white text-xs sm:text-base">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>DESBLOQUEAR AGORA</span>
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>

            <div className="flex justify-between items-center text-white/80 px-1 sm:px-2">
                <div className="flex gap-3 sm:gap-4">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 hover:text-red-500 cursor-pointer transition-colors" />
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 cursor-pointer transition-colors" />
                </div>
                <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

          </div>
        </div>
        
        {/* Reflections */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none rounded-r-[2.5rem] sm:rounded-r-[3.5rem]"></div>
      </motion.div>
    </div>
  );
};