'use client'

import { ChatWindow } from '@/components/chat'

export default function DashboardPage() {
  return (
    <div className="mx-auto h-[calc(100vh-80px)] max-w-5xl p-2 md:p-6">
      <ChatWindow />
    </div>
  )
}
