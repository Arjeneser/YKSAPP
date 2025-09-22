import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'   // relatif import

function devEmail() {
  return process.env.DEV_USER_EMAIL || 'demo@local'
}

export async function GET() {
  const user = await prisma.user.findUnique({ where: { email: devEmail() } })
  if (!user) return NextResponse.json({ error: 'seed needed' }, { status: 404 })

  const profile = await prisma.userProfile.findUnique({ where: { userId: user.id } })
  return NextResponse.json(profile)
}

export async function PUT(req: Request) {
  const body = await req.json()
  const { track, examYear, weeklyMinutesTarget } = body || {}

  const user = await prisma.user.findUnique({ where: { email: devEmail() } })
  if (!user) return NextResponse.json({ error: 'seed needed' }, { status: 404 })

  const updated = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: { track, examYear, weeklyMinutesTarget },
    create: { userId: user.id, track, examYear, weeklyMinutesTarget },
  })
  return NextResponse.json(updated)
}
