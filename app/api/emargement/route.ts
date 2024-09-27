import { getAllSignatures, signAttendance } from "@/lib/emargement"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId } = await request.json()

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "ID utilisateur manquant" },
      { status: 400 }
    )
  }

  const result = await signAttendance(userId)
  return NextResponse.json(result)
}

export async function GET() {
  const signatures = getAllSignatures()
  return NextResponse.json({ signatures })
}
