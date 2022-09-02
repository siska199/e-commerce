import type { NextApiRequest, NextApiResponse } from 'next'
import {ApolloServer} from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "../../graphql/typeDefs"
import resolvers from "../../graphql/resolvers"
import dbConnect from '../../lib/dbConnect';

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
  try {    
    await dbConnect()
    await startServer
    await server.createHandler({
      path:"/api/graphql"
    })(req,res)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const config = {
  api :{
     bodyParser: false
  }
}
