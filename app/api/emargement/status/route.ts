import { checkSignatureStatus } from "@/lib/emargement"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "ID utilisateur manquant" },
      { status: 400 }
    )
  }

  const result = await checkSignatureStatus(parseInt(userId, 10))
  return NextResponse.json(result)
}
