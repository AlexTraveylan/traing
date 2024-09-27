import { obtenirTousLesEmargements, signerEmargement } from "@/lib/emargement"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId } = await request.json()

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "ID utilisateur manquant" },
      { status: 400 }
    )
  }

  const resultat = await signerEmargement(userId)
  return NextResponse.json(resultat)
}

export async function GET() {
  const emargements = await obtenirTousLesEmargements()
  return NextResponse.json({ emargements })
}
