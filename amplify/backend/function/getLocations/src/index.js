/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authLockeandco135e34acUserPoolId = process.env.AUTH_LOCKEANDCO135E34AC_USERPOOLID
var analyticsLockeandcoId = process.env.ANALYTICS_LOCKEANDCO_ID
var analyticsLockeandcoRegion = process.env.ANALYTICS_LOCKEANDCO_REGION
var apiLockeandcoGraphQLAPIIdOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIIDOUTPUT
var apiLockeandcoGraphQLAPIEndpointOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIENDPOINTOUTPUT
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN
var functionUpdateLocationsName = process.env.FUNCTION_UPDATELOCATIONS_NAME

Amplify Params - DO NOT EDIT */exports.handler = function (event, context) { //eslint-disable-line
  console.log(`value1 = ${event.key1}`);
  console.log(`value2 = ${event.key2}`);
  console.log(`value3 = ${event.key3}`);
  context.done(null, 'Hello World'); // SUCCESS with message
};
