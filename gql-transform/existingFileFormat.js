const adds = require('./locations.json')
const fetch = require('isomorphic-unfetch')
const fs = require('fs')
const R = require('ramda')
const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)
const changeCase = require('change-case')

const url = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

const getAddressComponentValue = nameType => typeName => a => {
  //   console.log('A', a)
  const suffix = a.filter(x => x.types && x.types.includes(typeName))[0]
  return suffix ? suffix[nameType] : ''
}

//Address
// const formattedAdds = adds
//   .map(x =>
//     Object.assign(
//       {},
//       {
//         url: url(
//           x['Company Address - Work Street']
//             .split(' ')
//             .join('+')
//             .concat(
//               ',+',
//               x['Company Address - Work City'].split(' ').join('+'),
//               ',+',
//               x['Company Address - Work State']
//             )
//         ),
//       },

//       {
//         name: x['Name'],
//         site: x['Web address - Work'],
//       }
//     )
//   )

//   .map(async y => {
//     const { url, name, site } = y
//     console.log(url)
//     let timer = 0
//     const dd = Date.now() + 500
//     while (dd > Date.now()) {
//       timer++
//     }
//     console.log(timer)
//     return Object.assign(
//       {},
//       await fetch(url)
//         .then(z => z.json())
//         .then(d => {
//           console.log(d)
//           return d
//         }),
//       {
//         name: name,
//         site: site,
//       }
//     )
//   })

const formattedCities = R.compose(
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
  R.uniq,
  R.pluck(['city'])
)
fs.readFile('./citiesNew.json', (err, data) => {
  const cityList = JSON.parse(data.toString())
  const exitCityList = R.map(
    changeCase.title,
    R.compose(
      R.map(
        R.compose(
          R.toLower,
          R.head,
          R.split(',')
        )
      ),
      R.pluck('formatted_address')
    )(cityList)
  )

  fs.readFile('./update0128.json', async (err, data) => {
    const addresses = R.chain(
      x =>
        Object.assign(
          {},
          {
            formatted_address: R.compose(
              R.path(['formatted_address']),
              R.mergeAll,
              R.path(['results'])
            )(x),
          },
          {
            location: R.compose(
              R.path(['geometry', 'location']),
              R.mergeAll,
              R.path(['results'])
            )(x),
          },
          {
            city: R.compose(
              getAddressComponentValue('long_name')('locality'),
              R.path(['address_components']),
              R.mergeAll,
              R.path(['results'])
            )(x),
          },
          {
            place_id: R.compose(
              R.path(['place_id']),
              R.mergeAll,
              R.path(['results'])
            )(x),
          },
          R.pick(['name', 'site'])(x)
        ),
      JSON.parse(data.toString())
    )
    //--
    const newCities = R.reject(
      R.isEmpty,
      R.difference(formattedCities(addresses), exitCityList)
    )
    //--
    //--
    const citiesLatLong =
      newCities.length > 0
        ? R.chain(
            R.compose(
              z => z.then(r => r.json()),
              fetch
            ),
            R.map(
              R.compose(
                url,
                n => n.concat('+CO'),
                R.join('+'),
                R.split(' ')
              ),
              newCities
            )
          )
        : []
    //--

    Promise.all(citiesLatLong).then(v =>
      fs.writeFileSync(
        'cityList.json',
        R.compose(
          // R.path(['location']),
          // R.head,
          // c => JSON.stringify(c, null, 2),
          JSON.stringify,
          nc => cityList.concat(nc),

          R.chain(
            R.compose(
              y =>
                Object.assign(
                  {},
                  {
                    formatted_address: y.formatted_address,
                  },
                  {
                    city: R.toLower(R.head(R.split(',', y.formatted_address))),
                  },
                  {
                    location: R.path(['geometry', 'location'])(y),
                  }
                ),

              R.pick(['geometry', 'formatted_address'])
            )
          ),

          R.flatten,
          R.tap(console.log),
          R.pluck(['results'])
        )(v)
      )
    )
    

    // fs.writeFileSync('./partsas1.json', data.toString())
    fs.writeFileSync('formattedLocationsNew2.json', JSON.stringify(addresses))
  })
})
// ____________________________________________
// Cities

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
