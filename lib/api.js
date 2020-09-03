import {API, graphqlOperation} from 'aws-amplify'
import {createMessage} from '../src/graphql/mutations'
import {listLocationsByCity} from '../src/graphql/queries'

export const sendMessage = async parameters =>
	API.graphql(graphqlOperation(createMessage, parameters))

export const getLocations = async parameters =>
	API.graphql(graphqlOperation(listLocationsByCity))
