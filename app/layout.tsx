"use client"

import { useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { getUserSession } from "../lib/auth"
import { useAuthStore } from "../lib/store/authStore"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setUser } = useAuthStore()

  const fetchUser = async () => {
    const user = await getUserSession()
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [setUser])

  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
