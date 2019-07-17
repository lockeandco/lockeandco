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
  UpdateExpression: 'set #date = :nlc',
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
      R.over(
        R.lensProp('address'),
        R.ifElse(
          isTruthy,
          R.compose(
            R.join('+'),
            R.map(
              R.compose(
                R.trim,
                R.replace(' ', '+'),
                R.replace('#', '')
              )
            ),
            R.values,
            R.pick(['street', 'city', 'state', 'zip'])
          ),
          R.identity
        )
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
  R.ifElse(isNilOrEmpty, R.always([]), R.map(R.pick(['name', 'contact-data']))),
  R.path(['companies', 'company']),
  R.tap(
    R.compose(
      console.log,
      R.ifElse(isTruthy, R.identity, R.always('somethinghappened'))
    )
  ),
  jsonObj
)

const createItem = R.compose(
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

const qUrl = `https://sqs.us-west-2.amazonaws.com/840164070895/processLocations`

async function publishToSQS(item) {
  const sqs = new AWS.SQS()

  const itemParams = {
    MessageBody: JSON.stringify(item),
    QueueUrl: qUrl,
    DelaySeconds: 0,
  }
  return await sqs
    .sendMessage(itemParams)
    .promise()
    .then(R.tap(console.log))
    .catch(R.tap(console.log))
}

async function updateDDb(item) {
  return await ddb
    .update(lcUpdateParams(item))
    .promise()
    .then(x => x)
    .catch(x => x)
}

const getAddress = R.compose(
  R.path(['address']),
  R.head
)

let fetchedLocations = []

async function getAddressComponents(list, items = []) {
  if (isNilOrEmpty(list)) {
    console.log('No items to process')
  } else {
    await fetch(url(R.path(['address'], R.head(list))))
      .then(l => l.json())
      .then(async f => {
        const item = Object.assign({}, R.head(list), { ...createItem(f) })
        await publishToSQS(item)
        return await item
      })
      .then(async item => {
        fetchedLocations = R.append(item, fetchedLocations)
        await getAddressComponents(R.tail(list), R.append(item, items))
      })
      .catch(
        R.compose(
          getAddressComponents([], items),
          R.tap(console.log)
        )
      )
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

exports.handler = async function(event, context) {
  const lastCheck = await ddb
    .get(lcParams)
    .promise()
    .then(R.path(['Item', 'Date']))
    .catch(x => x)

  // console.log(JSON.stringify(event, null, 2))
  console.log(lastCheck)

  return await fetch(highrise(lastCheck), fetchOptions)
    .then(x => x.text())
    .then(
      R.pipe(
        convertXml,
        R.ifElse(
          isNilOrEmpty,
          R.always([]),
          R.pipe(
            getAddressComponents,
            R.then(async () => {
              // console.log('fl', await fetchedLocations)
              const newLastCheck = format(Date.now(), 'YYYYMMDDHHMM')
              if (
                Array.isArray(fetchedLocations) &&
                fetchedLocations.length > 1
              ) {
                const updateLastCheck = await updateDDb(newLastCheck)
                console.log(updateLastCheck)
                console.log(
                  `Processed: ${fetchedLocations.length} at ${newLastCheck}`
                )
                return await fetchedLocations
              } else {
                // context.done(null, 'No Items Processed')
                return await fetchedLocations
              }
            })
          )
        )
      )
    )
    .catch(console.log)

  //Better Practice Add to SNS/SQS to trigger Lambda
}
