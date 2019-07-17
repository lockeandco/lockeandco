// eslint-disable
// this is an auto generated file. This will be overwritten

export const getLocation = `query GetLocation($id: ID!) {
  getLocation(id: $id) {
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
export const listLocations = `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
export const getLastCheck = `query GetLastCheck($itemId: String!, $itemTypeTarget: String!) {
  getLastCheck(itemId: $itemId, itemTypeTarget: $itemTypeTarget) {
    itemId
    itemTypeTarget
    date
  }
}
`
export const listLocationsByCity = `query ListLocationsByCity(
  $filter: TableLockeandcoItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocationsByCity(filter: $filter, limit: $limit, nextToken: $nextToken) {
    list {
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
    total
    formatted_address
    city
    location {
      lat
      lng
    }
  }
}
`
