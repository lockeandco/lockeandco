import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import locations from '../lib/formattedLocations.json'

console.log(locations.filter(x => x.location))
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
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>
    }
    return (
      <div
        style={{
          position: 'relative',
          height: 'calc(100vh * .6)',
          width: 'calc(100vw * .9',
          paddingLeft: '5%',
          paddingBottom: '20%',

        }}
      >
        <Map

          style={{
              border: '5px solid rgb(36, 55, 70)'
          }}
          google={this.props.google}
          zoom={11}
          initialCenter={{
            lat: 39.743642,
            lng: -104.9854807,
          }}
        >
          {locations.map(x => {


            return (
              <Marker
                key={x.name}
                // onMouseover={(e, k, l, m) => {
                //   this.state.showingInfoWindow ||
                //      setTimeout(() => {  this.setState(
                //       Object.assign(this.state, {
                //         showingInfoWindow: true,
                //         activeMarker: e.position,
                //         selectedPlace: x.name,
                //         site: x.site,
                //       })
                //     )
                // }}
                // onMouseout={(e, k, l, m) => {
                //   console.log(this.state.showingInfoWindow)
                //   setTimeout(() => {
                //     this.setState(
                //       Object.assign(this.state, {
                //         showingInfoWindow: false,
                //         activeMarker: {
                //           lat: 39.743642,
                //           lng: -104.9854807,
                //         },
                //         selectedPlace: '',
                //         site: '',
                //       })
                //     )
                //   }, 1000)
                // }}
                name={x.name}
                onClick={(e, a, b, l) => {
          
                  this.onMarkerClick(e, a, x.name, x.site)
                }}
                icon={{
                  url: '/static/Bottle.png',
                  anchor: new google.maps.Point(0, 0),
                  scaledSize: new google.maps.Size(32, 48),
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
            <div>
              <h3>{this.state.selectedPlace}</h3>
              {this.state.site && (
                <a href={this.state.site} target="_blank">
                  {this.state.site}
                </a>
              )}
            </div>
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
