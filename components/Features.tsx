import React from 'react';
import { Smartphone, Zap, Lock, TrendingUp, Eye, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Smartphone className="w-8 h-8 text-neonGreen" />,
    title: "Sem App, Sem Cadastro",
    description: "Seu cliente não precisa baixar Telegram nem criar conta. Clicou, assistiu a prévia, comprou."
  },
  {
    icon: <Zap className="w-8 h-8 text-hotPink" />,
    title: "Carregamento Instantâneo",
    description: "Player de vídeo otimizado que roda liso até no 4G. Zero delay para não perder o impulso da venda."
  },
  {
    icon: <Eye className="w-8 h-8 text-purple-400" />,
    title: "Prévias com Blur Inteligente",
    description: "Mostre o suficiente para gerar desejo, esconda o suficiente para vender. Blur automático configurável."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
    title: "Conversão 3x Maior",
    description: "Eliminamos 4 passos do funil tradicional. Menos cliques = mais dinheiro no seu bolso."
  },
  {
    icon: <Lock className="w-8 h-8 text-yellow-400" />,
    title: "Proteção Anti-Print",
    description: "Tecnologia DRM que bloqueia capturas de tela e downloads não autorizados do seu conteúdo gratuito."
  },
  {
    icon: <Ban className="w-8 h-8 text-red-400" />,
    title: "Fim dos Curiosos",
    description: "Filtre quem só quer conteúdo grátis. Quem clica no seu link já sabe que é conteúdo premium."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-deepDark relative overflow-hidden" id="funcionalidades">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-[20%] top-[20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[10%] w-[400px] h-[400px] bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
            Por que os top criadores estão <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-emerald-400">migrando do Telegram?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            O modelo antigo de "jogar prévia no grupo" está matando sua conversão. 
            O PreviewPro profissionaliza seu funil de vendas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};