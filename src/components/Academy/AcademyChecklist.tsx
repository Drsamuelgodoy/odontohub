import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronRight,
  Check,
  AlertCircle,
  Clock,
  Zap
} from '../icons';
import { academyChecklist, academyNextSteps } from './mockData';

interface AcademyChecklistProps {
  appointmentId?: number;
}

export const AcademyChecklist: React.FC<AcademyChecklistProps> = ({ appointmentId }) => {
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(academyChecklist.flatMap(s => s.tasks.filter(t => t.completed).map(t => t.id)))
  );

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompleted(newCompleted);
  };

  const getTotalProgress = () => {
    const total = academyChecklist.reduce((acc, s) => acc + s.tasks.length, 0);
    return Math.round((completed.size / total) * 100);
  };

  const getStepIcon = (step: string) => {
    if (step.includes('ANTES')) return '📚';
    if (step.includes('NA')) return '🏥';
    return '📝';
  };

  const nextSteps = academyNextSteps[0];

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
            <h1 className="ios-title text-2xl mb-1">Seu Caminho</h1>
            <p className="ios-text-secondary">Antes, durante e depois da clínica</p>
          </div>

          {/* Overall Progress */}
          <div className="ios-card bg-gradient-to-r from-primary/5 to-primary/2 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1C1C1E]">Progresso Geral</h3>
              <span className="text-xl font-bold text-primary">{getTotalProgress()}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getTotalProgress()}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-primary to-emerald-500 h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Next Steps Alert */}
        {nextSteps && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-4 mb-4"
          >
            <div className="ios-card bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-orange-400">
              <div className="flex gap-3 mb-3">
                <div className="text-2xl shrink-0">⚡</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">
                    PREPARE-SE PARA
                  </p>
                  <p className="font-bold text-[#1C1C1E]">{nextSteps.appointment}</p>
                </div>
              </div>

              <div className="space-y-2">
                {nextSteps.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold text-sm">{i + 1}.</span>
                    <p className="text-sm text-slate-700">{step}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 py-2 bg-orange-500 text-white rounded-[16px] font-semibold text-sm hover:opacity-95 transition-all">
                Iniciar Preparação
              </button>
            </div>
          </motion.div>
        )}

        {/* Checklists by Phase */}
        <div className="px-4 space-y-4 py-4">
          {academyChecklist.map((phase, phaseIndex) => {
            const completedInPhase = phase.tasks.filter(t => completed.has(t.id)).length;
            const totalInPhase = phase.tasks.length;
            const phaseProgress = Math.round((completedInPhase / totalInPhase) * 100);

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: phaseIndex * 0.1 }}
              >
                <div className="ios-card">
                  {/* Phase Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">{getStepIcon(phase.step)}</div>
                    <div className="flex-1">
                      <h2 className="font-bold text-[#1C1C1E] text-lg mb-1">
                        {phase.step}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium">
                        {completedInPhase} de {totalInPhase} concluídos ({phaseProgress}%)
                      </p>
                    </div>
                  </div>

                  {/* Phase Progress Bar */}
                  <div className="mb-4 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${phaseProgress}%` }}
                      transition={{ duration: 0.5 }}
                      className="bg-primary h-full"
                    />
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2.5 max-h-96 overflow-y-auto">
                    {phase.tasks.map((task, taskIndex) => (
                      <motion.button
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: taskIndex * 0.05 }}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full p-3 rounded-[12px] border-2 transition-all flex items-start gap-3 text-left ${
                          completed.has(task.id)
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-slate-50 border-slate-200 hover:border-primary/50'
                        }`}
                      >
                        {/* Checkbox */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          completed.has(task.id)
                            ? 'bg-primary border-primary'
                            : 'border-slate-300'
                        }`}>
                          {completed.has(task.id) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>

                        {/* Task Text */}
                        <span className={`flex-1 text-sm font-medium transition-all ${
                          completed.has(task.id)
                            ? 'line-through text-slate-500'
                            : 'text-[#1C1C1E]'
                        }`}>
                          {task.title}
                        </span>

                        {/* Completion animation */}
                        {completed.has(task.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="shrink-0 text-primary"
                          >
                            <CheckCircle2 size={18} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Phase CTA */}
                  {completedInPhase < totalInPhase && (
                    <button className="w-full mt-4 py-2 border-2 border-primary text-primary rounded-[16px] font-semibold text-sm hover:bg-primary/5 transition-all">
                      Completar Fase
                    </button>
                  )}

                  {completedInPhase === totalInPhase && (
                    <div className="w-full mt-4 py-2 bg-primary/10 text-primary rounded-[16px] font-semibold text-sm text-center">
                      ✓ Fase Concluída
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="px-4 mb-8 mt-6">
          <div className="ios-card bg-slate-50">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Dica</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Complete todas as tarefas antes de cada atendimento para garantir que você está totalmente preparado. A preparação é 80% do sucesso clínico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
