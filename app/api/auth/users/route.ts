import prisma from "@/lib/prisma-client"
import { NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  return NextResponse.json({ users })
}
