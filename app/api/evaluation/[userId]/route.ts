import { getEvaluation } from "@/lib/evaluation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId)

  const evaluation = getEvaluation(userId)
  if (!evaluation) {
    return NextResponse.json({ exists: false })
  }

  return NextResponse.json({ exists: true, ...evaluation })
}
