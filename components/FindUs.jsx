import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import locations from '../lib/formattedLocations.json'
import { equals } from 'ramda'

//console.log(locations.filter(x => x.location))
//stream props for performance?
export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {
        lat: 39.743642,
        lng: -104.9854807,
      },
      selectedPlace: '',
      site: '',
      loc: {
        lat: 39.743642,
        lng: -104.9854807,
      },
      zoom: 9,
    }
  }
  onMarkerClick(props, marker, e, s) {
    this.setState({
      selectedPlace: e,
      activeMarker: marker.position,
      showingInfoWindow: true,
      site: s,
    })
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!equals(this.props.testP, prevProps.testP)) {
      console.log(this.props)
      console.log(prevProps)
      this.setState({
        loc: this.props.testP,
        zoom: equals(
          {
            lat: 39.743642,
            lng: -104.9854807,
          },
          this.props.testP
        )
          ? 9
          : 12,
      })
    }
  }
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>
    }
    console.log(this.state.zoom)
    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          minHeight: '97vh',
          //   height: 'calc(100vh * .7)',
          //   width: 'calc(100vw * .9',
          //   paddingLeft: '5%',
          //   paddingRight: '5%',
          //paddingBottom: '200px',
        }}
      >
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{
            lat: 39.743642,
            lng: -104.9854807,
          }}
          center={this.state.loc}
        >
          {locations.map(x => {
            return (
              <Marker
                key={x.name}
                name={x.name}
                onClick={(e, a, b, l) => {
                  this.onMarkerClick(e, a, x.name, x.site)
                }}
                icon={{
                  url: '/static/Bottle.png',
                  anchor: new google.maps.Point(0, 0),
                  scaledSize: new google.maps.Size(32, 68),
                }}
                position={x.location}
                title={x.formatted_address}
              />
            )
          })}
          <InfoWindow
            onClose={() =>
              this.setState(
                Object.assign(this.state, {
                  showingInfoWindow: false,
                  activeMarker: {
                    lat: 39.743642,
                    lng: -104.9854807,
                  },
                  selectedPlace: '',
                  site: '',
                })
              )
            }
            position={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <React.Fragment>
              <h3>{this.state.selectedPlace}</h3>
              {this.state.site && (
                <a href={this.state.site} target="_blank">
                  {this.state.site}
                </a>
              )}
            </React.Fragment>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4',
  v: '3.31',
})(MapContainer)
