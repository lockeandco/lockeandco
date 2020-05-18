/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const R = require('ramda')

const ddb = new AWS.DynamoDB.DocumentClient()

const formattedCities = R.compose(
	R.uniqBy(R.compose(R.toLower, R.path(['city']))),
	R.path(['Items']),
	R.tap(console.log)
)

const byCity = R.groupBy(R.path(['city']))

const createList = cities =>
	R.compose(
		R.values,
		R.mapObjIndexed((v, k, o) => {
			const ct = cities.filter(c => R.toLower(c.city) === R.toLower(k))
			return ct.length === 1 ? Object.assign({}, v, ct[0]) : v
		}),
		R.map(x => {
			return Object.assign(
				{},
				{
					list: x,
				},
				{
					total: x.length,
				}
			)
		}),
		byCity,
		R.path(['Items']),
		R.tap(console.log)
	)
const LocationParameters = {
	TableName: 'lockeandco-production', // Process.env.STORAGE_LOCKEANDCO_NAME,
	IndexName: 'itemTypeTarget-itemId-index',
	KeyConditionExpression: 'itemTypeTarget = :location',
	FilterExpression: 'carry = :true',
	ExpressionAttributeValues: {
		':location': 'Location',
		':true': true,
	},
}
const CityParameters = {
	TableName: process.env.STORAGE_LOCKEANDCO_NAME,
	IndexName: 'itemTypeTarget-itemId-index',
	KeyConditionExpression: 'itemTypeTarget = :city',
	ExpressionAttributeValues: {
		':city': 'City',
	},
}

exports.handler = async function(event, context) {
	return await ddb
		.query(CityParameters)
		.promise()
		.then(formattedCities)
		.then(
			async cities =>
				await ddb
					.query(LocationParameters)
					.promise()
					.then(R.compose(R.tap(console.log), createList(cities)))
					.catch(R.tap(console.log))
		)
}
