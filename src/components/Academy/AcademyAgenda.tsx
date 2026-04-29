import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronRight, 
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronDown
} from '../icons';
import { academieMockAppointments } from './mockData';

interface AcademyAgendaProps {
  onSelectAppointment?: (appointment: any) => void;
}

export const AcademyAgenda: React.FC<AcademyAgendaProps> = ({ onSelectAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Get appointments for selected date
  const getAppointmentsForDate = (date: Date) => {
    return academieMockAppointments.filter(apt => {
      const aptDate = new Date(apt.start_time);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  // Get week dates
  const getWeekDates = (date: Date) => {
    const dates = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(curr.setDate(first + i)));
    }
    return dates;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'INICIANTE': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'INTERMEDIÁRIO': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'AVANÇADO': return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const weekDates = getWeekDates(selectedDate);
  const appointmentsForDate = getAppointmentsForDate(selectedDate);
  const monthYear = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const dayName = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' });

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
            <h1 className="ios-title text-2xl mb-1">Agenda</h1>
            <p className="ios-text-secondary">Seus atendimentos de clínica</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-4">
            {['day', 'week'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`flex-1 py-2 rounded-full font-medium text-sm transition-all ${
                  viewMode === mode
                    ? 'bg-primary text-white'
                    : 'bg-white text-[#1C1C1E] border border-slate-200'
                }`}
              >
                {mode === 'day' ? 'Dia' : 'Semana'}
              </button>
            ))}
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-white rounded-full transition-all"
            >
              <ChevronLeft size={20} className="text-[#1C1C1E]" />
            </button>

            <div className="text-center">
              <p className="text-sm font-semibold text-[#1C1C1E] capitalize">
                {viewMode === 'day' ? dayName : 'Semana'} • {monthYear}
              </p>
              <p className="text-xs text-slate-600">
                {selectedDate.toLocaleDateString('pt-BR')}
              </p>
            </div>

            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-white rounded-full transition-all"
            >
              <ChevronRight size={20} className="text-[#1C1C1E]" />
            </button>
          </div>

          {/* Week View - Days Selector */}
          {viewMode === 'week' && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
              {weekDates.map((date, i) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const dayNum = date.getDate();
                const dayShort = date.toLocaleDateString('pt-BR', { weekday: 'short' });

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-[12px] transition-all shrink-0 ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-white text-[#1C1C1E] border border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase">{dayShort}</span>
                    <span className="text-sm font-bold">{dayNum}</span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Appointments List */}
        <div className="px-4 space-y-3 py-4">
          {appointmentsForDate.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Calendar size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 font-medium">Nenhum atendimento agendado</p>
              <p className="text-sm text-slate-400 mt-1">Escolha outra data</p>
            </motion.div>
          ) : (
            appointmentsForDate.map((appointment, index) => {
              const colors = getDifficultyColor(appointment.difficulty);
              const appointmentTime = formatTime(appointment.start_time);

              return (
                <motion.button
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectAppointment?.(appointment)}
                  className={`ios-card w-full text-left ${colors.bg} border-l-4 ${colors.border} hover:shadow-md transition-all`}
                >
                  {/* Time Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={colors.text} />
                      <span className={`font-bold text-sm ${colors.text}`}>
                        {appointmentTime}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors.text} bg-white/40`}>
                      {appointment.difficulty}
                    </span>
                  </div>

                  {/* Patient Name */}
                  <h3 className="font-bold text-[#1C1C1E] text-base mb-2">
                    {appointment.patient_name}
                  </h3>

                  {/* Procedure */}
                  <div className="bg-white/60 rounded-[12px] p-2 mb-3">
                    <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wide mb-1">
                      Procedimento
                    </p>
                    <p className="font-semibold text-[#1C1C1E] text-sm">
                      {appointment.procedure}
                    </p>
                  </div>

                  {/* Location & Supervisor */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-slate-500 shrink-0" />
                      <span className="text-slate-700">{appointment.clinic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={14} className="text-slate-500 shrink-0" />
                      <span className="text-slate-700">{appointment.dentist_supervisor}</span>
                    </div>
                  </div>

                  {/* Teeth Numbers */}
                  {appointment.tooth_numbers.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wide mb-2">
                        Dentes
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {appointment.tooth_numbers.map((tooth, i) => (
                          <span key={i} className="bg-white text-slate-700 font-bold px-2 py-1 rounded text-xs">
                            {tooth}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex gap-2 pt-3 border-t border-white/30">
                    <button className="ios-button-secondary text-xs flex-1 py-2">
                      Detalhes
                    </button>
                    <button className="ios-button-primary text-xs flex-1 py-2">
                      Preparar
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
