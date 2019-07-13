const adds = require('./updatedList-0128')
const fs = require('fs')
const R = require('ramda')
const util = require('util')
const { from, zip, interval, of } = require('rxjs')
const { ajax } = require('rxjs/ajax')
const {
  map,
  scan,
  switchMap,
  concatMap,
  expand,
  startWith,
  pluck,
  tap: rxjs_tap,
  mergeMap,
} = require('rxjs/operators')
const setTimeoutPromise = util.promisify(setTimeout)
const { XMLHttpRequest } = require('xmlhttprequest')
const {
  isTruthy,
  spreadPath,
  isNilOrEmpty,
  renameKeys,
} = require('ramda-adjunct')
const unfetch = require('isomorphic-unfetch')
const parser = require('fast-xml-parser')
const he = require('he')
const locations = require('./formattedLocationsNew3')

const xmlOptions = {
  //attributeNamePrefix : "",
  //attrNodeName: "attr", //default is 'false'
  //textNodeName : "",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: false,
  parseAttributeValue: true,
  trimValues: true,
  attributeNamePrefix: '',
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: a => he.decode(a), //default is a=>a
}

var tObj = xmlData => parser.getTraversalObj(xmlData, xmlOptions)
var jsonObj = xmlData => parser.parse(xmlData, xmlOptions)

function createXHR() {
  return new XMLHttpRequest()
}

const lastCheck = 0
const highrise = `https://lockecodistilling.highrisehq.com/companies.xml?since=20190709154546&criteria[carry_us]=YES`
console.log(Data.now())
const url = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

const writeToFile = x =>
  fs.writeFileSync('./jsonObj4.json', JSON.stringify(x, null, 2))

const getAddressComponentValue = nameType => typeName => a => {
  console.log('A', a, typeName, nameType)
  const suffix = R.compose(
    R.head,
    R.filter(x => x.types && x.types.includes(typeName))
  )(a)
  console.log(suffix, suffix[nameType])
  return suffix ? suffix[nameType] : ''
}

const ws = fs.createWriteStream('./jsonObj5.json')
ws.write('[')

