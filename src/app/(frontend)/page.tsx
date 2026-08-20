import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-8 overflow-hidden p-8 sm:p-11">
      {!user && <Image src="/tulas-logo.png" alt="Tulas logo" width={400} height={500} priority />}
      <Link
        href={payloadConfig.routes.admin}
        className="rounded-md border border-black bg-black px-4 py-2 text-white transition-opacity hover:opacity-80"
      >
        Login
      </Link>
    </div>
  )
}
