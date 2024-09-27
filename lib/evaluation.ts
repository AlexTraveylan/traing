import { z } from "zod"

// Schéma de validation pour les données d'évaluation
export const evaluationSchema = z.object({
  comprehension: z.number().min(1).max(5),
  difficultes: z.string().min(1, "Ce champ est requis"),
  commentaires: z.string().optional(),
})

export type EvaluationData = z.infer<typeof evaluationSchema>

export interface EvaluationRecord extends EvaluationData {
  date: string
}

export const defaultEvaluationAnswers: EvaluationRecord = {
  comprehension: 0,
  difficultes: "-",
  commentaires: "-",
  date: "-",
}

const evaluationResponses: Record<number, EvaluationRecord> = {}

export function addEvaluation(userId: number, data: EvaluationData): void {
  evaluationResponses[userId] = {
    ...data,
    date: new Date().toISOString(),
  }
}

export function getEvaluation(userId: number): EvaluationRecord | null {
  return evaluationResponses[userId] || null
}

export function getAllEvaluations(): Record<number, EvaluationRecord> {
  return evaluationResponses
}
