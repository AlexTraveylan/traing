import { getPrerequisAnswers } from "@/lib/prerequis"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId)
  const answers = getPrerequisAnswers(userId)

  if (answers) {
    return NextResponse.json({ hasSubmitted: true, answers })
  } else {
    return NextResponse.json({ hasSubmitted: false })
  }
}
