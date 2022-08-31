import type { NextApiRequest, NextApiResponse } from 'next'
import {ApolloServer} from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "../../graphql/typedefs"
import resolvers from "../../graphql/resolvers"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins : [ApolloServerPluginLandingPageGraphQLPlayground]
})
const startServer = server.start()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await server.createHandler({
    path:"/api/graphql"
  })(req,res)

}

export const config = {
  api :{
     bodyParser: false
  }
}
