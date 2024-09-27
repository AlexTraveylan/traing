"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Emargement, Evaluation, Prerequis, User } from "@prisma/client"
import { useEffect, useState } from "react"

const AdminPage = () => {
  const [prerequis, setPrerequisData] = useState<Prerequis[]>([])
  const [evaluations, setEvaluationsData] = useState<Evaluation[]>([])
  const [signatures, setSignaturesData] = useState<Emargement[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const prerequisResponse = await fetch("/api/prerequis")
      const prerequisData = await prerequisResponse.json()
      setPrerequisData(prerequisData.answers)

      const evaluationsResponse = await fetch("/api/evaluation")
      const evaluationsData = await evaluationsResponse.json()
      setEvaluationsData(evaluationsData)

      const signaturesResponse = await fetch("/api/emargement")
      const signaturesData = await signaturesResponse.json()
      setSignaturesData(signaturesData.emargements)

      const usersResponse = await fetch("/api/auth/users")
      const usersData = await usersResponse.json()
      setUsers(usersData.users)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Tableau de bord administrateur
      </h1>

      <Tabs defaultValue="prerequis">
        <TabsList className="mb-4">
          <TabsTrigger value="prerequis">Prérequis</TabsTrigger>
          <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
          <TabsTrigger value="emargements">Émargements</TabsTrigger>
        </TabsList>

        <TabsContent value="prerequis">
          <Card>
            <CardHeader>
              <CardTitle>Prérequis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Présentation</TableHead>
                    <TableHead>Structures de données</TableHead>
                    <TableHead>Boucles et itérations</TableHead>
                    <TableHead>Mathématiques</TableHead>
                    <TableHead>NumPy</TableHead>
                    <TableHead>Matériel</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const userPrereq =
                      prerequis.find((p) => p.userId === user.id) ||
                      ({} as Prerequis)
                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{userPrereq.presentation}</TableCell>
                        <TableCell>{userPrereq.structuresDonnees}</TableCell>
                        <TableCell>{userPrereq.bouclesIterations}</TableCell>
                        <TableCell>{userPrereq.mathematiques}</TableCell>
                        <TableCell>{userPrereq.numpy}</TableCell>
                        <TableCell>{userPrereq.materiel}</TableCell>
                        <TableCell>
                          {userPrereq.createdAt
                            ? new Date(userPrereq.createdAt).toLocaleString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations">
          <Card>
            <CardHeader>
              <CardTitle>Évaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Compréhension</TableHead>
                    <TableHead>Difficultés</TableHead>
                    <TableHead>Commentaires</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const userEval =
                      evaluations.find((e) => e.userId === user.id) ||
                      ({} as Evaluation)
                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{userEval.comprehension}</TableCell>
                        <TableCell>{userEval.difficultes}</TableCell>
                        <TableCell>{userEval.commentaires || "-"}</TableCell>
                        <TableCell>
                          {userEval.createdAt
                            ? new Date(userEval.createdAt).toLocaleString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emargements">
          <Card>
            <CardHeader>
              <CardTitle>Émargements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Heure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signatures.map((signature, index) => {
                    const user = users.find((u) => u.id === signature.userId)
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {user ? user.username : "Inconnu"}
                        </TableCell>
                        <TableCell>
                          {new Date(signature.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(signature.date).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage
