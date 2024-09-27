"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store/authStore"
import { useCallback, useEffect, useState } from "react"

export default function Emargement() {
  const { user } = useAuthStore()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aEmarger, setAEmarger] = useState(false)
  const [infoEmargement, setInfoEmargement] = useState<{
    date: string
    heure: string
  } | null>(null)

  const verifierStatutEmargement = useCallback(async () => {
    try {
      const reponse = await fetch(`/api/emargement/status/${user?.id}`)
      const donnees = await reponse.json()
      if (donnees.aEmarger) {
        setAEmarger(true)
        setInfoEmargement(donnees.infoEmargement)
      }
    } catch (erreur) {
      console.error(
        "Erreur lors de la vérification du statut d'émargement:",
        erreur
      )
    }
  }, [user?.id])

  useEffect(() => {
    if (user) {
      verifierStatutEmargement()
    }
  }, [user, verifierStatutEmargement])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const reponse = await fetch("/api/emargement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      })
      const resultat = await reponse.json()
      if (resultat.success) {
        setMessage("Émargement enregistré avec succès !")
        setAEmarger(true)
        await verifierStatutEmargement()
      } else {
        setMessage(resultat.message)
      }
    } catch (erreur) {
      console.error("Erreur lors de l'émargement:", erreur)
      setMessage("Une erreur s'est produite lors de l'émargement.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <Card className="w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle>{"Émargement quotidien"}</CardTitle>
        </CardHeader>
        <CardContent>
          {aEmarger ? (
            <Alert>
              <AlertTitle>{"Vous avez déjà émargé aujourd'hui"}</AlertTitle>
              <AlertDescription>
                Date : {infoEmargement?.date}
                <br />
                Heure : {infoEmargement?.heure}
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Button type="submit" disabled={isLoading || aEmarger}>
                {isLoading ? "Chargement..." : "Émarger"}
              </Button>
            </form>
          )}
          {message && <p className="mt-4 text-sm">{message}</p>}
        </CardContent>
      </Card>
    </ProtectedRoute>
  )
}
