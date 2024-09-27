import { User } from "@prisma/client"
import bcryptjs from "bcryptjs"
import prisma from "./prisma-client"
import { useAuthStore } from "./store/authStore"

// Fonction pour hacher le mot de passe
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10)
}

// Fonction pour vérifier le mot de passe
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword)
}

// Fonction d'authentification
export async function authenticateUser(
  username: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return user
}

// Fonction pour définir la session utilisateur
export async function setUserSession(user: User) {
  localStorage.setItem("user", JSON.stringify(user))
  useAuthStore.getState().setUser(user)
}

// Fonction pour obtenir la session utilisateur
export async function getUserSession(): Promise<User | null> {
  const token = localStorage.getItem("user")

  if (!token) return null

  return JSON.parse(token)
}

// Fonction pour effacer la session utilisateur
export function clearUserSession() {
  localStorage.removeItem("user")
}

// Fonction de déconnexion
export const logout = () => {
  clearUserSession()
}

// Fonction pour créer un nouvel utilisateur
export async function createUser(
  username: string,
  password: string,
  avatar?: string
): Promise<User> {
  const hashedPassword = await hashPassword(password)
  return prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      avatar,
    },
  })
}
