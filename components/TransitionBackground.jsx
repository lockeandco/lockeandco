import React from 'react'

const Background = () => (
	<div
		style={{
			// Height: height,
			display: 'flex',
			minWidth: '100vw',
			minHeight: '100vh',
			height: '100%',
			width: '100%',
			top: 0,
			left: 0,
			position: 'fixed',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'transparent',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundImage: `url(/Seal_Blue.jpg)`,
			backgroundRepeat: 'no-repeat',
			zIndex: -1000,
		}}
	/>
)

export default Background
