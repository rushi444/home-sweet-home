import { PrismaClient } from '@prisma/client'

export type Context = {
  prisma: PrismaClient
}

export const prisma = new PrismaClient()

export const createContext = (): Context => {
  return {
    prisma
  }
}
