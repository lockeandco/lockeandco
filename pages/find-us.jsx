import React, { Fragment } from 'react'
import Page from '../components/PageLayoutWithMaps'
import checkCookie from '../components/NoCookie'
import { withStyles } from '@material-ui/core/styles'
import Background from '../components/TransitionBackground'
import compose from 'ramda/src/compose'
import Headers from '../components/ScrollingHeaders'
import FindUsMap from '../components/FindUsAlt'
import Typography from '@material-ui/core/Typography'
import CityList from '../components/CityList'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import CommonHeader from '../components/MobileScrollingHeader'
import { config } from 'react-spring'
import withPageTransition from '../components/withPageTransition'
import { pluck, flatten, map, omit, tap } from 'ramda'

const lockeCoAvailable = compose(flatten, pluck(['list']))

const lockeCoCities = compose(flatten, map(omit(['list'])))

const styles = theme => ({
  container: {
    margin: '95px 10px 95px 10px ',
    padding: 15,
    paddingTop: '1px',
    textAlign: 'center',
    backgroundColor: `rgba(226, 222, 213, 0.5)`,
    [theme.breakpoints.up('md')]: {
      marginTop: 95,
      textAlign: 'center',
      backgroundColor: 'unset',
      height: '100vh',
    },
  },
  typo: {
    color: '#E2DED5',
    fontFamily: 'OldGrowth',
    fontWeight: 'bold',
    textTransform: 'unset',
    fontSize: '0.6em',
  },
})

const FindUs = props => {
  const {
    expandList,
    setZoom,
    setPosition,
    setPositionAndZoom,
    setStore,
    city,
    position,
    zoom,
    classes,
    lockeColocs,
    ...other
  } = props

  return (
    <Page
      {...other}
      pictures={{
        left: {
          url: ``,
          size: `100%`,
        },
        rightTop: {
          url: ``,
          size: `100%`,
        },
      }}
      leftSize={9}
      rightSize={3}
      backgroundColorRight={`#243746`}
      gMap={
        <FindUsMap
          {...other}
          locs={lockeCoAvailable(lockeColocs)}
          zoom={zoom}
          expandList={expandList}
          city={city}
          zoom={zoom}
          position={position}
          setZoom={setZoom}
          setPosition={setPosition}
          setPositionAndZoom={setPositionAndZoom}
          setStore={setStore}
        />
      }
      text={{
        position: `rightTop`,
        component: (
          <React.Fragment>
            <div className={classes.container}>
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <Tooltip TransitionComponent={Zoom} title={'Reset Map'}>
                  <img
                    src="/Bottle.png"
                    className={classes.bottle}
                    style={{
                      height: 250,

                      width: 'auto',
                      // padding: 1,
                      // border: '1px,solid, #C36D15',
                      // backgroundColor: '#C36D15',
                    }}
                    onClick={() => {
                      scroll
                      setPositionAndZoom({
                        position: {
                          lat: 39.743642,
                          lng: -104.9854807,
                        },
                        zoom: 10,
                      })
                      expandList('')
                    }}
                  />
                </Tooltip>
              </div>
              <CommonHeader
                override={{ overflow: 'unset' }}
                springConfig={{
                  peek: [
                    {
                      delay: 2000,
                      from: { x: 0, opacity: 1 },
                      to: { x: -600, opacity: 0.5 },
                      config: { ...config.molasses, duration: 12000 },
                    },
                    {
                      from: { x: 100, opacity: 1 },
                      to: { x: -600, opacity: 0.5 },
                      config: { ...config.molasses, duration: 12000 },
                    },
                    {
                      from: { x: 100, opacity: 0 },
                      to: { x: Math.random() * -100, opacity: 1 },
                      config: { ...config.molasses, duration: 5000 },
                    },
                  ],
                }}
                alignItems="flex-end"
                headerText={`a taste like none other`}
                style={{
                  marginLeft: '-24px',
                  width: '120%',
                }}
              />
              <Typography variant="h5" className={classes.typo}>
                you can find locke + co. spirits at the following retailers and
                establishments:
              </Typography>

              <CityList
                {...other}
                lockeColocs={lockeColocs}
                expandList={expandList}
                city={city}
                zoom={zoom}
                position={position}
                setZoom={setZoom}
                setPosition={setPosition}
                setPositionAndZoom={setPositionAndZoom}
                setStore={setStore}
              />
            </div>
          </React.Fragment>
        ),
      }}
    />
  )
}

FindUs.getInitialProps = async () => {}

export default compose(checkCookie, withStyles(styles))(FindUs)
