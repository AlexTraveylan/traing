import { getAllPrerequisAnswers, savePrerequisAnswers } from "@/lib/prerequis"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId, answers } = await request.json()

  if (!userId) {
    return NextResponse.json(
      { error: "ID utilisateur manquant" },
      { status: 400 }
    )
  }

  try {
    await savePrerequisAnswers(userId, answers)
    return NextResponse.json({ message: "Réponses enregistrées avec succès" })
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const answers = await getAllPrerequisAnswers()
    return NextResponse.json({ answers })
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des réponses" },
      { status: 500 }
    )
  }
}
