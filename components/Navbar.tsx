
import React from 'react';
import { Menu, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSignup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSignup }) => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-deepDark/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-br from-hotPink to-purple-600 p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">Preview<span className="text-hotPink">Pro</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#" className="hover:text-white transition-colors">Preços</a>
            <button onClick={onOpenSignup} className="hover:text-white transition-colors">Login</button>
            <button 
              onClick={onOpenSignup}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all text-xs uppercase tracking-wider font-semibold"
            >
              Começar Agora
            </button>
          </div>

          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
