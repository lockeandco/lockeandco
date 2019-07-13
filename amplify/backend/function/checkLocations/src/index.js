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
var functionMessagefromwebformName = process.env.FUNCTION_MESSAGEFROMWEBFORM_NAME
var functionGetLocationsName = process.env.FUNCTION_GETLOCATIONS_NAME
var functionUpdateLocationsName = process.env.FUNCTION_UPDATELOCATIONS_NAME
var functionGetLastCheckName = process.env.FUNCTION_GETLASTCHECK_NAME

Amplify Params - DO NOT EDIT */'use strict'
const AWS = require('aws-sdk')
const gql = require('graphql-tag')
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE
const AWSAppSyncClient = require('aws-appsync').default
const type = AUTH_TYPE.AWS_IAM
const fromEntries = require('object.fromentries')
const {
  over,
  lensProp,
  map,
  compose,
  isEmpty,
  omit,
  tap,
  tryCatch,
  set,
} = require('ramda')
require('es6-promise').polyfill()
require('isomorphic-fetch')
const R = require('ramda')
const {
  isTruthy,
  spreadPath,
  isNilOrEmpty,
  renameKeys,
} = require('ramda-adjunct')
const unfetch = require('isomorphic-unfetch')
const parser = require('fast-xml-parser')
const he = require('he')
const { format } = require('date-fns')

const xmlOptions = {
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: false,
  parseAttributeValue: true,
  trimValues: true,
  attributeNamePrefix: '',
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),
  tagValueProcessor: a => he.decode(a),
}
// PreAuth Payload Example
// {
//     "version": "1",
//     "region": "us-east-2",
//     "userPoolId": "us-east-2_Kh4l5WLQR",
//     "userName": "austin.coose@gmail.com",
//     "callerContext": {
//         "awsSdkVersion": "aws-sdk-unknown-unknown",
//         "clientId": "5ss7db51lr2s47duf2eg5mnb6n"
//     },
//     "triggerSource": "PreAuthentication_Authentication",
//     "request": {
//         "userAttributes": {
//             "sub": "34a7ef7a-186d-4620-a54e-f72d91827bb1",
//             "cognito:token_nbf": "1548271951941",
//             "email_verified": "true",
//             "custom:partnerName": "360 FEDERAL CREDIT UNION",
//             "cognito:user_status": "CONFIRMED",
//             "custom:clientId": "Client Name",
//             "cognito:mfa_enabled": "false",
//             "phone_number_verified": "true",
//             "phone_number": "+17277353956",
//             "given_name": "Austin",
//             "family_name": "Coose",
//             "email": "austin.coose@gmail.com",
//             "custom:partnerId": "79440"
//         },
//         "validationData": {}
//     },
//     "response": {}
// }

// const tObj = xmlData => parser.getTraversalObj(xmlData, xmlOptions)
// const jsonObj = xmlData => parser.parse(xmlData, xmlOptions)

// format(Date.now(), 'YYYYMMDDHHMM')

// const lastCheck = format(Date.now(), 'YYYYMMDDHHMM')
// const highrise = `https://lockecodistilling.highrisehq.com/companies.xml?since=${lastCheck}&criteria[carry_us]=YES`

// const url = address =>
//   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

// const writeToFile = x =>
//   fs.writeFileSync('./jsonObj4.json', JSON.stringify(x, null, 2))

// const getAddressComponentValue = nameType => typeName => a => {
//   const suffix = R.compose(
//     R.head,
//     R.filter(x => x.types && x.types.includes(typeName))
//   )(a)
//   return suffix ? suffix[nameType] : ''
// }

// const ws = fs.createWriteStream('./jsonObj5.json')
// ws.write('[')

