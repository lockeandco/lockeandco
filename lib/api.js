import {API, graphqlOperation} from 'aws-amplify'
import {createMessage} from '../src/graphql/mutations'
import {listLocationsByCity} from '../src/graphql/queries'

export const sendMessage = async parameters =>
	await API.graphql(graphqlOperation(createMessage, parameters))

export const getLocations = async parameters =>
	await API.graphql(graphqlOperation(listLocationsByCity))
