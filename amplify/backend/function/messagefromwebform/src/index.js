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

// {
//     "typeName": "Mutation",
//     "fieldName": "createMessage",
//     "arguments": {
//         "input": {
//             "itemId": "1",
//             "itemTypeTarget": "Message",
//             "Name": "Austin Coose",
//             "Email": "austin.coose@gmail.com",
//             "Type": "Casual Whiskey Drinker",
//             "Body": "ksjsdjs"
//         }
//     },
//     "identity": null,
//     "source": null,
//     "request": {
//         "headers": {
//             "x-forwarded-for": "174.29.202.93, 64.252.130.97",
//             "accept-encoding": "gzip, deflate, br",
//             "referer": "http://localhost:3000/contact-us",
//             "cloudfront-viewer-country": "US",
//             "cloudfront-is-tablet-viewer": "false",
//             "via": "2.0 c9bc51c60922bd251aad1b28f0896cce.cloudfront.net (CloudFront)",
//             "content-type": "application/json; charset=UTF-8",
//             "x-api-key": "da2-hj5fpxjnd5ckfkluho5b27ralu",
//             "origin": "http://localhost:3000",
//             "cloudfront-forwarded-proto": "https",
//             "x-amzn-trace-id": "Root=1-5d225882-d22049b811c2853ef41eaa96",
//             "x-amz-cf-id": "lrRgx-pW8kfxzqAHlKZxEf_1gLtU5TCSiXOcpfccEnyf54a0cho3Jg==",
//             "content-length": "350",
//             "accept-language": "en-US,en;q=0.9",
//             "x-forwarded-proto": "https",
//             "host": "wxbfm6btzfejtld36nuf335j3i.appsync-api.us-west-2.amazonaws.com",
//             "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
//             "cloudfront-is-desktop-viewer": "true",
//             "accept": "application/json, text/plain, */*",
//             "cloudfront-is-mobile-viewer": "false",
//             "x-forwarded-port": "443",
//             "cloudfront-is-smarttv-viewer": "false"
//         }
//     },
//     "prev": {
//         "result": {}
//     }
// }
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
