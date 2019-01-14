const R = require('ramda')
const fs = require('fs')

fs.readFile('./formattedLocationsNew.json', (err, data) => {
  const cities = JSON.parse(fs.readFileSync('./cityList.json').toString()).map(
    x =>
      Object.assign({}, x, {
        city: R.toLower(R.head(R.split(',', x.formatted_address))),
      })
  )
  const formattedCities = R.compose(
    R.reject(R.isEmpty),
    R.uniq,
    R.pluck(['city'])
  )(JSON.parse(data.toString()))

  const byCity = R.groupBy(loc => R.find(x => x === loc.city, formattedCities))
  //console.log(cities)
  R.compose(
    x => fs.writeFileSync('./scratch.json', JSON.stringify(R.values(x))),
    R.mapObjIndexed((v, k, o) => {
      const ct = cities.filter(c => c.city === R.toLower(k))
      return ct.length === 1 ? Object.assign({}, v, ct[0]) : v
    }),
    R.map(x => {
      //console.log('X', x.length)
      return Object.assign(
        {},
        {
          list: x,
        },
        {
          total: x.length,
        }
      )
    }),
    byCity,
    JSON.parse
  )(data.toString())
})
