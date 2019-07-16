/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiLockeandcoGraphQLAPIIdOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIIDOUTPUT
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */
const R = require('ramda')
const { renameKeysWith } = require('ramda-adjunct')
const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient()
const args = R.path(['payload', 'arguments'])
const setUpdateExpression = R.compose(
  R.converge(
    R.compose(
      R.join(','),
      R.zipWith((x, y) => `${x} = ${y}`)
    ),
    [R.map(R.concat('#')), R.map(R.concat(':'))]
  ),
  R.keys
)

const setExpressionAttributeNames = R.compose(
  R.converge(R.zipObj, [R.map(R.concat('#')), R.identity]),
  R.keys
)
//To make generic, could use type from resolver
const setKey = item => ({
  itemId: item.placeId,
  itemTypeTarget: `Location|${item.city}`,
})

const setExpressionAttributeValues = renameKeysWith(R.concat(':'))

function updateParams(item) {
  return {
    TableName: process.env.STORAGE_LOCKEANDCO_NAME,
    Key: setKey(item),
    UpdateExpression: setUpdateExpression(item),
    ExpressionAttributeNames: setExpressionAttributeNames(item),
    ExpressionAttributeValues: setExpressionAttributeValues(item),
  }
}
async function updateDDb(params) {
  return await ddb
    .update(params)
    .promise()
    .then(x => x)
    .catch(x => x)
}

const processItem = R.compose(
  updateDDb,
  updateParams
)
exports.handler = async function(event, context) {
  const item = args(event)
  return await processItem(item)
}
