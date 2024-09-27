"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { EvaluationRecord, evaluationSchema } from "@/lib/evaluation"
import { useAuthStore } from "@/lib/store/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export default function Evaluation() {
  const [rating, setRating] = useState(0)
  const { user } = useAuthStore()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [previousSubmission, setPreviousSubmission] =
    useState<EvaluationRecord | null>(null)

  const form = useForm<z.infer<typeof evaluationSchema>>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      comprehension: 0,
      difficultes: "",
      commentaires: "",
    },
  })

  useEffect(() => {
    if (user?.id) {
      checkPreviousSubmission()
    }
  }, [user])

  async function checkPreviousSubmission() {
    const response = await fetch(`/api/evaluation/${user?.id}`)
    const data = await response.json()

    if (data.exists) {
      setHasSubmitted(true)
      setPreviousSubmission(data)
    }
  }

  async function onSubmit(values: z.infer<typeof evaluationSchema>) {
    const response = await fetch("/api/evaluation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id, ...values }),
    })

    if (!response.ok) {
      console.log("Erreur lors de la soumission de l'évaluation")
      return
    }

    console.log("Évaluation soumise avec succès")
    form.reset()
    setRating(0)
    setHasSubmitted(true)
    checkPreviousSubmission()
  }

  if (hasSubmitted && previousSubmission) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Évaluation déjà soumise</h1>
          <p>
            Vous avez déjà soumis une évaluation le{" "}
            {new Date(previousSubmission.date).toLocaleString()}.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Récapitulatif de vos réponses :
          </h2>
          <ul>
            <li>
              Niveau de compréhension : {previousSubmission.comprehension}/5
            </li>
            <li>Difficultés rencontrées : {previousSubmission.difficultes}</li>
            <li>Commentaires : {previousSubmission.commentaires || "Aucun"}</li>
          </ul>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Évaluation quotidienne</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="comprehension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de compréhension (1-5) :</FormLabel>
                  <FormControl>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => {
                            setRating(star)
                            field.onChange(star)
                          }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Cliquez sur les étoiles pour évaluer votre niveau de
                    compréhension
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficultes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficultés rencontrées :</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commentaires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaires supplémentaires :</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optionnel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Soumettre l'évaluation</Button>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  )
}
