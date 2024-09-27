"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect, useState } from "react"

export default function Emargement() {
  const { user } = useAuthStore()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasSigned, setHasSigned] = useState(false)
  const [signatureInfo, setSignatureInfo] = useState<{
    date: string
    time: string
  } | null>(null)

  useEffect(() => {
    if (user) {
      checkSignatureStatus()
    }
  }, [user])

  const checkSignatureStatus = async () => {
    try {
      const response = await fetch(`/api/emargement/status?userId=${user?.id}`)
      const data = await response.json()
      if (data.hasSigned) {
        setHasSigned(true)
        setSignatureInfo(data.signatureInfo)
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du statut de signature:",
        error
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/emargement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      })
      const result = await response.json()
      if (result.success) {
        setMessage("Émargement enregistré avec succès !")
        setHasSigned(true)
        await checkSignatureStatus()
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage("Une erreur s'est produite lors de l'émargement.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <Card className="w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle>Émargement quotidien</CardTitle>
        </CardHeader>
        <CardContent>
          {hasSigned ? (
            <Alert>
              <AlertTitle>Vous avez déjà émargé aujourd'hui</AlertTitle>
              <AlertDescription>
                Date : {signatureInfo?.date}
                <br />
                Heure : {signatureInfo?.time}
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Button type="submit" disabled={isLoading || hasSigned}>
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
