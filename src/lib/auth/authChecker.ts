import { AuthChecker } from 'type-graphql'
import { Context } from 'src/graphql/context'

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const { uid } = context
  return !!uid
}
