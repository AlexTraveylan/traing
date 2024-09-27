import {
  addEvaluation,
  evaluationSchema,
  getAllEvaluations,
} from "@/lib/evaluation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, ...data } = body

  if (!userId) {
    return NextResponse.json({ error: "UserId manquant" }, { status: 400 })
  }

  const validationResult = evaluationSchema.safeParse(data)
  if (!validationResult.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 })
  }

  addEvaluation(userId, validationResult.data)
  return NextResponse.json({ message: "Réponse enregistrée avec succès" })
}

export async function GET(request: NextRequest) {
  const allEvaluations = getAllEvaluations()
  return NextResponse.json(allEvaluations)
}
