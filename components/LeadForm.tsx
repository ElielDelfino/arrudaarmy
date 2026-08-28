"use client";

import { useEffect, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import {
  buildWhatsAppLink,
  formSteps,
  formatSummary,
  leadFormDefaults,
  leadFormSchema,
  LEAD_FORM_STORAGE_KEY,
  type LeadFormValues,
} from "@/lib/lead-form";

const inputClass =
  "w-full rounded-sm border border-chrome/15 bg-teal-700/30 px-3 py-2 font-body text-sm text-chrome placeholder:text-chrome-dim/40 focus:border-brass focus:outline-none md:px-4 md:py-3 md:text-base";
const labelClass =
  "mb-1 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chrome-dim md:mb-2 md:text-xs";
const errorClass = "mt-1 font-mono text-[0.7rem] text-brass-bright md:text-xs";

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: leadFormDefaults,
    mode: "onBlur",
  });

  // Restaura o rascunho salvo neste navegador (autosave local — sem backend ainda).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LEAD_FORM_STORAGE_KEY);
      if (raw) reset({ ...leadFormDefaults, ...JSON.parse(raw) });
    } catch {
      // rascunho corrompido ou indisponível — segue com os valores padrão
    } finally {
      setHydrated(true);
    }
  }, [reset]);

  const values = watch();
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(LEAD_FORM_STORAGE_KEY, JSON.stringify(values));
  }, [values, hydrated]);

  const step = formSteps[currentStep];
  const isLastStep = currentStep === formSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const summary = formatSummary(values);

  async function handleNext() {
    const valid = await trigger(step.fields as FieldPath<LeadFormValues>[]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, formSteps.length - 1));
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit() {
    const url = buildWhatsAppLink(getValues());
    setWhatsappUrl(url);
    // Abre o WhatsApp do Arruda Army com a ficha já preenchida na mensagem.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setWhatsappOpened(!!opened);
    window.localStorage.removeItem(LEAD_FORM_STORAGE_KEY);
    setSubmitted(true);
  }

  return (
    <section
      id="inscricao"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center bg-teal-800 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright">
          Ficha de inscrição
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-chrome md:mt-3 md:text-5xl">
          Vamos começar pelo básico.
        </h2>

        {submitted ? (
          <div className="mt-6 rounded-sm border border-brass/40 bg-teal-900/60 p-5 md:mt-14 md:p-8">
            <p className="font-heading text-xl font-semibold text-chrome md:text-2xl">
              Ficha concluída.
            </p>
            <p className="mt-2 text-sm text-chrome-dim md:text-base">
              {whatsappOpened
                ? "Abrimos o WhatsApp com sua ficha preenchida — confirme o envio na aba/app que abriu."
                : "Seu navegador bloqueou a abertura automática. Toque no botão abaixo para enviar pelo WhatsApp."}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-sm bg-brass px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-bright md:mt-5 md:px-7 md:py-3.5"
            >
              Abrir WhatsApp
            </a>
            <pre className="mt-4 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-sm border border-chrome/10 bg-teal-800/60 p-4 font-mono text-xs leading-relaxed text-chrome-dim md:mt-6 md:max-h-none md:p-6 md:text-sm">
              {formatSummary(getValues())}
            </pre>
          </div>
        ) : (
          <>
            {/* Progresso — pontos de checagem numerados, estilo ficha */}
            <ol className="mt-5 flex items-center gap-1 sm:gap-2 md:mt-10">
              {formSteps.map((s, i) => (
                <li key={s.id} className="flex flex-1 items-center gap-1 sm:gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem] transition-colors sm:h-8 sm:w-8 sm:text-xs ${
                      i <= currentStep
                        ? "bg-brass text-ink"
                        : "border border-chrome/20 text-chrome-dim/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i < formSteps.length - 1 && (
                    <span
                      className={`h-px flex-1 ${i < currentStep ? "bg-brass" : "bg-chrome/15"}`}
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-chrome-dim/70 md:mt-3 md:text-xs">
              {step.label} · {currentStep + 1}/{formSteps.length}
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 md:mt-8"
              noValidate
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-heading text-base font-semibold text-chrome md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 mb-3 text-xs text-chrome-dim md:mb-6 md:text-sm">{step.description}</p>

                  <div className="grid gap-3 sm:grid-cols-2 md:gap-5">
                    {step.id === "identificacao" && (
                      <>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="nome">
                            Nome completo
                          </label>
                          <input id="nome" className={inputClass} placeholder="Seu nome" {...register("nome")} />
                          {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="whatsapp">
                            WhatsApp
                          </label>
                          <input
                            id="whatsapp"
                            className={inputClass}
                            placeholder="(11) 99999-0000"
                            {...register("whatsapp")}
                          />
                          {errors.whatsapp && <p className={errorClass}>{errors.whatsapp.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="instagram">
                            Instagram (opcional)
                          </label>
                          <input
                            id="instagram"
                            className={inputClass}
                            placeholder="@seuusuario"
                            {...register("instagram")}
                          />
                        </div>
                      </>
                    )}

                    {step.id === "perfil" && (
                      <>
                        <div>
                          <label className={labelClass} htmlFor="idade">
                            Idade
                          </label>
                          <input id="idade" className={inputClass} inputMode="numeric" {...register("idade")} />
                          {errors.idade && <p className={errorClass}>{errors.idade.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="sexo">
                            Sexo
                          </label>
                          <select id="sexo" className={inputClass} defaultValue="" {...register("sexo")}>
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                          </select>
                          {errors.sexo && <p className={errorClass}>{errors.sexo.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="altura">
                            Altura (cm)
                          </label>
                          <input id="altura" className={inputClass} inputMode="numeric" {...register("altura")} />
                          {errors.altura && <p className={errorClass}>{errors.altura.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="peso">
                            Peso atual (kg)
                          </label>
                          <input id="peso" className={inputClass} inputMode="numeric" {...register("peso")} />
                          {errors.peso && <p className={errorClass}>{errors.peso.message}</p>}
                        </div>
                      </>
                    )}

                    {step.id === "rotina" && (
                      <>
                        <div>
                          <label className={labelClass} htmlFor="nivel">
                            Nível de experiência
                          </label>
                          <select id="nivel" className={inputClass} defaultValue="" {...register("nivel")}>
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="iniciante">Iniciante</option>
                            <option value="intermediario">Intermediário</option>
                            <option value="avancado">Avançado</option>
                          </select>
                          {errors.nivel && <p className={errorClass}>{errors.nivel.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="diasSemana">
                            Dias disponíveis/semana
                          </label>
                          <select
                            id="diasSemana"
                            className={inputClass}
                            defaultValue=""
                            {...register("diasSemana")}
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="1-2">1 a 2 dias</option>
                            <option value="3-4">3 a 4 dias</option>
                            <option value="5-6">5 a 6 dias</option>
                            <option value="7">Todos os dias</option>
                          </select>
                          {errors.diasSemana && (
                            <p className={errorClass}>{errors.diasSemana.message}</p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="local">
                            Local de treino
                          </label>
                          <select id="local" className={inputClass} defaultValue="" {...register("local")}>
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="casa">Casa</option>
                            <option value="academia">Academia</option>
                            <option value="ambos">Casa e academia</option>
                          </select>
                          {errors.local && <p className={errorClass}>{errors.local.message}</p>}
                        </div>
                      </>
                    )}

                    {step.id === "motivacao" && (
                      <>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="objetivo">
                            Objetivo principal
                          </label>
                          <select
                            id="objetivo"
                            className={inputClass}
                            defaultValue=""
                            {...register("objetivo")}
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="emagrecimento">Emagrecimento</option>
                            <option value="hipertrofia">Hipertrofia</option>
                            <option value="performance">Performance</option>
                            <option value="saude">Saúde geral</option>
                          </select>
                          {errors.objetivo && <p className={errorClass}>{errors.objetivo.message}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="motivacao">
                            O que te fez procurar ajuda agora?
                          </label>
                          <textarea
                            id="motivacao"
                            rows={3}
                            className={inputClass}
                            {...register("motivacao")}
                          />
                          {errors.motivacao && (
                            <p className={errorClass}>{errors.motivacao.message}</p>
                          )}
                        </div>
                      </>
                    )}

                    {step.id === "protocolo" && (
                      <>
                        <fieldset className="sm:col-span-2">
                          <legend className={labelClass}>Protocolo desejado</legend>
                          <div className="flex flex-col gap-2">
                            {[
                              { value: "treino-dieta", label: "Treino + dieta" },
                              { value: "so-treino", label: "Só treino" },
                              { value: "so-dieta", label: "Só dieta" },
                            ].map((opt) => (
                              <label
                                key={opt.value}
                                className="flex items-center gap-3 rounded-sm border border-chrome/15 bg-teal-700/30 px-3 py-2 text-sm text-chrome has-[:checked]:border-brass md:px-4 md:py-3 md:text-base"
                              >
                                <input
                                  type="radio"
                                  value={opt.value}
                                  className="accent-[var(--color-brass)]"
                                  {...register("protocolo")}
                                />
                                {opt.label}
                              </label>
                            ))}
                          </div>
                          {errors.protocolo && (
                            <p className={errorClass}>{errors.protocolo.message}</p>
                          )}
                        </fieldset>
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="restricoes">
                            Restrições ou lesões (opcional)
                          </label>
                          <textarea
                            id="restricoes"
                            rows={2}
                            className={inputClass}
                            {...register("restricoes")}
                          />
                        </div>
                      </>
                    )}

                    {step.id === "contato" && (
                      <div className="sm:col-span-2">
                        <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-sm border border-chrome/10 bg-teal-900/60 p-4 font-mono text-xs leading-relaxed text-chrome-dim md:max-h-none md:p-6 md:text-sm">
                          {summary}
                        </pre>
                        <label className="mt-3 flex items-start gap-3 text-xs text-chrome-dim md:mt-5 md:text-sm">
                          <input
                            type="checkbox"
                            className="mt-0.5 accent-[var(--color-brass)]"
                            {...register("consentimento")}
                          />
                          Autorizo o Arruda Army a entrar em contato pelos dados
                          acima para tratar da minha consultoria.
                        </label>
                        {errors.consentimento && (
                          <p className={errorClass}>{errors.consentimento.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between md:mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-chrome-dim transition-colors hover:text-chrome disabled:opacity-30"
                >
                  ← Voltar
                </button>

                {isLastStep ? (
                  <button
                    type="submit"
                    className="rounded-sm bg-brass px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-bright md:px-7 md:py-3.5"
                  >
                    Enviar ficha
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-sm bg-brass px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-bright md:px-7 md:py-3.5"
                  >
                    Próximo →
                  </button>
                )}
              </div>
            </form>

            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-chrome-dim/40 md:mt-6 md:text-[0.65rem]">
              Suas respostas ficam salvas neste navegador enquanto você preenche.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
