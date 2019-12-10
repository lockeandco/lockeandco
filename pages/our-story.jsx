import compose from 'ramda/src/compose'
import checkCookie from '../components/NoCookie'
import OurStory from '../components/OurStory'
import withPageTransition from '../components/withPageTransition'
import { branch } from 'recompose'

// const styles = theme => ({
//   paper: {
//     flexGrow: 1,
//     borderRadius: 'unset',
//     backgroundColor: 'transparent',
//     overflow: 'auto',
//     margin: 10,
//     borderRadius: 0,
//     padding: '1em',
//     boxShadow: 'unset',
//     color: '#E2DED5',
//     fontFamily: 'Flama',
//     overflow: 'auto',
//     [theme.breakpoints.down('sm')]: {
//      // maxHeight: 'calc(.6 * 100vh)',
//       //overflow: 'scroll',
//     },
//     [theme.breakpoints.up('md')]: {
//       flexGrow: 1,
//       borderRadius: 'unset',
//       backgroundColor: 'transparent',
//       overflow: 'auto',
//       paddingRight: `10%`,
//       paddingLeft: `10%`,
//       paddingTop: 150,
//     },
//   },
//   card: {
//     minWidth: 200,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 0,
//     padding: '1em',
//     boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
//   },
//   typo: {
//     color: '#E2DED5',
//     fontFamily: 'Flama',
//     textShadow: '1px 1px rgb(36, 55, 70)',
//     [theme.breakpoints.up('sm')]: {
//       fontSize: '1.1rem',
//     },
//   },
// })

// const OurStory = props => {
//   const { classes, ...other } = props
//   return (
//     <Page
//       {...other}
//       pictures={{
//         left: {
//           url: `/Man_Looking_Over_Cliff.jpg`,
//           size: '100%',
//         },
//         rightTop: {
//           url: `/Moonshine_Jars.jpg`,
//           size: '55%',
//         },
//         rightBottom: {
//           url: `/Group_with_Sparklers.jpg`,
//           size: '45%',
//         },
//       }}
//       text={{
//         position: 'left',
//         component: (
//           <Paper className={classes.paper}>
//             <div className={classes.card}>
//               <Typography variant="body1" paragraph className={classes.typo}>
//                 The Locke’s family roots in Colorado moonshining go back several
//                 generations. Owen Locke kept the craft tradition alive with an
//                 early knack for brewing that continued through college to
//                 graduate school, where he reconnected with Rick Talley.
//               </Typography>
//               <Typography variant="body1" paragraph className={classes.typo}>
//                 The high school friends and lacrosse teammates immediately
//                 recognized that their collaborative styles complimented each
//                 other well, working through MBA degrees together at the
//                 University of Denver’s Daniels College of Business as hand sale
//                 experts for Beam Suntory. It didn’t take them long to realize
//                 they could create something bolder and wilder than the premier
//                 spirits they offered at countless tastings. In 2010, the team
//                 bought a 23-gallon still that turned a garage hobby into a
//                 lifestyle with their first whiskey batches aged in small
//                 barrels.
//               </Typography>
//             </div>
//           </Paper>
//         ),
//       }}
//       header={{
//         position: 'rightTop',
//         component: (
//           <CommonHeader
//             height="100%"
//             alignItems="flex-end"
//             headerText={`you're in good company here`}
//           />
//         ),
//       }}
//     />
//   )
// }
export default compose(
  checkCookie,
  // branch(
  // ({ query: { prev } }) => prev === 'co-founders',
  // withPageTransition({
  //   yPosition: { from: 100, to: 0 },
  //   xPosition: { from: 0, to: 0 },
  // }),
  withPageTransition({
    yPosition: { from: 0, to: 0 },
    xPosition: { from: 0, to: 0 },
  })
  // )
)(OurStory)
