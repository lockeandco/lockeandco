// eslint-disable
// this is an auto generated file. This will be overwritten

export const createLocation = `mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(input: $input) {
    PlaceId
    FormattedAddress
    Location {
      lat
      lng
    }
    City
    BusinessName
    Site
  }
}
`
export const updateLocation = `mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
    PlaceId
    FormattedAddress
    Location {
      lat
      lng
    }
    City
    BusinessName
    Site
  }
}
`
export const deleteLocation = `mutation DeleteLocation($input: DeleteLocationInput!) {
  deleteLocation(input: $input) {
    PlaceId
    FormattedAddress
    Location {
      lat
      lng
    }
    City
    BusinessName
    Site
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
