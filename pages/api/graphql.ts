import { ApolloServer } from 'apollo-server-lambda'

import { schema } from '../../graphql/schema'
import { createContext } from '../../graphql/context'

const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    ...createContext()
  }),
  introspection: true
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
