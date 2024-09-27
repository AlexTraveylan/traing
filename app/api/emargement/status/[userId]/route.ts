import { verifierStatutEmargement } from "@/lib/emargement"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const resultat = await verifierStatutEmargement(parseInt(params.userId))

  return NextResponse.json(resultat)
}
