import { API, graphqlOperation } from 'aws-amplify'
import { createMessage } from '../src/graphql/mutations'
import { listLocationsByCity } from '../src/graphql/queries'

export const sendMessage = async params =>
  await API.graphql(graphqlOperation(createMessage, params))

export const getLocations = async params =>
  await API.graphql(graphqlOperation(listLocationsByCity))
