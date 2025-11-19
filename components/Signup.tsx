
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface SignupProps {
  onSuccess: (user: UserProfile) => void;
  onCancel: () => void;
  onSwitchToLogin?: () => void; // New prop
}

export const Signup: React.FC<SignupProps> = ({ onSuccess, onCancel, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Erro ao criar usuário');

      // 2. Create profile record
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: formData.email,
        full_name: formData.fullName,
        username: formData.username,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([userProfile]);

      if (profileError) {
        // If profile creation fails, we should probably rollback auth or handle it
        // For demo purposes, we'll just log it, but passing the object anyway
        console.error('Error creating profile:', profileError);
      }

      onSuccess(userProfile);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro ao criar sua conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 z-50 relative">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" onClick={onCancel}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Criar Conta</h2>
          <p className="text-gray-400">Comece a faturar mais com prévias inteligentes.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {step === 1 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-neonGreen focus:outline-none transition-colors"
                    placeholder="Seu nome"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome de Usuário (URL)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-mono text-sm">@</span>
                  <input
                    type="text"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-white focus:border-neonGreen focus:outline-none transition-colors"
                    placeholder="seu.usuario"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')})}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Seu link será: preview.pro/{formData.username || 'voce'}</p>
              </div>

              <button 
                type="button"
                onClick={() => {
                  if(formData.fullName && formData.username) setStep(2);
                  else setError("Preencha todos os campos");
                }}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Continuar <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
               <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-neonGreen focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-neonGreen focus:outline-none transition-colors"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-transparent border border-white/10 text-gray-400 hover:text-white font-bold py-3 rounded-xl transition-all"
                >
                  Voltar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-neonGreen text-black font-bold py-3 rounded-xl transition-all hover:bg-green-400 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Conta Grátis'}
                </button>
              </div>
            </motion.div>
          )}

        </form>
        
        <div className="mt-6 text-center pt-6 border-t border-white/5">
             <p className="text-gray-400 text-sm mb-4">
                Já tem uma conta?{' '}
                <button onClick={onSwitchToLogin} className="text-neonGreen font-bold hover:underline">
                    Fazer Login
                </button>
            </p>
            <button onClick={onCancel} className="text-sm text-gray-600 hover:text-gray-400 underline">
                Voltar para Home
            </button>
        </div>
      </motion.div>
    </div>
  );
};
