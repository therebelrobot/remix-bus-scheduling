import {ApolloServer} from 'apollo-server-micro'

import {db} from '__/data/db'
import {resolvers} from '__/resolvers'
import typeDefs from '__/schema.graphql'

const ENDPOINT = '/api/data'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {db},
  playground: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export const dataEndpoint = apolloServer.createHandler({path: ENDPOINT})
