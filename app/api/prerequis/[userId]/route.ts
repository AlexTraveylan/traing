import { getPrerequisAnswers } from "@/lib/prerequis"
import { NextRequest, NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId)

  try {
    const answers = await getPrerequisAnswers(userId)
    return NextResponse.json({ hasSubmitted: true, answers })
  } catch (error) {
    if (error instanceof Error && error.message === "Prerequis not found") {
      return NextResponse.json({ hasSubmitted: false })
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
