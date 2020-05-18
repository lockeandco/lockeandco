import React, {Fragment} from 'react'

import {Fullpage, HorizontalSlider, Slide} from 'fullpage-react'
import createHistory from 'history/createBrowserHistory'
import Menu from './Menu'
import Bottom from '../components/BottomMenu'
import SplitGrid from '../components/SplitGrid'
import Cofounders from '../components/Cofounders'
import SplitGrid2 from '../components/SplitGrid2'
import Router from 'next/router'
import {pluck} from 'ramda'
const {changeFullpageSlide, changeHorizontalSlide} = Fullpage

const fullPageOptions = {
	// For mouse/wheel events
	// represents the level of force required to generate a slide change on non-mobile, 0 is default
	scrollSensitivity: 5,

	// For touchStart/touchEnd/mobile scrolling
	// represents the level of force required to generate a slide change on mobile, 0 is default
	touchSensitivity: 3,
	scrollSpeed: 300,
	resetSlides: true,
	hideScrollBars: true,
	enableArrowKeys: true,

	// Optional, set the initial vertical slide
	// activeSlide: 4,
}

const horizontalNavStyle = {
	position: 'absolute',
	width: '100%',
	top: '50%',
	zIndex: 10,
}

const horizontalSliderProps = {
	name: 'horizontalSlider1',
	infinite: true,
}

