"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { logout } from "../lib/auth"
import { useAuthStore } from "../lib/store/authStore"

export default function Header() {
  const { user, setUser } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const NavLinks = () => (
    <>
      <Link href="/prerequis" className="text-gray-600 hover:text-primary">
        Prérequis
      </Link>
      <Link href="/emargement" className="text-gray-600 hover:text-primary">
        Émargement
      </Link>
      <Link href="/evaluation" className="text-gray-600 hover:text-primary">
        Évaluation
      </Link>
    </>
  )

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar ?? undefined}
              alt={user?.username ?? undefined}
            />
            <AvatarFallback>{user?.username?.[0] ?? ""}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Paramètres</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
          {user ? (
            <UserMenu />
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Se connecter</Link>
            </Button>
          )}
        </nav>
        <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <NavLinks />
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-primary"
                >
                  Profil
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-600 hover:text-primary"
                >
                  Paramètres
                </Link>
                <Button onClick={handleLogout} variant="destructive">
                  Se déconnecter
                </Button>
              </>
            ) : (
              <Button asChild variant="default">
                <Link href="/login">Se connecter</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
