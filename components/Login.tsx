
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface LoginProps {
  onSuccess: (user: UserProfile) => void;
  onCancel: () => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, onCancel, onSwitchToSignup }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Usuário não encontrado');

      // 2. Fetch extra profile data (username, name)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Erro ao buscar perfil:", profileError);
      }

      // Construct User Object
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email || '',
        full_name: profileData?.full_name || 'Usuário',
        username: profileData?.username || authData.user.email?.split('@')[0] || 'user',
        avatar_url: profileData?.avatar_url
      };

      onSuccess(userProfile);

    } catch (err: any) {
      console.error(err);
      setError('Email ou senha incorretos.');
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
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
          <p className="text-gray-400">Acesse seu painel e gerencie seus conteúdos.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
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
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-neonGreen focus:outline-none transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-neonGreen text-black font-bold py-3 rounded-xl transition-all hover:bg-green-400 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Entrar no Dashboard <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </motion.div>

        </form>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm">
                Ainda não tem uma conta?{' '}
                <button onClick={onSwitchToSignup} className="text-neonGreen font-bold hover:underline">
                    Criar conta grátis
                </button>
            </p>
            <button onClick={onCancel} className="text-xs text-gray-600 hover:text-gray-400 mt-4">
                Voltar para Home
            </button>
        </div>
      </motion.div>
    </div>
  );
};
