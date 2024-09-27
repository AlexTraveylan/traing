import { Prerequis } from "@prisma/client"
import prisma from "./prisma-client"

export interface PrerequisAnswersIn {
  presentation: string
  structuresDonnees: string
  bouclesIterations: string
  mathematiques: string
  numpy: string
  materiel: string
}

export async function savePrerequisAnswers(
  userId: number,
  answers: PrerequisAnswersIn
): Promise<Prerequis> {
  return await prisma.prerequis.create({
    data: {
      userId,
      presentation: answers.presentation,
      structuresDonnees: answers.structuresDonnees,
      bouclesIterations: answers.bouclesIterations,
      mathematiques: answers.mathematiques,
      numpy: answers.numpy,
      materiel: answers.materiel,
    },
  })
}

export async function getPrerequisAnswers(userId: number): Promise<Prerequis> {
  const prerequis = await prisma.prerequis.findUnique({
    where: {
      userId,
    },
  })

  if (!prerequis) {
    throw new Error("Prerequis not found")
  }

  return prerequis
}

export async function getAllPrerequisAnswers(): Promise<Prerequis[]> {
  return await prisma.prerequis.findMany()
}
