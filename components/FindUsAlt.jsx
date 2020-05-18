/* global google */
import React, {Component} from 'react'
import {GMap} from 'primereact/gmap'
import {Dialog} from 'primereact/dialog'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Checkbox} from 'primereact/checkbox'
import {Growl} from 'primereact/growl'
import {GoogleApiWrapper} from 'google-maps-react'
import {
	reject,
	map,
	compose,
	isEmpty,
	isNil,
	flatten,
	omit,
	path,
	pluck,
	tap,
} from 'ramda'

class GMapDemo extends Component {
	constructor(props) {
		super(props)
		// Console.log('GMAPS DEMO', props)
		this.state = {
			dialogVisible: false,
			markerTitle: '',
			draggableMarker: false,
			overlays: null,
			selectedPosition: null,
			//   Zoom: 12,
			itemInfo: {},
		}

		this.onMapClick = this.onMapClick.bind(this)
		this.onOverlayClick = this.onOverlayClick.bind(this)
		//  This.handleDragEnd = this.handleDragEnd.bind(this)
		this.onMapReady = this.onMapReady.bind(this)
		this.onHide = this.onHide.bind(this)
		this.addMarker = this.addMarker.bind(this)
		this.onZoomChanged = this.onZoomChanged.bind(this)
		this.setInfoWindowContent = this.setInfoWindowContent.bind(this)
	}

	setInfoWindowContent(item) {
		const {name, site, formatted_address} = item
		// Console.log(item)
		return `<div>
    <h4>${name}</h4>
    <h5>${formatted_address}<h5>
    <p>${site ? `<a href=${site} target='_blank'>Homepage ->` : ''}</p>
    </div>`
	}

	componentDidUpdate(previous, next, snapshot) {
		const {locs} = this.props
		const gm = this.gmap.getMap()
		let markerClusterer

		if (
			Array.isArray(previous.locs) &&
			previous.locs.length < 2 &&
			locs.length > 0
		) {
			this.setState({
				overlays:
					// Locs
					//   ? [
					//       ...compose(
					//         map(l => {
					//           const marker = new google.maps.Marker({
					//             position: l.location,
					//             title: l.name,
					//             icon: {
					//               url: '/plus.png',
					//               anchorPoint: new google.maps.Point(0, -200),
					//               scaledSize: new google.maps.Size(20, 20),
					//             },
					//           })
					//           return marker
					//         }),
					//         reject(isNil),
					//         reject(isEmpty)
					//         // tap(console.log)
					//       )(locs),
					//     ]
					//   :
					[],
			})
		}

		const overlays = [
			...compose(
				map(l => {
					const marker = new google.maps.Marker({
						position: l.location,
						title: l.name,
						icon: {
							url: '/plus.png',
							anchorPoint: new google.maps.Point(0, -200),
							scaledSize: new google.maps.Size(30, 30),
						},
					})
					return marker
				}),
				reject(isNil),
				reject(isEmpty)
				// Tap(console.log)
			)(locs),
		]

		overlays.forEach(overlay => {
			overlay.addListener('click', event => {
				this.onOverlayClick({
					originalEvent: event,
					overlay,
					map: gm,
				})
			})
		})

		markerClusterer = new MarkerClusterer(gm, overlays, {
			imagePath:
				'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
		})

		if (previous.position !== this.props.position) {
			console.log('Setting Position')
			gm.setCenter(this.props.position)
		}

		if (previous.zoom !== this.props.zoom) {
			console.log('Setting Zoom')
			gm.setZoom(this.props.zoom)
		}

		if (previous.zoom === 14 && previous.zoom > this.props.zoom) {
			this.infoWindow && this.infoWindow.close()
		}

		if (
			this.props.zoom === 14 &&
			this.props.selectedItem.hasOwnProperty('location')
		) {
			const item = this.props.selectedItem
			previous.zoom === this.props.zoom || gm.setZoom(this.props.zoom)
			//   Const newMarker = new google.maps.Marker({
			//     position: item.location,
			//     title: item.name,
			//     icon: {
			//       url: '/plus.png',
			//       // size: new google.maps.Size(20, 20),
			//       scaledSize: new google.maps.Size(20, 20),
			//     },
			//   })
			if (Array.isArray(next.overlays)) {
				const itemOverlay =
					Array.isArray(next.overlays) &&
					next.overlays.reduce((x, y) => (y.name === item.name ? y : x), '')

				// Console.log(itemOverlay)
				// //   console.log(newMarker)
				// console.log(itemOverlay.getPosition())
				// //   console.log(newMarker.getPosition())
				// console.log('ITEM', item)
				//   gm.setCenter(itemOverlay.getPosition())

				this.infoWindow = this.infoWindow || new google.maps.InfoWindow()
				this.infoWindow.setContent(this.setInfoWindowContent(item))
				this.infoWindow.setPosition(item.location)
				this.infoWindow.open(gm)
				// Gm.setCenter(item.location)

				// gm.setCenter(itemOverlay.getPosition())
				// gm.setZoom(this.props.zoom)
			}
		}

		if (markerClusterer) {
			const markersClusterers = markerClusterer.getClusters()
			markerClusterer.getClusters()
		}
	}

