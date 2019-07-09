import { API, graphqlOperation } from 'aws-amplify'
import { createMessage } from '../src/graphql/mutations'

export const sendMessage = async params =>
  await API.graphql(graphqlOperation(createMessage, params))
