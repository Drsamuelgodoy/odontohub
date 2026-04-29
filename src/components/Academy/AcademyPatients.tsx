import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ChevronRight, 
  Search, 
  AlertCircle,
  Stethoscope,
  Calendar,
  BookOpen,
  ArrowRight,
  Filter
} from '../icons';
import { academyPatients } from './mockData';

interface AcademyPatientsProps {
  onSelectPatient?: (patient: any) => void;
}

export const AcademyPatients: React.FC<AcademyPatientsProps> = ({ onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'next' | 'treatment'>('all');

  const filteredPatients = academyPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'next') return matchesSearch && p.appointment_status === 'PRÓXIMO';
    if (filterType === 'treatment') return matchesSearch && p.treatment_plan.length > 0;
    return matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'INICIANTE': 
        return { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🟢' };
      case 'INTERMEDIÁRIO': 
        return { bg: 'bg-amber-50', text: 'text-amber-700', icon: '🟡' };
      case 'AVANÇADO': 
        return { bg: 'bg-rose-50', text: 'text-rose-700', icon: '🔴' };
      default: 
        return { bg: 'bg-slate-50', text: 'text-slate-700', icon: '⚪' };
    }
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
            <h1 className="ios-title text-2xl mb-1">Meus Pacientes</h1>
            <p className="ios-text-secondary">Organize seus casos clínicos</p>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ios-input pl-10 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { value: 'all', label: 'Todos' },
              { value: 'next', label: 'Próximos' },
              { value: 'treatment', label: 'Em Tratamento' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value as any)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  filterType === filter.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-[#1C1C1E] border border-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Patients List */}
        <div className="px-4 space-y-3">
          {filteredPatients.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 font-medium">Nenhum paciente encontrado</p>
            </motion.div>
          ) : (
            filteredPatients.map((patient, index) => {
              const colors = getDifficultyColor(patient.difficulty_level);
              const appointmentDate = new Date(patient.appointment_date);
              const today = new Date();
              const isToday = appointmentDate.toDateString() === today.toDateString();

              return (
                <motion.button
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectPatient?.(patient)}
                  className="ios-card w-full text-left hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`${colors.bg} rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
                      <span className="text-xl">{colors.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1C1C1E] mb-1">{patient.name}</h3>
                      <p className="text-xs text-slate-500">{patient.cpf}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 shrink-0 mt-1" />
                  </div>

                  {/* Info Grid */}
                  <div className="bg-slate-50 rounded-[12px] p-3 mb-3">
                    <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wide mb-2">
                      Próximo Atendimento
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#1C1C1E] flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          {isToday ? 'Hoje' : appointmentDate.toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">{appointmentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      {patient.appointment_status === 'PRÓXIMO' && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary animate-pulse">
                          PRÓXIMO
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Queixa e plano */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wide mb-1">
                        Queixa Principal
                      </p>
                      <p className="text-sm text-[#1C1C1E]">{patient.chief_complaint}</p>
                    </div>

                    {patient.treatment_plan.length > 0 && (
                      <div>
                        <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wide mb-1">
                          Plano de Tratamento
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {patient.treatment_plan.map((plan, i) => (
                            <span key={i} className="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded-full">
                              Dente {plan.tooth} - {plan.procedure}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clinical Notes */}
                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <BookOpen size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 line-clamp-2">{patient.clinical_notes}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2 mt-3">
                    <button className="ios-button-secondary text-xs flex-1 py-2">
                      Ver Prontuário
                    </button>
                    <button className="ios-button-primary text-xs flex-1 py-2">
                      Preparar <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
