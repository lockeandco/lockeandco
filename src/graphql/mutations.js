// eslint-disable
// this is an auto generated file. This will be overwritten

export const createLocation = `mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(input: $input) {
    itemId
    itemTypeTarget
    place_id
    formatted_address
    location {
      lat
      lng
    }
    city
    name
    site
  }
}
`
export const updateLocation = `mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
    itemId
    itemTypeTarget
    place_id
    formatted_address
    location {
      lat
      lng
    }
    city
    name
    site
  }
}
`
export const deleteLocation = `mutation DeleteLocation($input: DeleteLocationInput!) {
  deleteLocation(input: $input) {
    itemId
    itemTypeTarget
    place_id
    formatted_address
    location {
      lat
      lng
    }
    city
    name
    site
  }
}
`
export const createLastCheck = `mutation CreateLastCheck($input: CreateLastCheckInput!) {
  createLastCheck(input: $input) {
    itemId
    itemTypeTarget
    date
  }
}
`
export const updateLastCheck = `mutation UpdateLastCheck($input: UpdateLastCheckInput!) {
  updateLastCheck(input: $input) {
    itemId
    itemTypeTarget
    date
  }
}
`
export const createLockeandcoItem = `mutation CreateLockeandcoItem($input: CreateLockeandcoItemInput!) {
  createLockeandcoItem(input: $input) {
    itemId
    itemTypeTarget
  }
}
`
export const updateLockeandcoItem = `mutation UpdateLockeandcoItem($input: UpdateLockeandcoItemInput!) {
  updateLockeandcoItem(input: $input) {
    itemId
    itemTypeTarget
  }
}
`
export const deleteLockeandcoItem = `mutation DeleteLockeandcoItem($input: DeleteLockeandcoItemInput!) {
  deleteLockeandcoItem(input: $input) {
    itemId
    itemTypeTarget
  }
}
`
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    itemId
    itemTypeTarget
    Name
    Email
    Type
    Body
  }
}
`