	onMapClick(event) {
		this.setState({
			dialogVisible: true,
		})
		this.infoWindow && this.infoWindow.close()
		this.props.setPositionAndZoom({
			position: {
				lat: 39.743642,
				lng: -104.9854807,
			},
			zoom: 14,
		})
	}

	onZoomChanged(d) {}
	onOverlayClick(event) {
		const {locs, setPositionAndZoom, setStore, expandList} = this.props

		const title = event.overlay.getTitle()
		const item = locs.reduce((x, y) => (y.name === title ? y : x))
		// Console.log(event.map)

		if (title) {
			this.infoWindow = this.infoWindow || new google.maps.InfoWindow()
			this.infoWindow.setContent(this.setInfoWindowContent(item))
			this.infoWindow.open(event.map, event.overlay)
			setPositionAndZoom({
				position: item.location,
				// Zoom: 14,
			})
			// Console.log(item.city)
			expandList(item.city || '')
			setStore(item)
		}
	}

	addMarker() {
		const newMarker = new google.maps.Marker({
			position: {
				lat: this.state.selectedPosition.lat(),
				lng: this.state.selectedPosition.lng(),
			},
			title: this.state.markerTitle,
			draggable: this.state.draggableMarker,
			animation: google.maps.Animation.DROP,
		})

		this.setState({
			overlays: [...this.state.overlays, newMarker],
			dialogVisible: false,
			draggableMarker: false,
			markerTitle: '',
		})
	}

	onMapReady(event) {
		const {
			locs,
			position = {
				lat: 39.743642,
				lng: -104.9854807,
			},
			zoom = 3,
		} = this.props

		this.setState({
			overlays: locs
				? [
						...compose(
							map(l => {
								const marker = new google.maps.Marker({
									position: l.location,
									title: l.name,
									icon: {
										url: '/plus.png',
										anchorPoint: new google.maps.Point(0, -200),
										scaledSize: new google.maps.Size(20, 20),
									},
								})
								return marker
							}),
							reject(isNil),
							reject(isEmpty)
							// Tap(console.log)
						)(locs),
				  ]
				: [],
		})
	}

	onHide(event) {
		// This.setState({ dialogVisible: false })
	}

	render() {
		const {position, zoom} = this.props
		const options = {
			center: position,
			zoom,
		}
		return (
			<GMap
				ref={element => (this.gmap = element)}
				options={options}
				style={{
					position: 'relative',
					height: '100%',
					width: '100%',
					minHeight: '97vh',
				}}
				onMapReady={this.onMapReady}
				onOverlayClick={this.onOverlayClick}
				onOverlayDragEnd={this.handleDragEnd}
				onMapClick={this.onMapClick}
			/>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCAHEdspo9nrGHO9GqZxKwPXcjmOWr6mY4',
	v: '3.40',
})(GMapDemo)
