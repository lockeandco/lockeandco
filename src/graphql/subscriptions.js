// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
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
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
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
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
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
export const onCreateLockeandcoItem = `subscription OnCreateLockeandcoItem($itemId: String, $itemTypeTarget: String) {
  onCreateLockeandcoItem(itemId: $itemId, itemTypeTarget: $itemTypeTarget) {
    itemId
    itemTypeTarget
  }
}
`
export const onUpdateLockeandcoItem = `subscription OnUpdateLockeandcoItem($itemId: String, $itemTypeTarget: String) {
  onUpdateLockeandcoItem(itemId: $itemId, itemTypeTarget: $itemTypeTarget) {
    itemId
    itemTypeTarget
  }
}
`
export const onDeleteLockeandcoItem = `subscription OnDeleteLockeandcoItem($itemId: String, $itemTypeTarget: String) {
  onDeleteLockeandcoItem(itemId: $itemId, itemTypeTarget: $itemTypeTarget) {
    itemId
    itemTypeTarget
  }
}
`
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
    itemId
    itemTypeTarget
    Name
    Email
    Type
    Body
  }
}
`
