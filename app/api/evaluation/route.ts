import {
  addEvaluation,
  evaluationSchema,
  getAllEvaluations,
} from "@/lib/evaluation"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { userId, ...data } = await request.json()

  const result = evaluationSchema.safeParse(data)

  if (!result.success) {
    return NextResponse.json({ error: result.error.errors }, { status: 400 })
  }

  try {
    const evaluation = await addEvaluation(userId, result.data)
    return NextResponse.json(evaluation)
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'évaluation:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const allEvaluations = await getAllEvaluations()
  return NextResponse.json(allEvaluations)
}
