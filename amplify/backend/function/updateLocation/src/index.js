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
const args = R.path(['arguments', 'input'])
const setUpdateExpression = R.compose(
  R.concat('set'),
  R.converge(
    R.compose(
      R.join(','),
      R.zipWith((x, y) => `${x} = ${y}`)
    ),
    [R.map(R.concat('#')), R.map(R.concat(':'))]
  ),
  R.keys,
  R.omit(['itemId', 'itemTypeTarget'])
)

const setExpressionAttributeNames = R.compose(
  R.converge(R.zipObj, [R.map(R.concat('#')), R.identity]),
  R.keys,
  R.omit(['itemId', 'itemTypeTarget'])
)

const setKey = R.pick(['itemId', 'itemTypeTarget'])

const setExpressionAttributeValues = R.compose(
  renameKeysWith(R.concat(':')),
  R.omit(['itemId', 'itemTypeTarget'])
)

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
  R.tap(console.log),
  updateParams
)
exports.handler = async function(event, context) {
  console.log(JSON.stringify(event, null, 2))
  const item = args(event)
  console.log(JSON.stringify(item, null, 2))
  const result = await processItem(item)
  console.log(result)
  return item
}
