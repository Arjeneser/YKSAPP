// src/app/profile/page.tsx
import ProfileForm from './_components/ProfileForm'
import { prisma } from '../../lib/db'   // profile -> app -> (src) -> lib

export default async function ProfilePage() {
  const email = process.env.DEV_USER_EMAIL ?? 'demo@local'
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return (        
      <div className="p-8">
        <p>
          Önce <code>/api/seed</code> çağrısı ile demo kullanıcı oluştur.
        </p>
      </div>
    )
  }

  const profile = await prisma.userProfile.findUnique({ where: { userId: user.id } })
  const initial = profile ?? { track: 'EA', examYear: 2026, weeklyMinutesTarget: 900 }

  return <ProfileForm initial={initial as any} />
}
