import { Evaluation } from "@prisma/client"
import { z } from "zod"
import prisma from "./prisma-client"

// Schéma de validation pour les données d'évaluation
export const evaluationSchema = z.object({
  comprehension: z.number().min(1).max(5),
  difficultes: z.string().min(1, "Ce champ est requis"),
  commentaires: z.string().optional(),
})

export type EvaluationData = z.infer<typeof evaluationSchema>

export const defaultEvaluationAnswers: Omit<
  Evaluation,
  "id" | "userId" | "createdAt"
> = {
  comprehension: 0,
  difficultes: "-",
  commentaires: "-",
}

export async function addEvaluation(
  userId: number,
  data: EvaluationData
): Promise<Evaluation> {
  return prisma.evaluation.create({
    data: {
      userId,
      ...data,
      commentaires: data.commentaires || "",
    },
  })
}

export async function getEvaluation(
  userId: number
): Promise<Evaluation | null> {
  return prisma.evaluation.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}

export async function getAllEvaluations(): Promise<Evaluation[]> {
  return prisma.evaluation.findMany({
    orderBy: { createdAt: "desc" },
  })
}
