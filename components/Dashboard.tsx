
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Play, Lock, ShieldCheck, Copy, Settings2, Upload, Loader2, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [view, setView] = useState<'upload' | 'editor'>('upload');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  
  // Editor State
  const [blurLevel, setBlurLevel] = useState<number>(15);
  const [ctaText, setCtaText] = useState<string>("LIBERAR CONTEÚDO");
  const [price, setPrice] = useState<string>("39,90");
  const [contentTitle, setContentTitle] = useState<string>("");
  
  const handleUpload = async () => {
    if(!videoFile) return;
    setUploading(true);

    try {
      // 1. Create a unique file name
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // 2. Upload to Supabase Storage 'videos' bucket
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      setUploadedVideoUrl(publicUrl);
      setContentTitle(videoFile.name.split('.')[0]); // Default title from filename
      setView('editor');

    } catch (error: any) {
      console.error('Upload Error:', error);
      alert(`Erro no upload: ${error.message || 'Verifique se o bucket "videos" existe no Supabase.'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!uploadedVideoUrl) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('contents')
        .insert({
          user_id: user.id,
          video_url: uploadedVideoUrl,
          title: contentTitle,
          blur_level: blurLevel,
          cta_text: ctaText,
          price: price,
          button_color: 'neonGreen' // Defaulting for now
        });

      if (error) throw error;
      alert('Conteúdo salvo com sucesso!');
    } catch (error: any) {
      console.error('Database Error:', error);
      alert(`Erro ao salvar: ${error.message || 'Verifique se a tabela "contents" existe.'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepDark pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Olá, {user.full_name?.split(' ')[0] || 'Criador'} 👋</h1>
                <p className="text-gray-400 text-sm">Gerencie seus vídeos e links protegidos.</p>
            </div>
            <div className="flex items-center gap-3">
                <img src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="Avatar" className="w-10 h-10 rounded-full border border-white/20" />
            </div>
        </header>

        {view === 'upload' && (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-gray-900/50 border border-white/10 rounded-3xl p-12 text-center border-dashed border-2 border-gray-700 hover:border-neonGreen transition-colors"
             >
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-neonGreen" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload de Novo Conteúdo</h2>
                <p className="text-gray-400 mb-8">Arraste seu vídeo vertical (MP4) aqui.</p>
                
                <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    id="video-upload"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
                
                <label 
                    htmlFor="video-upload" 
                    className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                    {videoFile ? 'Vídeo Selecionado!' : 'Selecionar Arquivo'}
                </label>

                {videoFile && (
                    <div className="mt-6">
                         <p className="text-sm text-gray-300 mb-4">{videoFile.name}</p>
                         <button 
                            onClick={handleUpload}
                            disabled={uploading}
                            className="bg-neonGreen text-black font-bold py-3 px-12 rounded-xl hover:bg-green-400 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                        >
                            {uploading ? (
                              <>
                                <Loader2 className="animate-spin" /> Enviando...
                              </>
                            ) : 'Continuar para Edição'}
                        </button>
                    </div>
                )}
             </motion.div>
        )}

        {view === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Editor Panel */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                              <Settings2 className="w-5 h-5 text-neonGreen" />
                              <h3 className="text-lg font-bold text-white">Customização do Player</h3>
                            </div>
                            <button 
                              onClick={handleSave}
                              disabled={saving}
                              className="bg-neonGreen/10 text-neonGreen border border-neonGreen/20 hover:bg-neonGreen/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors"
                            >
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                              Salvar Alterações
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Título do Pack/Vídeo</label>
                                <input 
                                    type="text" 
                                    value={contentTitle}
                                    onChange={(e) => setContentTitle(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neonGreen outline-none"
                                    placeholder="Ex: Noite em Paris..."
                                />
                            </div>

                            <div>
                                <label className="flex justify-between text-sm text-gray-400 mb-2">
                                    <span>Nível de Blur (Censura)</span>
                                    <span>{blurLevel}px</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="0" max="40" 
                                    value={blurLevel}
                                    onChange={(e) => setBlurLevel(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg accent-neonGreen cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Texto do Botão</label>
                                    <input 
                                        type="text" 
                                        value={ctaText}
                                        onChange={(e) => setCtaText(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neonGreen outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Preço (R$)</label>
                                    <input 
                                        type="text" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neonGreen outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-neonGreen" />
                                <div>
                                    <p className="text-sm font-bold text-white">Proteção DRM Ativa</p>
                                    <p className="text-xs text-gray-400">Link único gerado para: {user.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                         <div>
                             <p className="text-gray-400 text-sm">Seu link público (após salvar):</p>
                             <code className="text-neonGreen font-mono text-sm">preview.pro/{user.username}/v/...</code>
                         </div>
                         <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
                             <Copy className="w-4 h-4" /> Copiar
                         </button>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-[300px] h-[600px] bg-black rounded-[2.5rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
                        {/* Header Phone */}
                        <div className="absolute top-0 w-full p-4 pt-8 bg-gradient-to-b from-black/60 to-transparent z-20 flex items-center gap-2">
                            <img src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full border border-white" />
                            <span className="text-white text-xs font-bold">@{user.username}</span>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                             {uploadedVideoUrl ? (
                               <video 
                                 src={uploadedVideoUrl}
                                 className="w-full h-full object-cover"
                                 style={{ filter: `blur(${blurLevel}px)` }}
                                 autoPlay
                                 muted
                                 loop
                                 playsInline
                               />
                             ) : (
                               <div className="text-gray-500 text-xs">Carregando vídeo...</div>
                             )}
                             
                             {/* Play Icon overlay only if blurred heavily */}
                             {blurLevel > 5 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                             )}
                        </div>

                        {/* Footer CTA */}
                        <div className="absolute bottom-0 w-full p-4 pb-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                            <p className="text-white text-sm font-bold mb-3 line-clamp-1">{contentTitle || 'Título do Pack'}</p>
                            <button className="w-full bg-neonGreen text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                                <Lock className="w-4 h-4" /> {ctaText}
                            </button>
                            <div className="text-center mt-2">
                              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">R$ {price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