const createItems = R.compose(
  R.head,
  R.chain(x => {
    console.log('CREATE ITEMS', x)
    const attrs = R.mergeAll(x)
    console.log('Attrs', attrs)
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
  R.tap(console.log),
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
    console.log('LOCATION', location)
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

// getData.subscribe(x => console.log(x))

// console.log(formattedAdds)
// .map(async y => {
//   const { url, name, site } = y
//   console.log(url)
//   let timer = 0
//   const dd = Date.now() + 500
//   while (dd > Date.now()) {
//     timer++
//   }
//   console.log(timer)
//   return Object.assign(
//     {},
//     await fetch(url)
//       .then(z => z.json())
//       .then(d => {
//         console.log(d)
//         return d
//       }),
//     {
//       name: name,
//       site: site,
//     }
//   )
// })

// Promise.all(formattedAdds)
//   .then(x => {
//     fs.writeFileSync('formattedAdds.json', JSON.stringify(x))
//     console.log(x)
//     return x
//   })
//   .then(x =>
//     fs.writeFileSync(
//       'formattedLocations.json',
//       JSON.stringify(
//         R.chain(
//           x =>
//             Object.assign(
//               {},
//               {
//                 formatted_address: R.compose(
//                   R.path(['formatted_address']),
//                   R.mergeAll,
//                   R.path(['results'])
//                 )(x),
//               },
//               {
//                 location: R.compose(
//                   R.path(['geometry', 'location']),
//                   R.mergeAll,
//                   R.path(['results'])
//                 )(x),
//               },
//               R.pick(['name', 'site'])(x)
//             ),
//           x
//         )
//       )
//     )
//   )
//____________________________________________
//Cities
// const formattedCities = R.compose(
//   R.map(
//     R.compose(
//       async x =>
//         await fetch(x)
//           .then(z => z.json())
//           .then(d => d),
//       url,
//       x => x.concat(',+CO'),
//       R.join('+'),
//       R.split(' ')
//     )
//   ),
//   R.uniq,
//   R.pluck(['Company Address - Work City'])
// )(adds)

// Promise.all(formattedCities)
//   .then(x => {
//     fs.writeFileSync('gsps.json', JSON.stringify(x))
//     return x
//   })
//   .then(cities =>
//     fs.writeFileSync(
//       'cities.json',
//       R.compose(
//         // R.path(['location']),
//         // R.head,
//         c => JSON.stringify(c, null, 2),
//         R.chain(x =>
//           Object.assign(
//             {},
//             { formatted_address: cities.formatted_address },
//             { location: R.path(['geometry', 'location'])(cities) }
//           )
//         ),
//         R.chain(R.pick(['geometry', 'formatted_address'])),
//         R.flatten,
//         R.pluck(['results'])
//       )(cities)
//     )
//   )
//____________________________________________

// const cities = require('./gsps.json')

// fs.writeFileSync(
//   'cities.json',
//   R.compose(
//     // R.path(['location']),
//     // R.head,
//     c => JSON.stringify(c, null, 2),
//     R.sortWith([R.ascend(R.prop('formatted_address'))]),
//     R.tap(console.log),
//     R.uniqWith(R.eqBy(R.pick(['formatted_address']))),
//     R.chain(x =>
//       Object.assign(
//         {},
//         { formatted_address: x.formatted_address },
//         { location: R.path(['geometry', 'location'])(x) }
//       )
//     ),
//     R.tap(console.log),
//     R.chain(R.pick(['geometry', 'formatted_address'])),
//     R.tap(console.log),
//     R.flatten,
//     R.tap(console.log),
//     R.pluck(['results'])
//   )(cities)
// )

//Working
// fs.writeFileSync(
//   'poo.json',
//   JSON.stringify(
//     R.chain(
//       x =>
//         Object.assign(
//           {},
//           {
//             formatted_address: R.compose(
//               R.head,
//               R.map(R.path(['formatted_address'])),
//               R.path(['results'])
//             )(x),
//           },
//           {
//             location: R.compose(
//               R.path(['location']),
//               R.head,
//               R.map(R.path(['geometry'])),
//               R.path(['results'])
//             )(x),
//           },
//           R.pick(['name', 'site'])(x)
//         ),
//       formattedAdds
//     )
//   )
// )
//---------------------------------

// const cities = require('./gsps.json')

// fs.writeFileSync(
//   'oopoo.json',
//   R.compose(
//     // R.path(['location']),
//     // R.head,
//     JSON.stringify,
//     R.chain(x =>
//       Object.assign(
//         {},
//         { formatted_address: x.formatted_address },
//         { location: R.path(['geometry', 'location'])(x) }
//       )
//     ),
//     R.chain(R.pick(['geometry', 'formatted_address'])),
//     R.flatten,
//     R.pluck(['results'])
//   )(cities)
// )

//-----------
// Test
//fs.writeFileSync('gs.json', JSON.stringify(formattedAdds))
// const fdsd = async () => {
//   const g = await fetch(
//     'https://maps.googleapis.com/maps/api/geocode/json?address=6140+S+Gun+Club+Rd.,+Arvada,+CO&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4'
//   )
//   return g
// }

// fdsd()
//   .then(x => x.json())
//   .then(data => console.log(data))
//-----------
//Writing PreFormatted to File
// fs.writeFileSync('goo.json', JSON.stringify(formattedAdds))
// const goo = require('./goo.json')

//-----------
// First Pass
// fs.writeFileSync(
//   'lop.json',
//   JSON.stringify(
//     goo
//       .map(x => R.pick(['results', 'name', 'site'])(x))
//       .map(y =>
//         Object.assign(
//           {},
//           { formatted_address: R.path(['results', 'formatted_address'], y) },
//           { location: R.path(['results', 'geometry', 'location'], y) },
//           { name: y.name, site: y.site }
//         )
//       )
//   )
// )
//-----------
//Working Old
// fs.writeFileSync(
//   'poo.json',
//   JSON.stringify(
//     R.chain(
//       x =>
//         Object.assign(
//           {},
//           {
//             formatted_address: R.compose(
//               R.head,
//               R.map(R.path(['formatted_address'])),
//               R.path(['results'])
//             )(x),
//           },
//           {
//             location: R.compose(
//               R.path(['location']),
//               R.head,
//               R.map(R.path(['geometry'])),
//               R.path(['results'])
//             )(x),
//           },
//           R.pick(['name', 'site'])(x)
//         ),
//       goo
//     )
//   )
// )
//---------------------------------
// Orphan ?
//     R.pluck('geometry'),
//     R.pluck('results')(goo.map(x => R.pick(['results', 'name', 'site'])(x)))
//   )
// )
//     .map(y => R.pick(['results'])(y))
//     .map(c => R.pluck('formatted_address')(c))
// )

//     //   x =>
//     //     R.ifElse(
//     //       R.compose(
//     //         isTruthy,
//     //         y => R.find(R.propEq('name', y.name), locations)
//     //       ),
//     //       R.always({}),
//     //       R.identity
//     //     )(x),
