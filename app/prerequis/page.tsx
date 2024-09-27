"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect, useState } from "react"

interface PrerequisAnswers {
  presentation: string
  structuresDonnees: string
  bouclesIterations: string
  mathematiques: string
  numpy: string
  materiel: string
  dateSubmission: string
}

export default function Prerequis() {
  const [answers, setAnswers] = useState<PrerequisAnswers | null>(null)
  const { user } = useAuthStore()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (user) {
        const response = await fetch(`/api/prerequis/${user.id}`)
        const data = await response.json()
        setHasSubmitted(data.hasSubmitted)
        if (data.hasSubmitted) {
          setAnswers(data.answers)
        }
        setIsLoading(false)
      }
    }
    checkSubmissionStatus()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user && answers) {
      const response = await fetch("/api/prerequis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, answers }),
      })
      if (response.ok) {
        alert("Réponses enregistrées !")
        setHasSubmitted(true)
      } else {
        alert("Une erreur est survenue lors de l'enregistrement des réponses.")
      }
    }
  }

  if (hasSubmitted && answers) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Questionnaire de prérequis</h1>
        <p className="mb-4">
          Vous avez déjà rempli le questionnaire. Merci pour votre participation
          !
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Récapitulatif de vos réponses :
        </h2>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Présentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.presentation}</p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Maîtrise des Structures de données en Python</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.structuresDonnees}</p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Maîtrise des Boucles et itérations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.bouclesIterations}</p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Maîtrise des Notions de base en mathématiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.mathematiques}</p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Maîtrise de NumPy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.numpy}</p>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Matériel requis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answers.materiel}</p>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Date de soumission :{" "}
          {new Date(answers.dateSubmission).toLocaleString()}
        </p>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Questionnaire de prérequis</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Présentation</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Faites une présentation rapide de vous-même"
                value={answers?.presentation || ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev!,
                    presentation: e.target.value,
                  }))
                }
                className="w-full"
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                1. Maîtrise des Structures de données en Python
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers?.structuresDonnees || ""}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev!, structuresDonnees: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debutant" id="sd-debutant" />
                  <Label htmlFor="sd-debutant">Débutant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediaire" id="sd-intermediaire" />
                  <Label htmlFor="sd-intermediaire">Intermédiaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="avance" id="sd-avance" />
                  <Label htmlFor="sd-avance">Avancé</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Maîtrise des Boucles et itérations</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers?.bouclesIterations || ""}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev!, bouclesIterations: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debutant" id="bi-debutant" />
                  <Label htmlFor="bi-debutant">Débutant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediaire" id="bi-intermediaire" />
                  <Label htmlFor="bi-intermediaire">Intermédiaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="avance" id="bi-avance" />
                  <Label htmlFor="bi-avance">Avancé</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                3. Maîtrise des Notions de base en mathématiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers?.mathematiques || ""}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev!, mathematiques: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debutant" id="math-debutant" />
                  <Label htmlFor="math-debutant">Débutant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="intermediaire"
                    id="math-intermediaire"
                  />
                  <Label htmlFor="math-intermediaire">Intermédiaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="avance" id="math-avance" />
                  <Label htmlFor="math-avance">Avancé</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maîtrise de NumPy</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers?.numpy || ""}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev!, numpy: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="numpy-oui" />
                  <Label htmlFor="numpy-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="numpy-non" />
                  <Label htmlFor="numpy-non">Non</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matériel requis</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers?.materiel || ""}
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev!, materiel: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="materiel-oui" />
                  <Label htmlFor="materiel-oui">
                    J'ai un PC avec Git, VSCode et Python installés
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="materiel-non" />
                  <Label htmlFor="materiel-non">
                    Je n'ai pas tout le matériel requis
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <CardFooter>
            <Button type="submit" className="w-full">
              Soumettre
            </Button>
          </CardFooter>
        </form>
      </div>
    </ProtectedRoute>
  )
}