const linkList = [
	{
		name: 'co-founders',
		page: 0,
		// Icon: <AccountMultiple style={{ color: '#C36D15' }} />,
	},
	{
		name: 'our-story',
		page: 1,
		//  Icon: <BookOpenPageVariant style={{ color: '#C36D15' }} />,
	},
	{
		name: 'spirits',
		page: 2,
		// Icon: <Keg style={{ color: '#C36D15' }} />,
	},
	{
		name: 'find-us',
		page: 3,
		//   Icon: <MapSearch style={{ color: '#C36D15' }} />,
	},
	{
		name: 'contact-us',
		page: 4,
		//  Icon: <Email style={{ color: '#C36D15' }} />,
	},
	{
		name: 'stay-connected',
		page: 5,
		//  Icon: <At style={{ color: '#C36D15' }} />,
	},
	{
		name: 'merchandise',
		page: 6,
		//  Icon: <Cart style={{ color: '#C36D15' }} />,
	},
]
class FullpageReact extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: {
				Fullpage: linkList.filter(x => `/`.concat(x.name) === props.asPath)[0]
					.page,
				horizontalSlider1: 0,
			},
			history: {},
		}

		this.onSlideChangeStart = this.onSlideChangeStart.bind(this)
		this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this)
	}

	onSlideChangeStart(name, props, state, newState) {
		if (!this.horizontalNav) {
			this.horizontalNav = document.querySelector('#horizontal-nav')
		}

		if (name === 'horizontalSlider1') {
			scrollNavStart(this.horizontalNav)
		}
	}

	onSlideChangeEnd(name, props, state, newState) {
		if (name === 'horizontalSlider1') {
			scrollNavEnd(this.horizontalNav)
		}

		const oldActive = this.state.active
		const sliderState = {
			[name]: newState.activeSlide,
		}

		const updatedState = Object.assign(oldActive, sliderState)
		this.setState(updatedState)
	}

	componentDidMount() {
		// //const history = createHistory()
		// //const page = history.location
		// //console.log('PROPS', this.props.route)
		// this.setState({
		//   // history: history,
		//   active: {
		//     Fullpage: linkList.filter(
		//       x => `/`.concat(x.name) === this.props.asPath
		//     )[0].page,
		//   },
		// })
		// //console.log('STATE', this.state)
		// const handleRouteChange = url => {
		//   console.log(url)
		//   console.log(pluck('name', linkList))
		//   if (
		//     pluck('name', linkList)
		//       .map(x => `/`.concat(x))
		//       .includes(url)
		//   ) {
		//     const al = linkList.filter(x => `/`.concat(x.name) === url)[0]
		//     console.log(al)
		//     this.setState({
		//       // history: history,
		//       active: {
		//         Fullpage: al.page,
		//       },
		//     })
		//     changeFullpageSlide(al.page)
		//     console.log(this.state)
		//   }
		// }
		// Router.router.events.on('routeChangeStart', handleRouteChange)
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		const {active, history} = this.state
		const {children} = this.props
		const currentActive = active.Fullpage
		const previousSlide = changeFullpageSlide.bind(null, currentActive - 1)
		const nextSlide = changeFullpageSlide.bind(null, currentActive + 1)
		const goToTop = changeFullpageSlide.bind(null, 0)
		const goToSlide = slide => {
			changeFullpageSlide(slide)
		}

		const horizontalSliderName = horizontalSliderProps.name
		const horizontalActive = this.state.active[horizontalSliderName]

		const previousHorizontalSlide = changeHorizontalSlide.bind(
			null,
			horizontalSliderName,
			horizontalActive - 1
		)
		const nextHorizontalSlide = changeHorizontalSlide.bind(
			null,
			horizontalSliderName,
			horizontalActive + 1
		)

		const horizontalNav = (
			<div id="horizontal-nav" style={horizontalNavStyle}>
				<span onClick={previousHorizontalSlide}>
					<button>PREV</button>
				</span>
				<span
					style={{position: 'absolute', right: '0px'}}
					onClick={nextHorizontalSlide}
				>
					<button>Next</button>
				</span>
			</div>
		)

		const horizontalSlides = [
			<Slide style={{backgroundColor: 'red'}}>
				<p>Horizontal 1</p>
			</Slide>,
			<Slide style={{backgroundColor: 'yellow'}}>
				<p>Horizontal 2</p>
			</Slide>,
			<Slide style={{backgroundColor: 'green'}}>
				<p>Horizontal 3</p>
			</Slide>,
		]
		horizontalSliderProps.slides = horizontalSlides

		const horizontalSlider = (
			<HorizontalSlider id="horizontal-slider-1" {...horizontalSliderProps}>
				{horizontalNav}
			</HorizontalSlider>
		)

		const verticalSlides = [
			<Slide style={{backgroundColor: 'blue'}}>
				<Cofounders>{children}</Cofounders>
			</Slide>,
			<Slide>
				<SplitGrid />
			</Slide>,
			<Slide style={{backgroundColor: 'white'}}>
				<SplitGrid2 />
			</Slide>,
			<Slide style={{backgroundColor: 'black'}}>
				<p>Slide 5</p>
			</Slide>,
			horizontalSlider,
			<Slide style={{backgroundColor: 'pink'}}>
				<p>Slide 6</p>
			</Slide>,
			<Slide style={{backgroundColor: 'white'}}>
				<p>Slide 7</p>
			</Slide>,
			<Slide style={{backgroundColor: 'black'}}>
				<p>Slide 8</p>
			</Slide>,
		]
		fullPageOptions.slides = verticalSlides
		fullPageOptions.activeSlide = this.state.active.Fullpage
		// Console.log('FPO', fullPageOptions)
		return (
			<>
				<Menu
					prevSlide={previousSlide}
					nextSlide={nextSlide}
					goToTop={goToTop}
					goToSlide={goToSlide}
					page={active.Fullpage}
				/>
				<Fullpage
					onSlideChangeStart={this.onSlideChangeStart}
					onSlideChangeEnd={this.onSlideChangeEnd}
					{...fullPageOptions}
					activeSlide={this.state.active.Fullpage}
				/>
				<Bottom
					prevSlide={previousSlide}
					nextSlide={nextSlide}
					goToTop={goToTop}
					goToSlide={goToSlide}
					page={active.Fullpage}
				/>
				{children}
			</>
		)
	}
}

function scrollNavStart(nav) {
	// Make the nav fixed when we start scrolling horizontally
	nav.style.position = 'fixed'
}

function scrollNavEnd(nav) {
	// Make the nav absolute when scroll finishes
	nav.style.position = 'absolute'
}

export default FullpageReact
