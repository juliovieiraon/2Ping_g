import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';
import { GradientBackground } from './GradientBackground';
import { IphoneMockup } from './IphoneMockup';
import { RevenueChart } from './RevenueChart';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden py-12 pt-24 md:py-20 lg:pt-0">
      <GradientBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6 sm:space-y-8 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
          >
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-medium text-neonGreen mb-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonGreen opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neonGreen"></span>
                </span>
                Plataforma #1 para criadoras Privacy & OF
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.1]">
              Pare de perder <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">assinantes</span> para a preguiça.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              Transforme curiosos em assinantes do OnlyFans e Privacy com <span className="text-white font-medium">Prévias em Vídeo</span> que não exigem cadastro, não pedem app e convertem <span className="text-neonGreen font-bold">3x mais</span>.
            </p>

            {/* CTA Area */}
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 0, 127, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-hotPink text-white text-lg sm:text-xl font-bold py-4 px-6 sm:px-8 rounded-2xl shadow-[0_0_20px_-5px_rgba(255,0,127,0.4)] w-full sm:w-auto transition-all duration-300 border border-white/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  QUERO AUMENTAR MEU FATURAMENTO
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Inner Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              {/* Micro-Copy */}
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-500 justify-center lg:justify-start items-center">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4 text-neonGreen" /> 
                    Teste Grátis de 7 dias
                </span>
                <span className="hidden sm:block text-gray-700">•</span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Smartphone className="w-4 h-4 text-gray-400" /> 
                    Não precisa instalar nada
                </span>
                <span className="hidden sm:block text-gray-700">•</span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="w-4 h-4 text-gray-400" /> 
                    Configuração em 2min
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visuals */}
          <div className="relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0 min-h-[400px] sm:min-h-[600px]">
            {/* Background Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[500px] sm:w-[300px] sm:h-[600px] bg-hotPink/20 blur-[60px] sm:blur-[80px] rounded-full pointer-events-none"></div>
            
            {/* Floating Elements */}
            <RevenueChart />
            
            {/* Main Phone */}
            <IphoneMockup />

            {/* Floating Badge Right */}
             <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-8 -left-2 sm:bottom-20 sm:-left-4 lg:-left-12 bg-gray-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3 z-30 max-w-[180px] sm:max-w-[200px]"
            >
                <div className="bg-green-500/20 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                </div>
                <div>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold">Conversão</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Nova Assinatura!</p>
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};