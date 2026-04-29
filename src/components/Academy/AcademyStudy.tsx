import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight, 
  Search,
  Filter,
  Play,
  Download,
  Share2,
  X,
  Zap
} from '../icons';
import { academyStudyMaterials } from './mockData';

interface AcademyStudyProps {
  onSelectMaterial?: (material: any) => void;
}

export const AcademyStudy: React.FC<AcademyStudyProps> = ({ onSelectMaterial }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  const categories = ['ALL', 'PREVENÇÃO', 'RESTAURADOR', 'DIAGNÓSTICO', 'TÉCNICA', 'ENDODONTIA'];

  const filteredMaterials = academyStudyMaterials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, any> = {
      'PREVENÇÃO': { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' },
      'RESTAURADOR': { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' },
      'DIAGNÓSTICO': { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100' },
      'TÉCNICA': { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
      'ENDODONTIA': { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-100' }
    };
    return colors[category] || { bg: 'bg-slate-50', text: 'text-slate-700', badge: 'bg-slate-100' };
  };

  return (
    <div className="flex-1 bg-[#F2F2F7] overflow-y-auto pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-20 bg-[#F2F2F7]/80 backdrop-blur-md px-4 py-4"
        >
          <div className="mb-4">
            <h1 className="ios-title text-2xl mb-1">Materiais de Estudo</h1>
            <p className="ios-text-secondary">Aprenda procedimentos com video-aulas rápidas</p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar video-aula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ios-input pl-10 w-full"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-[#1C1C1E] border border-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Materials Grid */}
        <div className="px-4 space-y-3 py-4">
          {filteredMaterials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 font-medium">Nenhum material encontrado</p>
            </motion.div>
          ) : (
            filteredMaterials.map((material, index) => {
              const colors = getCategoryColor(material.category);

              return (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setSelectedMaterial(material)}
                    className={`ios-card w-full text-left ${colors.bg} border-l-4 ${colors.badge} hover:shadow-md transition-all`}
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="text-4xl">{material.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#1C1C1E] text-sm line-clamp-2 mb-1">
                          {material.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {material.summary}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 shrink-0 mt-1" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors.badge} ${colors.text}`}>
                        {material.category}
                      </span>
                      <span className="text-xs bg-white/60 text-slate-600 font-medium px-2 py-1 rounded-full">
                        {material.duration}
                      </span>
                    </div>

                    {/* Procedures */}
                    <div className="mb-3">
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wide mb-1">
                        Aplica-se em:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {material.procedures.map((proc, i) => (
                          <span key={i} className="text-xs bg-white/60 text-slate-700 px-2 py-1 rounded-full">
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 pt-3 border-t border-white/30">
                      <button className="ios-button-primary text-xs flex-1 py-2 flex items-center justify-center gap-1">
                        <Play size={14} /> Ver
                      </button>
                      <button className="ios-button-secondary text-xs py-2 px-3">
                        <Download size={14} />
                      </button>
                      <button className="ios-button-secondary text-xs py-2 px-3">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </button>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Material Detail Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex items-end"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full bg-white rounded-t-[28px] p-6 max-h-[80vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} className="text-[#1C1C1E]" />
              </button>

              <div className="pr-10">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-4xl">{selectedMaterial.icon}</span>
                  <div>
                    <h2 className="ios-subtitle text-lg mb-1">{selectedMaterial.title}</h2>
                    <p className="text-sm text-slate-600">{selectedMaterial.summary}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="ios-card">
                    <p className="text-xs text-slate-600 font-bold uppercase mb-1">Duração</p>
                    <p className="font-bold text-[#1C1C1E]">{selectedMaterial.duration}</p>
                  </div>
                  <div className="ios-card">
                    <p className="text-xs text-slate-600 font-bold uppercase mb-1">Categoria</p>
                    <p className="font-bold text-primary">{selectedMaterial.category}</p>
                  </div>
                </div>

                {/* Procedures */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#1C1C1E] mb-2 uppercase">
                    Procedimentos Relacionados
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.procedures.map((proc: string, i: number) => (
                      <span key={i} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                        {proc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 p-4 bg-slate-50 rounded-[16px]">
                  <p className="text-sm text-slate-700">
                    Esta video-aula prática te guia passo a passo pelos procedimentos essenciais. Ideal para revisar antes de executar em clínica.
                  </p>
                </div>

                {/* Play Button */}
                <button className="ios-button-primary w-full py-4 mb-3 flex items-center justify-center gap-2">
                  <Play size={20} /> Assistir Video-Aula
                </button>

                <button className="ios-button-secondary w-full py-3 mb-3">
                  <Download size={18} className="mx-auto" />
                  Baixar Material
                </button>

                <button className="ios-button-secondary w-full py-3">
                  <Share2 size={18} className="mx-auto" />
                  Compartilhar com Colegas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
