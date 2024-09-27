"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { setUserSession } from "@/lib/auth"
import { useAuthStore } from "@/lib/store/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      setError("Email ou mot de passe incorrect")
      return
    }

    const data = await response.json()

    console.log(data)

    if (data.error) {
      setError(data.error)
      return
    }

    await setUserSession(data.user)
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{"Connexion"}</CardTitle>
        <CardDescription>{"Connectez-vous à votre compte"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Username"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Mot de passe"}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Votre mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{"Se connecter"}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {error && <p className="text-red-500">{error}</p>}
      </CardFooter>
    </Card>
  )
}
