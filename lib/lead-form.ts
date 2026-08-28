import { z } from "zod";

/**
 * "Ficha de inscrição" — formulário multi-etapas de consultoria.
 * Estrutura inspirada em szandor.vercel.app/admin/formulario (ver docs/STACK.md),
 * campos e textos originais para o Arruda Army.
 *
 * Envio: sem backend — ao concluir, abre o WhatsApp do cliente
 * (wa.me) com a ficha já preenchida na mensagem. Ver docs/STACK.md.
 */

// WhatsApp do cliente (Arruda Army) — número informado pelo usuário, formato wa.me (só dígitos, com DDI).
export const ARRUDA_ARMY_WHATSAPP = "5582996018734";

export function buildWhatsAppLink(values: LeadFormValues): string {
  const text = encodeURIComponent(formatSummary(values));
  return `https://wa.me/${ARRUDA_ARMY_WHATSAPP}?text=${text}`;
}

export const leadFormSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo."),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido com DDD."),
  instagram: z.string().trim().optional(),

  idade: z.string().trim().min(1, "Informe sua idade."),
  sexo: z.enum(["masculino", "feminino", "prefiro-nao-dizer"], {
    message: "Selecione uma opção.",
  }),
  altura: z.string().trim().min(1, "Informe sua altura (cm)."),
  peso: z.string().trim().min(1, "Informe seu peso atual (kg)."),

  nivel: z.enum(["iniciante", "intermediario", "avancado"], {
    message: "Selecione seu nível.",
  }),
  diasSemana: z.enum(["1-2", "3-4", "5-6", "7"], {
    message: "Selecione a disponibilidade.",
  }),
  local: z.enum(["casa", "academia", "ambos"], {
    message: "Selecione onde você treina.",
  }),

  objetivo: z.enum(["emagrecimento", "hipertrofia", "performance", "saude"], {
    message: "Selecione seu objetivo principal.",
  }),
  motivacao: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo 10 caracteres)."),

  protocolo: z.enum(["treino-dieta", "so-treino", "so-dieta"], {
    message: "Selecione uma opção.",
  }),
  restricoes: z.string().trim().optional(),

  consentimento: z.literal(true, {
    message: "É preciso autorizar o contato para enviar a ficha.",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadFormDefaults: LeadFormValues = {
  nome: "",
  whatsapp: "",
  instagram: "",
  idade: "",
  sexo: undefined as unknown as LeadFormValues["sexo"],
  altura: "",
  peso: "",
  nivel: undefined as unknown as LeadFormValues["nivel"],
  diasSemana: undefined as unknown as LeadFormValues["diasSemana"],
  local: undefined as unknown as LeadFormValues["local"],
  objetivo: undefined as unknown as LeadFormValues["objetivo"],
  motivacao: "",
  protocolo: undefined as unknown as LeadFormValues["protocolo"],
  restricoes: "",
  consentimento: false as unknown as true,
};

export const LEAD_FORM_STORAGE_KEY = "arruda-army:ficha-inscricao";

export interface FormStep {
  id: string;
  label: string;
  title: string;
  description: string;
  fields: (keyof LeadFormValues)[];
}

export const formSteps: FormStep[] = [
  {
    id: "identificacao",
    label: "Identificação",
    title: "Identificação",
    description: "O básico para começarmos seu arquivo.",
    fields: ["nome", "whatsapp", "instagram"],
  },
  {
    id: "perfil",
    label: "Perfil",
    title: "Perfil físico",
    description: "Ponto de partida para calibrar o treino e a dieta.",
    fields: ["idade", "sexo", "altura", "peso"],
  },
  {
    id: "rotina",
    label: "Rotina",
    title: "Rotina de treino",
    description: "Onde e quanto você tem disponível hoje.",
    fields: ["nivel", "diasSemana", "local"],
  },
  {
    id: "motivacao",
    label: "Motivação",
    title: "Objetivo e motivação",
    description: "O que te trouxe até aqui, sem enrolação.",
    fields: ["objetivo", "motivacao"],
  },
  {
    id: "protocolo",
    label: "Protocolo",
    title: "Protocolo desejado",
    description: "Escopo do acompanhamento e restrições a considerar.",
    fields: ["protocolo", "restricoes"],
  },
  {
    id: "contato",
    label: "Contato",
    title: "Revisão e envio",
    description: "Confira a ficha antes de enviar.",
    fields: ["consentimento"],
  },
];

export function formatSummary(values: LeadFormValues): string {
  const sexoLabel: Record<string, string> = {
    masculino: "Masculino",
    feminino: "Feminino",
    "prefiro-nao-dizer": "Prefiro não dizer",
  };
  const nivelLabel: Record<string, string> = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };
  const localLabel: Record<string, string> = {
    casa: "Casa",
    academia: "Academia",
    ambos: "Casa e academia",
  };
  const objetivoLabel: Record<string, string> = {
    emagrecimento: "Emagrecimento",
    hipertrofia: "Hipertrofia",
    performance: "Performance",
    saude: "Saúde geral",
  };
  const protocoloLabel: Record<string, string> = {
    "treino-dieta": "Treino + dieta",
    "so-treino": "Só treino",
    "so-dieta": "Só dieta",
  };

  return [
    "FICHA DE INSCRIÇÃO — ARRUDA ARMY",
    "",
    `Nome: ${values.nome}`,
    `WhatsApp: ${values.whatsapp}`,
    values.instagram ? `Instagram: ${values.instagram}` : null,
    "",
    `Idade: ${values.idade}`,
    `Sexo: ${sexoLabel[values.sexo] ?? "-"}`,
    `Altura: ${values.altura} cm`,
    `Peso: ${values.peso} kg`,
    "",
    `Nível: ${nivelLabel[values.nivel] ?? "-"}`,
    `Dias disponíveis/semana: ${values.diasSemana}`,
    `Local de treino: ${localLabel[values.local] ?? "-"}`,
    "",
    `Objetivo: ${objetivoLabel[values.objetivo] ?? "-"}`,
    `Motivação: ${values.motivacao}`,
    "",
    `Protocolo desejado: ${protocoloLabel[values.protocolo] ?? "-"}`,
    values.restricoes ? `Restrições/lesões: ${values.restricoes}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
