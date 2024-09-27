import { authenticateUser } from "@/lib/auth"
import prisma from "@/lib/prisma-client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  const token = await authenticateUser(username, password)

  if (!token) {
    return NextResponse.json(
      { error: "Identifiants invalides" },
      { status: 401 }
    )
  }

  const user = await prisma.user.findUnique({ where: { username } })

  return NextResponse.json({ message: "Authentification réussie", user })
}
