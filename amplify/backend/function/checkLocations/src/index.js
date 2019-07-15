/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiLockeandcoGraphQLAPIIdOutput = process.env.API_LOCKEANDCO_GRAPHQLAPIIDOUTPUT
var storageLockeandcoName = process.env.STORAGE_LOCKEANDCO_NAME
var storageLockeandcoArn = process.env.STORAGE_LOCKEANDCO_ARN

Amplify Params - DO NOT EDIT */
console.log('Initiating function, checking Locations . . .')

const R = require('ramda')
const {
  isTruthy,
  spreadPath,
  isNilOrEmpty,
  renameKeys,
} = require('ramda-adjunct')
const fetch = require('isomorphic-unfetch')
const parser = require('fast-xml-parser')
const he = require('he')
const { format } = require('date-fns')
const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient()

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

const tObj = xmlData => parser.getTraversalObj(xmlData, xmlOptions)
const jsonObj = xmlData => parser.parse(xmlData, xmlOptions)

const lcKey = {
  itemId: 'HighriseCheck',
  itemTypeTarget: 'Latest',
}

const lcParams = {
  TableName: process.env.STORAGE_LOCKEANDCO_NAME,
  Key: lcKey,
}
const url = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

const lcUpdateParams = nlc => ({
  TableName: process.env.STORAGE_LOCKEANDCO_NAME,
  Key: lcKey,
  UpdateExpression: 'set #data = :nlc',
  ExpressionAttributeNames: { '#date': 'Date' },
  ExpressionAttributeValues: {
    ':nlc': nlc,
  },
})
const getAddressComponentValue = nameType => typeName => a => {
  const suffix = R.compose(
    R.head,
    R.filter(x => x.types && x.types.includes(typeName))
  )(a)
  return suffix ? suffix[nameType] : ''
}

const convertXml = R.compose(
  R.map(
    R.compose(
      R.over(R.lensProp('address'), x =>
        R.compose(
          R.join('+'),
          R.split(' '),
          R.replace('#', '')
        )(`${x.street}+${x.city}+${x.state}+${x.zip}`)
      ),
      R.over(R.lensProp('site'), R.path(['url'])),
      renameKeys({ addresses: 'address', 'web-address': 'site' }),
      spreadPath(['addresses']),
      spreadPath(['web-addresses']),
      R.reject(isNilOrEmpty),
      spreadPath(['contact-data']),
      R.over(R.lensProp('contact-data'), R.pick(['web-addresses', 'addresses']))
    )
  ),
  R.map(R.pick(['name', 'contact-data'])),
  R.path(['companies', 'company']),
  jsonObj
)

const createItems = R.compose(
  R.head,
  R.chain(x => {
    const attrs = R.mergeAll(x)
    return Object.assign(
      {},
      {
        formatted_address: R.compose(R.path(['formatted_address']))(attrs),
      },
      {
        location: R.compose(R.path(['geometry', 'location']))(attrs),
      },
      {
        city: R.compose(
          getAddressComponentValue('long_name')('locality'),
          R.path(['address_components'])
        )(attrs),
      },
      {
        place_id: R.compose(R.path(['place_id']))(attrs),
      }
    )
  }),
  R.path(['results'])
)
function publishToSQS(item) {
  const itemParams = {
    MessageBody: item,
    QueueUrl: qUrl,
    DelaySeconds: 0,
  }
  sqs.sendMessage(itemParams, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data) // successful response
  })
}

async function updateDDb(item) {
  return await ddb
    .update(lcUpdateParams(item))
    .promise()
    .then(x => x)
    .catch(x => x)
}
async function getAddressComponents(list, items = []) {
  if (isNilOrEmpty(list)) {
    return await items
  } else {
    const location = R.head(list)
    const address = R.path(['address'], location)
    await unfetch(url(address))
      .then(l => l.json())
      .then(f => {
        const item = Object.assign({}, location, { ...createItem(f) })
        publishToSQS(item)
        getAddressComponents(R.tail(list), append(item, items))
      })
      .catch(console.log)
  }
}

const fetchOptions = {
  headers: {
    Authorization: 'Basic MDg3ZWI3NmI5ZGZlODMzOTNmMmE1YTA0Y2Y1NDA1YmI6WA==',
  },
  credentials: 'include',
}

const highrise = lc =>
  `https://lockecodistilling.highrisehq.com/companies.xml?since=${lc}&criteria[carry_us]=YES`

//Better add to process.Env
const qUrl = `https://sqs.us-west-2.amazonaws.com/840164070895/processLocations`

exports.handler = async function(event, context) {
  const lastCheck = await ddb
    .get(params)
    .promise()
    .then(
      R.compose(
        lc,
        R.path(['Item', 'Date'])
      )
    )
    .catch(x => x)

  console.log(JSON.stringify(event, null, 2))

  const fetchLocations = await fetch(highrise(lastCheck), fetchOptions)
    .then(x => x.text())
    .then(convertXml)
    .then(getAddressComponents)
    .catch(console.log)

  //Better Practice Add to SNS/SQS to trigger Lambda
  const newLastCheck = format(Date.now(), 'YYYYMMDDHHMM')
  if (Array.isArray(fetchLocations) && fetchLocations.length > 1) {
    const updateLastCheck = await updateDDb(newLastCheck)
    context.done(null, `Processed: ${fetchLocation.length} at ${newLastCheck}`)
  } else {
    context.done(null, 'No Items Processed')
  }
}
