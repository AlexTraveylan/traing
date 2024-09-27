import prisma from "./prisma-client"

export async function signerEmargement(userId: number) {
  const aujourdhui = new Date()
  aujourdhui.setHours(0, 0, 0, 0)

  const emargementExistant = await prisma.emargement.findFirst({
    where: {
      userId: userId,
      date: {
        gte: aujourdhui,
        lt: new Date(aujourdhui.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  })

  if (emargementExistant) {
    return { success: false, message: "Vous avez déjà émargé aujourd'hui." }
  }

  await prisma.emargement.create({
    data: {
      userId: userId,
      date: new Date(),
    },
  })

  return { success: true, message: "Émargement enregistré avec succès." }
}

export async function obtenirTousLesEmargements() {
  return await prisma.emargement.findMany({
    include: { user: true },
  })
}

export async function verifierStatutEmargement(userId: number) {
  const aujourdhui = new Date()
  aujourdhui.setHours(0, 0, 0, 0)

  const emargement = await prisma.emargement.findFirst({
    where: {
      userId: userId,
      date: {
        gte: aujourdhui,
        lt: new Date(aujourdhui.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  })

  if (emargement) {
    return {
      aEmarger: true,
      infoEmargement: {
        date: emargement.date.toISOString().split("T")[0],
        heure: emargement.date.toTimeString().split(" ")[0],
      },
    }
  }

  return { aEmarger: false }
}
