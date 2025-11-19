import React, { useState, useEffect } from 'react';
import { Play, Lock, ShieldCheck, Smartphone, Copy, Settings2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDemo: React.FC = () => {
  // State for the Editor
  const [blurLevel, setBlurLevel] = useState<number>(12);
  const [ctaText, setCtaText] = useState<string>("LIBERAR VÍDEO COMPLETO");
  const [price, setPrice] = useState<string>("29,90");
  const [buttonColor, setButtonColor] = useState<'neonGreen' | 'hotPink'>('neonGreen');
  const [securityEnabled, setSecurityEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Simulated unique link
  const uniqueLink = "preview.pro/v/k9x2-secure-7a";

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-neonGreen font-bold tracking-wider text-sm uppercase mb-2 block">
            Tecnologia Exclusiva
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Editor de Conversão <span className="text-hotPink">Em Tempo Real</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Veja como é fácil proteger seu conteúdo e criar um funil de vendas irresistível em segundos. 
            O que você configura aqui, seu cliente vê lá.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: The Editor (Creator View) */}
          <div className="lg:col-span-7 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <Settings2 className="text-white w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Configuração do Player</h3>
            </div>

            <div className="space-y-8">
              
              {/* 1. Visual Control */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-hotPink" /> Nível de Blur (Censura)
                  </label>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-white">{blurLevel}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={blurLevel} 
                  onChange={(e) => setBlurLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-hotPink hover:accent-pink-400"
                />
                <p className="text-xs text-gray-500">
                  Ajuste o quanto do vídeo gratuito é revelado. Deixe apenas silhuetas visíveis para aumentar a curiosidade.
                </p>
              </div>

              {/* 2. CTA Configuration */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300 block">Texto do Botão de Venda</label>
                <input 
                  type="text" 
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neonGreen focus:outline-none transition-colors"
                  placeholder="Ex: QUERO VER AGORA"
                />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2">Preço Display (R$)</label>
                        <input 
                            type="text" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neonGreen focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2">Cor do Botão</label>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setButtonColor('neonGreen')}
                                className={`h-12 w-full rounded-lg border-2 transition-all ${buttonColor === 'neonGreen' ? 'border-white bg-neonGreen' : 'border-transparent bg-neonGreen/20'}`}
                            />
                            <button 
                                onClick={() => setButtonColor('hotPink')}
                                className={`h-12 w-full rounded-lg border-2 transition-all ${buttonColor === 'hotPink' ? 'border-white bg-hotPink' : 'border-transparent bg-hotPink/20'}`}
                            />
                        </div>
                    </div>
                </div>
              </div>

              {/* 3. Security Toggles */}
              <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${securityEnabled ? 'bg-green-500/20' : 'bg-red-500/10'}`}>
                      <ShieldCheck className={`w-5 h-5 ${securityEnabled ? 'text-neonGreen' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Link Único Rastreável (DRM)</p>
                      <p className="text-xs text-gray-400">Impede gravação de tela e downloads</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSecurityEnabled(!securityEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securityEnabled ? 'bg-neonGreen' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition transition-transform ${securityEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-black/50 p-2 rounded border border-dashed border-gray-700">
                    <div className="bg-gray-800 p-1 rounded">
                        <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                    <code className="text-xs text-gray-300 flex-1 font-mono truncate">{uniqueLink}</code>
                    <button className="text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: The Preview (Fan View) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Phone Frame */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6 }}
               className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden ring-1 ring-white/20"
            >
                {/* Video Simulator */}
                <div className="absolute inset-0 bg-gray-800">
                    {/* Simulated Video Content - Using a lifestyle aesthetic placeholder */}
                    <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
                        alt="Preview Video"
                        className="w-full h-full object-cover opacity-80"
                        style={{ filter: `blur(${blurLevel}px)` }}
                    />
                    
                    {/* Play Icon (if heavily blurred) */}
                    {blurLevel > 5 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play className="w-16 h-16 text-white/80 fill-white/80" />
                        </div>
                    )}

                    {/* Security Watermark Overlay (Simulated) */}
                    {securityEnabled && (
                        <div className="absolute top-12 right-4 opacity-30 pointer-events-none">
                            <p className="text-[10px] text-white font-mono rotate-[-15deg]">ID: 8X99-USER-TRACK</p>
                        </div>
                    )}
                </div>

                {/* UI Overlays */}
                <div className="absolute top-0 left-0 w-full p-6 pt-12 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 border border-white/20 overflow-hidden">
                            <img src="https://picsum.photos/100/100" alt="Avatar" />
                        </div>
                        <span className="text-white text-sm font-medium">@seunome</span>
                    </div>
                    <div className="bg-red-500/20 px-2 py-1 rounded text-[10px] font-bold text-red-500 border border-red-500/20 animate-pulse">
                        PRIVADO
                    </div>
                </div>

                {/* The Conversion Button Area */}
                <div className="absolute bottom-0 left-0 w-full p-5 pb-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                    
                    <div className="mb-4">
                        <h4 className="text-white font-bold text-lg leading-tight">Pack: Fim de Semana 🤫</h4>
                        <p className="text-gray-300 text-xs mt-1">Vídeo completo + 15 fotos exclusivas.</p>
                    </div>

                    <button 
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:brightness-110
                        ${buttonColor === 'neonGreen' ? 'bg-neonGreen shadow-[0_0_15px_rgba(0,255,136,0.4)]' : 'bg-hotPink text-white shadow-[0_0_15px_rgba(255,0,127,0.4)]'}
                        `}
                    >
                        <Lock className="w-4 h-4" />
                        <div className="flex flex-col items-start leading-none">
                            <span>{ctaText || "DESBLOQUEAR"}</span>
                        </div>
                        <span className="ml-auto bg-black/20 px-1.5 py-0.5 rounded text-xs backdrop-blur-sm">
                            R$ {price}
                        </span>
                    </button>
                    
                    <div className="mt-3 flex justify-center items-center gap-2 text-[10px] text-gray-500">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Compra Segura & Anônima</span>
                    </div>
                </div>

                {/* Floating Elements Effect */}
                <div className="absolute -right-12 top-1/4 w-24 h-24 bg-purple-500/30 blur-2xl rounded-full pointer-events-none"></div>
            </motion.div>

            {/* Connective Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-1/2 -left-6 w-12 border-t-2 border-dashed border-gray-700"></div>
            <div className="hidden lg:flex absolute top-1/2 -left-8 w-6 h-6 bg-gray-800 rounded-full border border-gray-600 items-center justify-center transform -translate-y-1/2 z-10">
                <Smartphone className="w-3 h-3 text-neonGreen" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
