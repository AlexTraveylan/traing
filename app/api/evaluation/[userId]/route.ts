import { getEvaluation } from "@/lib/evaluation"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId)
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID utilisateur invalide" },
      { status: 400 }
    )
  }

  try {
    const evaluation = await getEvaluation(userId)
    if (!evaluation) {
      return NextResponse.json(
        { error: "Évaluation non trouvée" },
        { status: 404 }
      )
    }
    return NextResponse.json(evaluation)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'évaluation:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
