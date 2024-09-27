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

  savePrerequisAnswers(userId, answers)

  return NextResponse.json({ message: "Réponses enregistrées avec succès" })
}

export async function GET(request: NextRequest) {
  const answers = getAllPrerequisAnswers()
  return NextResponse.json({ answers })
}
