// src/app/api/study-sessions/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

const devEmail = () => process.env.DEV_USER_EMAIL || 'demo@local'

export async function GET() {
  const user = await prisma.user.findUnique({ where: { email: devEmail() } })
  if (!user) return NextResponse.json([])
  const sessions = await prisma.studySession.findMany({
    where: { userId: user.id }, orderBy: { startedAt: 'desc' }, take: 20
  })
  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  const user = await prisma.user.findUnique({ where: { email: devEmail() } })
  if (!user) return NextResponse.json({ error: 'seed needed' }, { status: 404 })

  const b = await req.json()
  const created = await prisma.studySession.create({
    data: {
      userId: user.id,
      mode: b.mode,
      subject: b.subject,
      topic: b.topic ?? null,
      startedAt: new Date(b.startedAt),
      endedAt: b.endedAt ? new Date(b.endedAt) : null,
      minutes: Number(b.minutes || 0),
      mood: b.mood ? Number(b.mood) : null,
      notes: b.notes ?? null,
    },
  })
  return NextResponse.json(created, { status: 201 })
}
