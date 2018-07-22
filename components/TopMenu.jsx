import { withStyles } from '@material-ui/core/styles'
import BaseMenu from './BaseMenu'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    width: `calc(100% - 275px)`,
    marginLeft: '275px',
    maxHeight: 45,
    backgroundColor: 'rgb(36, 55, 70)',
  },
  toolBar: {
    minHeight: 45,
    justifyContent: 'space-around',
  },
}

export default withStyles(BaseMenu)