// const createItems = R.compose(
//   R.head,
//   R.chain(x => {
//     const attrs = R.mergeAll(x)
//     return Object.assign(
//       {},
//       {
//         formatted_address: R.compose(R.path(['formatted_address']))(attrs),
//       },
//       {
//         location: R.compose(R.path(['geometry', 'location']))(attrs),
//       },
//       {
//         city: R.compose(
//           getAddressComponentValue('long_name')('locality'),
//           R.path(['address_components'])
//         )(attrs),
//       },
//       {
//         place_id: R.compose(R.path(['place_id']))(attrs),
//       }
//     )
//   }),
//   R.path(['results'])
// )
// function getAddressComponents(list) {
//   console.log(list.length)
//   if (isNilOrEmpty(list)) {
//     ws.write(']')
//     ws.close()
//   } else {
//     const location = R.head(list)
//     const address = R.path(['address'], location)
//     unfetch(url(address))
//       .then(l => l.json())
//       .then(f => {
//         console.log('GMAPS RETURN', JSON.stringify(f, null, 2))
//         ws.write(
//           JSON.stringify(Object.assign({}, location, { ...createItems(f) })),
//           null,
//           2
//         )
//         list.length > 1 && ws.write(',')
//         getAddressComponents(R.tail(list))
//       })
//       .catch(console.log)
//   }
// }

// unfetch(highrise, {
//   headers: {
//     Authorization: 'Basic MDg3ZWI3NmI5ZGZlODMzOTNmMmE1YTA0Y2Y1NDA1YmI6WA==',
//   },
//   credentials: 'include',
// })
//   .then(x => x.text())
//   .then(
//     R.compose(
//       R.map(
//         R.compose(
//           R.over(R.lensProp('address'), x =>
//             R.compose(
//               R.join('+'),
//               R.split(' '),
//               R.replace('#', '')
//             )(`${x.street}+${x.city}+${x.state}+${x.zip}`)
//           ),
//           R.over(R.lensProp('site'), R.path(['url'])),
//           renameKeys({ addresses: 'address', 'web-address': 'site' }),
//           spreadPath(['addresses']),
//           spreadPath(['web-addresses']),
//           R.reject(isNilOrEmpty),
//           spreadPath(['contact-data']),
//           R.over(
//             R.lensProp('contact-data'),
//             R.pick(['web-addresses', 'addresses'])
//           )
//         )
//       ),
//       R.map(R.pick(['name', 'contact-data'])),
//       R.path(['companies', 'company']),
//       jsonObj
//     )
//   )
//   .then(getAddressComponents)
//   .catch(console.log)
// const camelCaseGroup = x =>
//   Object.assign(
//     {},
//     {
//       groupName: x.GroupName,
//       userPoolId: x.UserPoolId,
//       description: x.Description,
//       lastModifiedDate: x.LastModifiedDate,
//       creationDate: x.CreationDate,
//       roleArn: x.RoleArn,
//       precedence: x.Precedence,
//     }
//   )

// const camelCaseUser = x =>
//   Object.assign(
//     {},
//     {
//       itemId: `user|${x.sub}`,
//       itemTypeTarget: `user|${process.env.userPoolId}`,
//       userPoolId: process.env.userPoolId,
//       phoneVerified: x.phone_number_verified,
//       emailVerified: x.email_verified,
//       partnerID: x['custom:partnerId'] || 'none',
//       creationDate: x.UserCreateDate,
//       lastModifiedDate: x.UserLastModifiedDate,
//       enabled: x.Enabled,
//       firstName: x.given_name || 'none',
//       lastName: x.family_name || 'none',
//       status: x.UserStatus,
//       partnerName: x['custom:partnerName'] || 'none',
//       phoneNumber: x.phone_number || 'none',
//       username: x.Username,
//       sub: x.sub,
//       email: x.email || 'none@none.none',
//       Groups: x.Groups,
//     },
//     isEmpty(x.mfaEnabled)
//       ? {
//           MFAOptions: {
//             mfaEnabled: x.mfaEnabled || false,
//             preferredMfaSetting: x.PreferredMfaSetting || 'NONE',
//             userMFASettingList: x.UserMFASettingList || ['NONE'],
//           },
//         }
//       : {}
//   )

