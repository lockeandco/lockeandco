import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import PeopleIcon from '@material-ui/icons/People'
import DraftsIcon from '@material-ui/icons/Drafts'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import { ChevronDoubleLeft } from 'mdi-material-ui'
import {
  tap,
  compose,
  head,
  toLower,
  pluck,
  flatten,
  reject,
  isNil,
  isEmpty,
  map,
  sort,
  prop,
  ascend,
} from 'ramda'
import PlacesSearch from './MaterialFormiklDownshift'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    maxWidth: 300,
    backgroundColor: `#D6D1C4`,
  },
  listItemText: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
    //padding: 'unset',
  },
  listItemTextActive: {
    color: 'rgb(212, 194, 1)',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
    //padding: 'unset',
  },
  insetItemText: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.5em',
    //padding: 'unset',
  },
  iconColor: {
    color: '#C36D15',
  },
  button: {
    color: 'rgb(36, 55, 70)',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
  },
  inset: {
    '&:first-child': {
      paddingLeft: 15,
    },
  },
  buttonActive: {
    backgroundColor: '#243746',
    '&:hover': {
      backgroundColor: '#243746',
    },
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.7em',
  },
  downshiftMargin: {
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
    color: '#243746',
  },
})
const chevrons = '<<'
function CityList(props) {
  const {
    classes,
    locs,
    expandList,
    open,
    toggleDrawer,
    handleClick,
    route,
    Router,
    city,
    setZoom,
    setPosition,
    setPositionAndZoom,
    setStore,
    selectedItem,
  } = props

  const citiesD = compose(
    map(l => Object.assign({}, { label: toLower(l.name) }, { id: l.place_id })),
    reject(isEmpty),
    reject(isNil),
    sort(ascend(prop('name'))),
    flatten,
    pluck('list')
  )(locs)

  const getCity = loc =>
    locs.reduce((x, y) => {
      return Array.isArray(y.list) &&
        y.list.reduce(
          (w, z) => (toLower(loc) === toLower(z.name) ? z.name : w),
          ''
        )
        ? y.city
        : x
    }, city)
  const getPosition = loc =>
    locs.reduce((x, y) => {
      return Array.isArray(y.list) &&
        y.list.reduce((w, z) => (toLower(loc) === toLower(z.name) ? z : w), '')
        ? y.list.reduce(
            (w, z) => (toLower(loc) === toLower(z.name) ? z : w),
            {}
          )
        : x
    }, selectedItem)

  const sortedLocs = sort(ascend(prop('city')))(locs)
  const showCity = city
    ? sortedLocs.filter(l =>
        l.city ? toLower(l.city) === toLower(city) : true
      )
    : sortedLocs

  console.log('SHOWCITy', showCity)
  return (
    <React.Fragment>
      <div className={classes.downshiftMargin}>
        <PlacesSearch
          menuClasses={classes.menuItem}
          handleChange={item => {
            console.log('ITEM', item)
            if (item) {
              const newSelectedItem = Object.assign({}, getPosition(item))
              const posLoc = newSelectedItem.location

              console.log(posLoc)
              expandList(getCity(item))
              setPositionAndZoom({
                position: posLoc || {
                  lat: 39.743642,
                  lng: -104.9854807,
                },
                zoom: 14,
              })
              setStore(newSelectedItem)
              toggleDrawer && toggleDrawer()
            } else {
              expandList('')
              setPositionAndZoom({
                position: {
                  lat: 39.743642,
                  lng: -104.9854807,
                },
                zoom: 10,
              })
              setStore({})
            }
          }}
          items={citiesD}
        />
      </div>
      <List>
        {showCity.map(item => (
          <React.Fragment key={item.city || Math.random() * 32}>
            <ListItem
              onClick={() => {
                console.log(item)
                if (item.city && toLower(item.city) !== toLower(city)) {
                  expandList(item.city)
                  setPositionAndZoom({ position: item.location, zoom: 12 })
                } else {
                  expandList('')
                  setPositionAndZoom({
                    position: {
                      lat: 39.743642,
                      lng: -104.9854807,
                    },
                    zoom: 10,
                  })
                }
              }}
              key={item.city || Math.random() * 32}
              // onClick={() => {
              //   console.log('ITMs', item)
              //   console.log('Loc', item.location)
              //   handleClick
              //     ? handleClick(item.location)
              //     : props.handleTest(item.location)
              // }}
              button
              style={{ textAlign: 'left' }}
            >
              <ListItemText
                primaryTypographyProps={{
                  className:
                    item.city && toLower(item.city) !== toLower(city)
                      ? classes.listItemText
                      : classes.listItemTextActive,
                }}
                primary={`${item.city || 'no city'} (${item.total})`}
              />
            </ListItem>
            <Collapse in={city === item.city} timeout="auto">
              {Array.isArray(item.list) &&
                item.list.map(store => {
                  return (
                    <List
                      key={store.name || Math.random() * 64}
                      component="div"
                      disablePadding
                    >
                      <ListItem
                        button
                        onClick={() => {
                          console.log(store)
                          // expandList(item.city)
                          setPositionAndZoom({
                            position: store.location,
                            zoom: 14,
                          })
                          setStore(store || {})
                          toggleDrawer && toggleDrawer()
                        }}
                      >
                        <ListItemText
                          inset
                          classes={{
                            inset: classes.inset,
                          }}
                          primaryTypographyProps={{
                            className:
                              store.name &&
                              selectedItem.name &&
                              toLower(store.name) === toLower(selectedItem.name)
                                ? classes.listItemTextActive
                                : classes.listItemText,
                          }}
                          primary={toLower(store.name)}
                        />
                      </ListItem>
                    </List>
                  )
                })}
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  )
}

CityList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CityList)

// <ListItemIcon>
// <span
//   style={{
//     marginRight: 'unset',
//     color: '#E2DED5',
//     fontFamily: 'OldGrowth',
//   }}
// >
//   {chevrons}
// </span>
// </ListItemIcon>
