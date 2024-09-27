"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/store/authStore"

export default function ProfilePage() {
  const { user } = useAuthStore()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
        </Avatar>
        <h2>{user?.username}</h2>
      </div>
    </div>
  )
}
