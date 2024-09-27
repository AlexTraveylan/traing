import { createUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, password, avatar } = body

  if (!username || !password) {
    return NextResponse.json(
      { error: "Nom d'utilisateur et mot de passe requis" },
      { status: 400 }
    )
  }

  try {
    const newUser = await createUser(username, password, avatar)

    return NextResponse.json({
      message: "Utilisateur créé avec succès",
      user: newUser,
    })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error)

    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    )
  }
}
