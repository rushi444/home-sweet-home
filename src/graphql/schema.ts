import { buildSchemaSync, Resolver, Query } from 'type-graphql'
import { authChecker } from 'src/lib/auth/authChecker'
import { ImageResolver } from './Image'

@Resolver()
class DummyResolver {
  @Query(_returns => String)
  hello() {
    return 'Nice to meet you!'
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, ImageResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker
})
