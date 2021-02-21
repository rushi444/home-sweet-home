import { NextApiRequest } from 'next'

import { PrismaClient, prisma } from 'src/lib/prisma'
import { loadIdToken } from 'src/lib/auth/firebaseAdmin'

export type Context = {
  uid: string | null
  prisma: PrismaClient
}

export type AuthorizedContext = {
  uid: string
  prisma: PrismaClient
}

type RequestType = {
  req: NextApiRequest
}

export const createContext = async ({ req }: RequestType): Promise<Context> => {
  const uid = await loadIdToken(req)
  return {
    uid,
    prisma
  }
}
