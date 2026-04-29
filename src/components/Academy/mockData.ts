// Academy Mock Data - Dados académicos e clínicos para estudantes

export const academieMockAppointments = [
  {
    id: 1,
    patient_name: 'Maria Silva',
    patient_id: 101,
    start_time: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    procedure: 'Profilaxia + Restauração',
    tooth_numbers: [46],
    dentist_supervisor: 'Prof. Dr. João Santos',
    clinic: 'Clínica Escola - Bloco A',
    difficulty: 'INTERMEDIÁRIO'
  },
  {
    id: 2,
    patient_name: 'Carlos Mendes',
    patient_id: 102,
    start_time: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(new Date().getTime() + 25 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    procedure: 'Avaliação + Anamnese',
    tooth_numbers: [],
    dentist_supervisor: 'Prof. Dra. Ana Costa',
    clinic: 'Clínica Escola - Bloco B',
    difficulty: 'INICIANTE'
  },
  {
    id: 3,
    patient_name: 'Pedro Oliveira',
    patient_id: 103,
    start_time: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(new Date().getTime() + 49 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    procedure: 'Endodontia - Preparo do Canal',
    tooth_numbers: [11],
    dentist_supervisor: 'Prof. Ricardo Araújo',
    clinic: 'Clínica Escola - Bloco C',
    difficulty: 'AVANÇADO'
  }
];

export const academyStudents = [
  {
    id: 1,
    name: 'João Pedro Silva',
    registration: '2023001',
    semester: '7º',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=João',
    performance: 85,
    next_procedure: 'Restauração em resina'
  },
  {
    id: 2,
    name: 'Maria Santos Costa',
    registration: '2023002',
    semester: '7º',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    performance: 92,
    next_procedure: 'Endodontia'
  }
];

export const academyPatients = [
  {
    id: 101,
    name: 'Maria Silva',
    cpf: '123.456.789-00',
    phone: '(85) 99123-4567',
    birth_date: '1980-05-15',
    chief_complaint: 'Dor em elemento posterior direito',
    appointment_status: 'PRÓXIMO',
    appointment_date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    clinical_notes: 'Paciente ansioso, primeira vez na clínica',
    treatment_plan: [
      { tooth: 46, procedure: 'Restauração em resina', status: 'PLANEJADO' }
    ],
    difficulty_level: 'INTERMEDIÁRIO'
  },
  {
    id: 102,
    name: 'Carlos Mendes',
    cpf: '987.654.321-00',
    phone: '(85) 99876-5432',
    birth_date: '1992-08-22',
    chief_complaint: 'Avaliação inicial',
    appointment_status: 'AGENDADO',
    appointment_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    clinical_notes: 'Novo paciente, sem histórico médico relevante',
    treatment_plan: [],
    difficulty_level: 'INICIANTE'
  },
  {
    id: 103,
    name: 'Pedro Oliveira',
    cpf: '456.789.123-00',
    phone: '(85) 98765-4321',
    birth_date: '1975-03-10',
    chief_complaint: 'Dor em elemento anterior',
    appointment_status: 'AGENDADO',
    appointment_date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(),
    clinical_notes: 'Paciente hipertenso, fazer anamnese completa',
    treatment_plan: [
      { tooth: 11, procedure: 'Endodontia', status: 'PENDENTE' }
    ],
    difficulty_level: 'AVANÇADO'
  }
];

export const academyStudyMaterials = [
  {
    id: 1,
    title: 'Técnica de Profilaxia',
    category: 'PREVENÇÃO',
    duration: '5 min',
    icon: '🧼',
    procedures: ['Profilaxia', 'Limpeza'],
    summary: 'Aprenda a técnica correta de remoção de placa e tártaro'
  },
  {
    id: 2,
    title: 'Restauração em Resina - Passo a Passo',
    category: 'RESTAURADOR',
    duration: '8 min',
    icon: '🦷',
    procedures: ['Restauração em resina'],
    summary: 'Sequência clínica completa para restaurações de resina composta'
  },
  {
    id: 3,
    title: 'Anamnese: O que perguntar em 3 minutos',
    category: 'DIAGNÓSTICO',
    duration: '3 min',
    icon: '📋',
    procedures: ['Avaliação', 'Anamnese'],
    summary: 'Checklist essencial de perguntas iniciais com o paciente'
  },
  {
    id: 4,
    title: 'Isolamento do Campo Operatório',
    category: 'TÉCNICA',
    duration: '6 min',
    icon: '🔒',
    procedures: ['Isolamento do campo', 'Endodontia'],
    summary: 'Técnicas de isolamento com dique de borracha e espátula'
  },
  {
    id: 5,
    title: 'Instrumentação de Canal - Básico',
    category: 'ENDODONTIA',
    duration: '10 min',
    icon: '✂️',
    procedures: ['Endodontia', 'Canal radicular'],
    summary: 'Introdução às técnicas de preparo de canal'
  }
];

export const academyChecklist = [
  {
    id: 1,
    step: 'ANTES DA CLÍNICA',
    tasks: [
      { id: 'a1', title: 'Revisar anamnese do paciente', completed: false },
      { id: 'a2', title: 'Estudar o plano de tratamento', completed: false },
      { id: 'a3', title: 'Preparar instrumentais', completed: true },
      { id: 'a4', title: 'Revisar técnica do procedimento', completed: false }
    ]
  },
  {
    id: 2,
    step: 'NA CLÍNICA',
    tasks: [
      { id: 'b1', title: 'Acolher o paciente', completed: false },
      { id: 'b2', title: 'Explicar o procedimento', completed: false },
      { id: 'b3', title: 'Executar com segurança', completed: false },
      { id: 'b4', title: 'Documentar evolução', completed: false }
    ]
  },
  {
    id: 3,
    step: 'DEPOIS DA CLÍNICA',
    tasks: [
      { id: 'c1', title: 'Anotar na evolução', completed: false },
      { id: 'c2', title: 'Tirar fotos do caso', completed: false },
      { id: 'c3', title: 'Fazer devolutiva do professor', completed: false }
    ]
  }
];

export const academyNextSteps = [
  {
    id: 1,
    appointment: 'Maria Silva - Profilaxia + Restauração',
    steps: [
      'Revisar vídeo de técnica de profilaxia',
      'Estudar o material de resina que será utilizado',
      'Preparar bandeja de instrumentais',
      'Revisar anamnese completa do paciente',
      'Chegar 15 min antes para se preparar'
    ]
  }
];

export const academyTipsDayTip = {
  title: 'Dica do Dia',
  content: 'Sempre comece pedindo consentimento antes de qualquer procedimento. Isso cria confiança e reduz ansiedade do paciente.',
  category: 'ETIQUETA'
};
