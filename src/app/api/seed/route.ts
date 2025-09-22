import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'   // relatif import

export async function POST() {
  const email = process.env.DEV_USER_EMAIL || 'demo@local'

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Demo User' },
  })

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      track: 'EA',           // 'SAY' | 'EA' | 'SOZ' | 'DIL'
      examYear: 2026,
      weeklyMinutesTarget: 900,
    },
  })

  return NextResponse.json({ ok: true, user, profile })
}

export const GET = POST // dev kolaylığı