// const cleanGroups = over(
//   lensProp('Groups'),
//   map(
//     compose(
//       camelCaseGroup,
//       over(lensProp('CreationDate'), tryCatch(x => x.valueOf(), x => 0)),
//       over(lensProp('LastModifiedDate'), tryCatch(x => x.valueOf(), x => 0))
//     )
//   )
// )
// const cleanUser = compose(
//   camelCaseUser,
//   set(lensProp('UserLastModifiedDate'), Date.now()),
//   over(lensProp('UserCreateDate'), tryCatch(x => x.valueOf(), x => 0)),
//   cleanGroups,
//   omit(['UserAttributes'])
// )
// const print = (t, x) => console.log(`${t}: ${JSON.stringify(x, null, 2)}`)
// const TableName = 'rdn-title-dev' //Add as ENV VAR

// exports.handler = async event => {
//   print('Payload:', event)

//   const {
//     input: { username, userPoolId, mfa_enabled },
//   } = event

//   AWS.config.update({
//     signatureVersion: 'v4',
//     region: process.env.REGION,
//     credentials: new AWS.Credentials({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       sessionToken: process.env.AWS_SESSION_TOKEN,
//     }),
//   })

//   const cisp = new AWS.CognitoIdentityServiceProvider({
//     apiVersion: '2016-04-18',
//     region: 'us-east-2',
//   })
//   const credentials = AWS.config.credentials

//   const user = await cisp['adminGetUser']({
//     Username: username,
//     UserPoolId: userPoolId,
//   })
//     .promise()
//     .then(u => {
//       const attrs = new Map(u.UserAttributes.map(z => Object.values(z)))
//       return Object.assign(
//         {},
//         omit(['UserAttributes'], u),
//         fromEntries(attrs),
//         { mfaEnabled: mfa_enabled }
//       )
//     })

//   const userGroups = await cisp['adminListGroupsForUser']({
//     Username: user.Username,
//     UserPoolId: userPoolId,
//   })
//     .promise()
//     .then(data => Object.assign({}, user, data))

//   const asCreateUpdateUserInput = cleanUser(userGroups)

//   print('User', asCreateUpdateUserInput)

//   const updateUserMutation = gql`
//     mutation UpdateUser($user: UpdateUserInput!) {
//       updateUser(input: $user) {
//         itemId
//         itemTypeTarget
//         username
//         userPoolId
//         phoneNumber
//         phoneVerified
//         email
//         emailVerified
//         lastName
//         firstName
//         enabled
//         status
//         partnerID
//         partnerName
//         sub
//         lastModifiedDate
//         creationDate
//         MFAOptions {
//           mfaEnabled
//           userMFASettingList
//           preferredMfaSetting
//         }
//         Groups {
//           groupName
//           userPoolId
//           lastModifiedDate
//           creationDate
//           description
//           precedence
//           roleArn
//           Abilities {
//             Rules {
//               actions
//               subjects
//               subject
//               fields
//               inverted
//               conditions
//               reason
//             }
//           }
//         }
//         Abilities {
//           Rules {
//             actions
//             subjects
//             subject
//             fields
//             inverted
//             conditions
//             reason
//           }
//         }
//       }
//     }
//   `

//   // Set up Apollo client
//   const client = new AWSAppSyncClient({
//     url: process.env.ENDPOINT, //Add as ENV VAR
//     region: process.env.REGION,
//     auth: {
//       type: type, //Add as ENV VAR
//       credentials: credentials,
//     },
//     disableOffline: true,
//   })

//   //Add User through Mutation
//   const appSyncRes = await client
//     .mutate({
//       mutation: updateUserMutation,
//       variables: { user: asCreateUpdateUserInput },
//       fetchPolicy: 'no-cache',
//     }) //Uncomment for AWS Lambda
//     .then(data => {
//       print('Success', data)
//       return data
//     })
//     .catch(e => {
//       print('Error', e)
//       return e
//     })

//   return await appSyncRes

// }

exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(`value1 = ${event.key1}`)
  console.log(`value2 = ${event.key2}`)
  console.log(`value3 = ${event.key3}`)
  context.done(null, 'Hello World') // SUCCESS with message
}
