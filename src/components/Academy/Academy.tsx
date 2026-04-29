import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle,
  Zap,
  Brain,
  Award,
  Stethoscope,
  ArrowRight,
  Home
} from '../icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
  academieMockAppointments,
  academyPatients,
  academyStudyMaterials,
  academyChecklist,
  academyNextSteps,
  academyTipsDayTip
} from './mockData';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AcademyProps {
  user?: any;
  onNavigate?: (section: string) => void;
}

interface NextAppointment {
  id: number;
  patient_name: string;
  start_time: string;
  procedure: string;
  tooth_numbers: number[];
  difficulty: string;
  clinic: string;
  dentist_supervisor: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'INICIANTE': return { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' };
    case 'INTERMEDIÁRIO': return { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100' };
    case 'AVANÇADO': return { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-100' };
    default: return { bg: 'bg-slate-50', text: 'text-slate-700', badge: 'bg-slate-100' };
  }
};

const formatTimeUntil = (isoString: string) => {
  const future = new Date(isoString);
  const now = new Date();
  const diff = future.getTime() - now.getTime();
  
  if (diff < 60000) return 'Começando agora';
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `Em ${minutes} min`;
  }
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `Em ${hours}h`;
  }
  return `${Math.ceil(diff / 86400000)} dias`;
};

const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

// ─── Components ───────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="px-4 py-8"
  >
    <div className="text-center space-y-2 mb-8">
      <h1 className="ios-title text-[32px]">
        Seu próximo passo <span className="text-primary">na clínica</span>
      </h1>
      <p className="ios-text-secondary text-base">
        Estude, prepare e execute com clareza
      </p>
    </div>
  </motion.div>
);

const NextAppointmentCard: React.FC<{ appointment: NextAppointment | null }> = ({ 
  appointment 
}) => {
  if (!appointment) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-4 mb-6"
      >
        <div className="ios-card bg-slate-50 text-center py-8">
          <Calendar size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500 font-medium">Nenhum atendimento próximo</p>
        </div>
      </motion.div>
    );
  }

  const colors = getDifficultyColor(appointment.difficulty);
  const timeUntil = formatTimeUntil(appointment.start_time);
  const appointmentTime = formatTime(appointment.start_time);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 mb-6"
    >
      <div className={`ios-card ${colors.bg} border-2 border-primary/10 overflow-hidden`}>
        {/* Header com badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`${colors.badge} text-xs font-bold px-3 py-1 rounded-full ${colors.text}`}>
                {appointment.difficulty}
              </span>
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary font-bold text-sm"
              >
                {timeUntil}
              </motion.span>
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1E]">{appointment.patient_name}</h3>
          </div>
          <Zap size={24} className="text-primary" />
        </div>

        {/* Procedimento principal */}
        <div className="bg-white/60 rounded-[16px] p-3 mb-4">
          <p className="text-sm text-slate-600 mb-1">Procedimento</p>
          <p className="font-semibold text-[#1C1C1E]">{appointment.procedure}</p>
        </div>

        {/* Grid de info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/60 rounded-[12px] p-3">
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">
              Horário
            </p>
            <p className="font-bold text-base text-[#1C1C1E] flex items-center gap-1">
              <Clock size={14} className="text-primary" />
              {appointmentTime}
            </p>
          </div>
          <div className="bg-white/60 rounded-[12px] p-3">
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">
              Clínica
            </p>
            <p className="font-bold text-sm text-[#1C1C1E]">{appointment.clinic}</p>
          </div>
        </div>

        {/* Supervisor */}
        <div className="bg-primary/5 rounded-[12px] p-3 mb-4 border border-primary/10">
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">
            Supervisão
          </p>
          <p className="font-semibold text-primary text-sm">{appointment.dentist_supervisor}</p>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <button className="ios-button-secondary text-sm flex-1 py-3">
            Ver Detalhes
          </button>
          <button className="ios-button-primary text-sm flex-1 py-3">
            Preparar <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuickPreparationCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className="px-4 mb-6"
  >
    <div className="ios-card bg-gradient-to-br from-primary/5 to-primary/2">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-primary/10 rounded-full p-2">
          <Zap size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#1C1C1E]">Preparação rápida</h3>
          <p className="text-[13px] text-slate-600">3 passos antes da clínica</p>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { icon: BookOpen, text: 'Revisar estudo do procedimento' },
          { icon: CheckCircle2, text: 'Confirmar instrumentais' },
          { icon: Brain, text: 'Visualizar casos anteriores' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <item.icon size={16} className="text-primary" />
            <span className="text-sm font-medium text-[#1C1C1E]">{item.text}</span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-primary text-white rounded-[16px] font-semibold text-sm hover:opacity-95 transition-all">
        Iniciar Preparação
      </button>
    </div>
  </motion.div>
);

