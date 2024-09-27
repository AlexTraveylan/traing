export interface Signature {
  userId: number
  date: string
  time: string
}

interface AttendanceRecord {
  [date: string]: Signature[]
}

export const defaultSignatureAnswers: Signature = {
  userId: 0,
  date: "-",
  time: "-",
}

const attendanceRecords: AttendanceRecord = {}

export async function signAttendance(userId: number) {
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const time = now.toTimeString().split(" ")[0]

  if (!attendanceRecords[today]) {
    attendanceRecords[today] = []
  }

  if (
    attendanceRecords[today].some((signature) => signature.userId === userId)
  ) {
    return { success: false, message: "Vous avez déjà émargé aujourd'hui." }
  }

  attendanceRecords[today].push({ userId, date: today, time })

  return { success: true, message: "Émargement enregistré avec succès." }
}

export function getAllSignatures(): Signature[] {
  return Object.values(attendanceRecords).flat()
}

export async function checkSignatureStatus(userId: number) {
  const today = new Date().toISOString().split("T")[0]
  const signature = attendanceRecords[today]?.find((s) => s.userId === userId)

  if (signature) {
    return {
      hasSigned: true,
      signatureInfo: {
        date: signature.date,
        time: signature.time,
      },
    }
  }

  return { hasSigned: false }
}
