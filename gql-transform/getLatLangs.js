const adds = require('./updatedList-0128')
const fs = require('fs')
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

const tObj = xmlData => parser.getTraversalObj(xmlData, xmlOptions)
const jsonObj = xmlData => parser.parse(xmlData, xmlOptions)

format(Date.now(), 'YYYYMMDDHHMM')

const lastCheck = format(Date.now(), 'YYYYMMDDHHMM')
const highrise = `https://lockecodistilling.highrisehq.com/companies.xml?since=${lastCheck}&criteria[carry_us]=YES`

const url = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

const writeToFile = x =>
  fs.writeFileSync('./jsonObj4.json', JSON.stringify(x, null, 2))

const getAddressComponentValue = nameType => typeName => a => {
  const suffix = R.compose(
    R.head,
    R.filter(x => x.types && x.types.includes(typeName))
  )(a)
  return suffix ? suffix[nameType] : ''
}

const ws = fs.createWriteStream('./jsonObj5.json')
ws.write('[')

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
function getAddressComponents(list) {
  console.log(list.length)
  if (isNilOrEmpty(list)) {
    ws.write(']')
    ws.close()
  } else {
    const location = R.head(list)
    const address = R.path(['address'], location)
    unfetch(url(address))
      .then(l => l.json())
      .then(f => {
        console.log('GMAPS RETURN', JSON.stringify(f, null, 2))
        ws.write(
          JSON.stringify(Object.assign({}, location, { ...createItems(f) })),
          null,
          2
        )
        list.length > 1 && ws.write(',')
        getAddressComponents(R.tail(list))
      })
      .catch(console.log)
  }
}

unfetch(highrise, {
  headers: {
    Authorization: 'Basic MDg3ZWI3NmI5ZGZlODMzOTNmMmE1YTA0Y2Y1NDA1YmI6WA==',
  },
  credentials: 'include',
})
  .then(x => x.text())
  .then(
    R.compose(
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
          R.over(
            R.lensProp('contact-data'),
            R.pick(['web-addresses', 'addresses'])
          )
        )
      ),
      R.map(R.pick(['name', 'contact-data'])),
      R.path(['companies', 'company']),
      jsonObj
    )
  )
  .then(getAddressComponents)
  .catch(console.log)
