// eslint-disable
// this is an auto generated file. This will be overwritten

export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
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
export const listLocations = `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`
export const getLockeandcoItem = `query GetLockeandcoItem($itemId: String!, $itemTypeTarget: String!) {
  getLockeandcoItem(itemId: $itemId, itemTypeTarget: $itemTypeTarget) {
    itemId
    itemTypeTarget
  }
}
`
export const listLockeandcoItems = `query ListLockeandcoItems(
  $filter: TableLockeandcoItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listLockeandcoItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      itemId
      itemTypeTarget
    }
    nextToken
  }
}
`
