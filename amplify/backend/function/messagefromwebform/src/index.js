/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authLockeandco135e34acUserPoolId = process.env.AUTH_LOCKEANDCO135E34AC_USERPOOLID
var analyticsLockeandcoId = process.env.ANALYTICS_LOCKEANDCO_ID
var analyticsLockeandcoRegion = process.env.ANALYTICS_LOCKEANDCO_REGION
var apiLockeandcoGraphQLAPIIdOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIIDOUTPUT
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authLockeandco135e34acUserPoolId = process.env.AUTH_LOCKEANDCO135E34AC_USERPOOLID
var analyticsLockeandcoId = process.env.ANALYTICS_LOCKEANDCO_ID
var analyticsLockeandcoRegion = process.env.ANALYTICS_LOCKEANDCO_REGION
var apiLockeandcoGraphQLAPIIdOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIIDOUTPUT
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const { path, pick } = require('ramda')

const SNS = new AWS.SNS({
  region: 'us-east-1',
})

exports.handler = async function (event, context ) { //eslint-disable-line

  const date = new Date(Date.now()).toString()
  const inputs = path(['arguments', 'input'])(event)
  const message = pick(['Name', 'Email', 'Type', 'Body'])(inputs)
  const params = {
    Message: JSON.stringify(message, null, 2),
    Subject: `Message from Website Received: ${date}`,
    TopicArn: 'arn:aws:sns:us-east-1:840164070895:LockeCoWebForm',
  }
  console.log(JSON.stringify(event, null, 2))
  console.log(JSON.stringify(inputs, null, 2))

  const g = await SNS.publish(params)
    .promise()
    .then(x => x)
    .catch(x => x)

  console.log(g)

  return inputs
}
