import adds from './locations.json'
import fetch from 'unfetch'
import fs from 'fs'

const url = address =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4`

const formattedAdds = adds
  .map(x =>
    x['Company Address - Work Street']
      .join('+')
      .concat(
        ',+',
        x['Company Address - Work City'].join('+'),
        '+',
        x['Company Address - Work State']
      )
  )
  .map(async y => await unfetch(url(y)).then(z => z.json()))

fs.writeFileSync(JSON.stringify(formattedAdds), 'gs.json')
