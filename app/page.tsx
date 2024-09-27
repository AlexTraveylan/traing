"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  ClipboardCheck,
  FileQuestion,
  Star,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { getUserSession } from "../lib/auth"
import { useAuthStore } from "../lib/store/authStore"

export default function Home() {
  const { setUser, user } = useAuthStore()

  useEffect(() => {
    const fetchUser = async () => {
      const sessionUser = await getUserSession()
      if (sessionUser) {
        setUser(sessionUser)
      }
    }
    fetchUser()
  }, [setUser])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Gestion de Formation</h1>
      <p className="text-xl mb-8 text-gray-600">
        Bienvenue sur notre plateforme de suivi de formation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardCheck className="mr-2" />
              Émargement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Signez votre présence quotidienne à la formation.
            </CardDescription>
            <Button asChild className="mt-4">
              <Link href="/emargement">Émarger</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileQuestion className="mr-2" />
              Questionnaire de Prérequis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Répondez au questionnaire de prérequis en début de formation.
            </CardDescription>
            <Button asChild className="mt-4">
              <Link href="/prerequis">Questionnaire</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2" />
              Évaluation Journalière
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Évaluez la formation à la fin de chaque journée.
            </CardDescription>
            <Button asChild className="mt-4">
              <Link href="/evaluation">Évaluer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center space-x-4">
        {!user && (
          <Button asChild size="lg">
            <Link href="/login">
              Se connecter
              <UserCheck className="ml-2" />
            </Link>
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <Link href="/admin">
            Accès Admin
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
