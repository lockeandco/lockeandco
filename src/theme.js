import {createMuiTheme} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'

// Blue
// (36, 55, 70) - #243746
// Orange
// (195, 109, 21) - #C36D15
// 70% Tan
// (226, 222, 213) - #E2DED5
// Tan
// (214, 209, 196) - #D6D1C4
// Gold
// (212, 194, 1) - #D4C201

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#58687c',
			main: '#C36D15',
			dark: '#041828',
		},
		secondary: {
			light: '#c3452e',
			main: '#C36D15',
			dark: '#590000',
		},
	},
	nprogress: {
		color: '#8C0C04',
	},
})

export default theme
