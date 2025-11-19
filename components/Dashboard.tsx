
import React, { useState, useEffect } from 'react';
import { UserProfile, Content } from '../types';
import { Play, Lock, ShieldCheck, Copy, Settings2, Upload, Loader2, Save, Plus, Trash2, BarChart3, DollarSign, Link as LinkIcon, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // View State: 'overview' (list) | 'upload' (dropzone) | 'editor' (customization)
  const [view, setView] = useState<'overview' | 'upload' | 'editor'>('overview');
  
  // Data State
  const [myContents, setMyContents] = useState<Content[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Upload/Editor State
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  
  // Editor Fields
  const [blurLevel, setBlurLevel] = useState<number>(15);
  const [ctaText, setCtaText] = useState<string>("LIBERAR CONTEÚDO");
  const [price, setPrice] = useState<string>("39,90");
  const [contentTitle, setContentTitle] = useState<string>("");

  // Fetch User Content on Mount
  useEffect(() => {
    fetchContents();
  }, [user.id]);

  const fetchContents = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpload = async () => {
    if(!videoFile) return;
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress since standard supabase upload doesn't provide a simple progress hook
    // This gives user visual feedback that something is happening
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) return prev; // Cap at 90% until actually done
        return prev + Math.random() * 15;
      });
    }, 400);

    try {
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, videoFile);

      clearInterval(progressInterval);

      if (uploadError) {
          // Check specifically for the RLS error to give a better message
          if(uploadError.message.includes("row-level security") || (uploadError as any).statusCode === "403") {
             throw new Error("Permissão negada (RLS). Rode o script SQL no Supabase.");
          }
          throw uploadError;
      }

      setUploadProgress(100);

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      setUploadedVideoUrl(publicUrl);
      setContentTitle(videoFile.name.split('.')[0]);
      
      // Short delay to let user see 100%
      setTimeout(() => {
          setView('editor');
          setUploading(false); // Stop loading state
          setUploadProgress(0);
      }, 800);

    } catch (error: any) {
      clearInterval(progressInterval);
      setUploading(false);
      setUploadProgress(0);
      console.error('Upload Error:', error);
      alert(`Erro no upload: ${error.message || "Falha desconhecida"}`);
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
          title: contentTitle || 'Sem Título',
          blur_level: blurLevel,
          cta_text: ctaText,
          price: price,
          button_color: 'neonGreen'
        });

      if (error) throw error;
      
      alert('Conteúdo publicado com sucesso!');
      fetchContents(); // Refresh list
      setView('overview'); // Go back to dashboard
      
      // Reset states
      setVideoFile(null);
      setUploadedVideoUrl(null);
      setContentTitle("");
      
    } catch (error: any) {
      console.error('Database Error:', error);
      alert(`Erro ao salvar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Tem certeza que deseja excluir este conteúdo?")) return;
    
    try {
        const { error } = await supabase.from('contents').delete().eq('id', id);
        if (error) throw error;
        fetchContents();
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir.");
    }
  };

  const copyToClipboard = (contentId: string) => {
    // Generates the public link based on current domain + video query param
    const link = `${window.location.origin}/?video=${contentId}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado! Envie para seus clientes.");
  };

  return (
    <div className="min-h-screen bg-deepDark pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-1">Olá, {user.full_name?.split(' ')[0] || 'Criador'} 👋</h1>
                <p className="text-gray-400 text-sm">Aqui está o resumo do seu império digital.</p>
            </div>
            
            {view === 'overview' && (
                <button 
                    onClick={() => setView('upload')}
                    className="bg-neonGreen text-black font-bold py-3 px-6 rounded-xl hover:bg-green-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                >
                    <Plus className="w-5 h-5" /> Novo Conteúdo
                </button>
            )}
        </header>

        {/* KPI Cards (Only visible in Overview) */}
        {view === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {[
                    { label: 'Faturamento Total', value: 'R$ 0,00', icon: <DollarSign className="text-neonGreen" />, color: 'bg-neonGreen/10 border-neonGreen/20' },
                    { label: 'Links Ativos', value: myContents.length.toString(), icon: <LinkIcon className="text-blue-400" />, color: 'bg-blue-500/10 border-blue-500/20' },
                    { label: 'Visualizações', value: '0', icon: <Play className="text-hotPink" />, color: 'bg-hotPink/10 border-hotPink/20' },
                    { label: 'Taxa de Conversão', value: '0%', icon: <BarChart3 className="text-purple-400" />, color: 'bg-purple-500/10 border-purple-500/20' },
                ].map((kpi, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${kpi.color} backdrop-blur-sm flex flex-col justify-between h-32`}>
                        <div className="flex justify-between items-start">
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{kpi.label}</span>
                            {kpi.icon}
                        </div>
                        <span className="text-2xl font-bold text-white">{kpi.value}</span>
                    </div>
                ))}
            </div>
        )}

        {/* VIEW: OVERVIEW (List of Videos) */}
        {view === 'overview' && (
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <LinkIcon className="text-white" />
                    <h2 className="text-xl font-bold text-white">Meus Conteúdos Ativos</h2>
                </div>

                {loadingData ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-neonGreen animate-spin" />
                    </div>
                ) : myContents.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
                        <p className="text-gray-500 mb-4">Você ainda não criou nenhum link protegido.</p>
                        <button 
                            onClick={() => setView('upload')}
                            className="text-neonGreen font-bold hover:underline"
                        >
                            Criar meu primeiro link agora
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myContents.map((content) => (
                            <motion.div 
                                key={content.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors group"
                            >
                                {/* Card Header/Preview */}
                                <div className="h-40 bg-gray-800 relative overflow-hidden">
                                    <video 
                                        src={content.video_url} 
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity group-hover:scale-105 duration-500"
                                        style={{ filter: `blur(${content.blur_level / 2}px)` }} // Less blur for dashboard preview
                                    />
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-neonGreen border border-neonGreen/20">
                                        R$ {content.price}
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <p className="text-white font-bold truncate max-w-[200px] shadow-black drop-shadow-md">{content.title}</p>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(content.created_at!).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3 text-green-500" /> Ativo
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => content.id && copyToClipboard(content.id)}
                                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Copy className="w-4 h-4" /> Copiar Link
                                        </button>
                                        <button 
                                            onClick={() => content.id && handleDelete(content.id)}
                                            className="w-10 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-500 rounded-xl flex items-center justify-center transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    
                                    <div className="mt-3 pt-3 border-t border-gray-800">
                                        <p className="text-[10px] text-gray-500 font-mono truncate">
                                            Link: {window.location.origin}/?video={content.id}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {/* VIEW: UPLOAD (Dropzone) */}
        {view === 'upload' && (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
             >
                <button 
                    onClick={() => setView('overview')}
                    className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para o Painel
                </button>

                <div className="max-w-2xl mx-auto bg-gray-900/50 border border-white/10 rounded-3xl p-12 text-center border-dashed border-2 border-gray-700 hover:border-neonGreen transition-colors relative overflow-hidden">
                    
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <Upload className="w-10 h-10 text-neonGreen" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Upload de Novo Conteúdo</h2>
                    <p className="text-gray-400 mb-8 relative z-10">Arraste seu vídeo vertical (MP4) aqui.</p>
                    
                    <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        id="video-upload"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        disabled={uploading}
                    />
                    
                    {!videoFile ? (
                        <label 
                            htmlFor="video-upload" 
                            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors cursor-pointer relative z-10"
                        >
                            Selecionar Arquivo
                        </label>
                    ) : (
                        <div className="mt-6 w-full max-w-md mx-auto relative z-10">
                             <p className="text-sm text-gray-300 mb-4 font-medium truncate">{videoFile.name}</p>
                             
                             {/* Progress Bar */}
                             {uploading && (
                               <div className="w-full bg-gray-800 rounded-full h-3 mb-5 overflow-hidden border border-gray-700">
                                 <div 
                                    className="bg-neonGreen h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,136,0.5)]" 
                                    style={{ width: `${uploadProgress}%` }}
                                 ></div>
                               </div>
                             )}

                             <button 
                                onClick={handleUpload}
                                disabled={uploading}
                                className="bg-neonGreen text-black font-bold py-3 px-12 rounded-xl hover:bg-green-400 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mx-auto w-full justify-center"
                            >
                                {uploading ? (
                                  <>
                                    <Loader2 className="animate-spin w-5 h-5" /> 
                                    {uploadProgress < 100 ? `Enviando... ${Math.round(uploadProgress)}%` : 'Processando...'}
                                  </>
                                ) : 'Continuar para Edição'}
                            </button>
                            
                            {!uploading && (
                                <button 
                                    onClick={() => setVideoFile(null)}
                                    className="mt-4 text-xs text-gray-500 hover:text-red-400 underline"
                                >
                                    Cancelar seleção
                                </button>
                            )}
                        </div>
                    )}
                </div>
             </motion.div>
        )}

        {/* VIEW: EDITOR (Customization) */}
        {view === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Editor Panel */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between">
                         <button 
                            onClick={() => setView('overview')}
                            className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Cancelar
                        </button>
                    </div>

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
                              Salvar & Publicar
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
                            
                            <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
                                <p className="text-xs text-blue-200">
                                    <span className="font-bold">Dica PRO:</span> Use títulos chamativos e um preço acessível para aumentar a conversão na primeira venda.
                                </p>
                            </div>
                        </div>
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