const SectionCard: React.FC<{
  icon: any;
  title: string;
  description: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}> = ({ icon: Icon, title, description, badge, onClick, className = '' }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`ios-card w-full text-left transition-all duration-200 hover:shadow-[0_8px_32px_rgba(12,155,114,0.15)] ${className}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="bg-primary/10 rounded-full p-3">
        <Icon size={24} className="text-primary" />
      </div>
      {badge && (
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}
    </div>
    <h3 className="font-bold text-[#1C1C1E] mb-1">{title}</h3>
    <p className="text-[13px] text-slate-600 mb-3">{description}</p>
    <div className="flex items-center gap-1 text-primary font-medium text-sm">
      Ver <ChevronRight size={16} />
    </div>
  </motion.button>
);

const StudyMaterialsPreview: React.FC = () => {
  const materials = academyStudyMaterials.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="px-4 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="os-subtitle font-bold text-lg">Estude Agora</h2>
        <button className="text-primary font-medium text-sm flex items-center gap-1">
          Ver tudo <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {materials.map((material, i) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="ios-card bg-gradient-to-r from-slate-50 to-white"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{material.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#1C1C1E] text-sm mb-1">
                  {material.title}
                </h4>
                <p className="text-[12px] text-slate-600 line-clamp-1 mb-2">
                  {material.summary}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {material.duration}
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {material.category}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ChecklistPreview: React.FC = () => {
  const checklist = academyChecklist[0];
  const completed = checklist.tasks.filter(t => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="px-4 mb-6"
    >
      <div className="ios-card border-2 border-primary/10 bg-gradient-to-br from-primary/2 to-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-full p-2">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
            <h3 className="font-bold text-[#1C1C1E]">Checklist: Antes da Clínica</h3>
          </div>
          <span className="text-sm font-bold text-primary">
            {completed}/{checklist.tasks.length}
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completed / checklist.tasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-primary h-full"
          />
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {checklist.tasks.map((task, i) => (
            <div key={task.id} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed 
                  ? 'bg-primary border-primary' 
                  : 'border-slate-300'
              }`}>
                {task.completed && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className={`text-sm ${
                task.completed 
                  ? 'line-through text-slate-400' 
                  : 'text-[#1C1C1E]'
              }`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-primary font-semibold text-sm border border-primary rounded-[16px] hover:bg-primary/5 transition-all">
          Ver Checklist Completo
        </button>
      </div>
    </motion.div>
  );
};

const TipOfTheDay: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.3 }}
    className="px-4 mb-6"
  >
    <div className="ios-card bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-orange-400">
      <div className="flex gap-3">
        <div className="text-3xl">💡</div>
        <div>
          <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wide mb-1">
            DICA DO DIA
          </p>
          <p className="text-sm font-medium text-[#1C1C1E]">
            {academyTipsDayTip.content}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const NavigationGrid: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.15 }}
    className="px-4 mb-8 grid grid-cols-2 gap-3"
  >
    <SectionCard
      icon={Users}
      title="Meus Pacientes"
      description="Preparar casos"
      badge={academyPatients.length}
    />
    <SectionCard
      icon={Calendar}
      title="Próximas Datas"
      description="Visualizar agenda"
      badge={academieMockAppointments.length}
    />
    <SectionCard
      icon={BookOpen}
      title="Materiais"
      description="Estudar procedimentos"
      badge={academyStudyMaterials.length}
    />
    <SectionCard
      icon={Award}
      title="Progresso"
      description="Seu desenvolvimento"
      badge="7º sem"
    />
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export const Academy: React.FC<AcademyProps> = ({ user, onNavigate }) => {
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);

  useEffect(() => {
    // Get the first upcoming appointment
    const now = new Date();
    const upcoming = academieMockAppointments
      .filter(apt => new Date(apt.start_time) > now)
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
      [0];
    
    setNextAppointment(upcoming || null);
  }, []);

  return (
    <div className="flex-1 bg-[#F2F2F7] overflow-y-auto pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 bg-[#F2F2F7]/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <span className="font-bold text-[#1C1C1E]">Academy</span>
          </div>
          <button className="p-2 hover:bg-white/60 rounded-full transition-all">
            <Home size={20} className="text-[#1C1C1E]" />
          </button>
        </div>

        {/* Content */}
        <HeroSection />
        <NextAppointmentCard appointment={nextAppointment} />
        <QuickPreparationCard />
        <NavigationGrid />
        <StudyMaterialsPreview />
        <ChecklistPreview />
        <TipOfTheDay />

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
};
