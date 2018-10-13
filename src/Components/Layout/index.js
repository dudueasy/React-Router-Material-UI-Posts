import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles, withTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import {Link, Route, withRouter, matchPath} from 'react-router-dom'
import {compose} from 'recompose'

const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%',
      // minHeight: '100%'
    }
  }
  ,
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100%'
  },
  appBar: {
    color: 'white',
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    color: '#fff',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },

  drawerPaperMDUp: {
    background: "black",
    height: '100%',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    minHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    nestedListOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  handleClick = () => {
    this.setState(state => ( {nestedListOpen: !state.nestedListOpen}));
  };


  render() {
    const {classes, theme, writersData, location: {pathname}} = this.props;

    const drawer = (
      <Fragment>
        <Hidden smDown>
          <div className={classes.toolbar}>
          </div>
        </Hidden>
        <MenuList>
          <MenuItem component={Link}
                    to='/'
          >
            Home
          </MenuItem>
          <MenuItem component={Link}
                    to='/writers'
                    onClick={this.handleClick}
          >
            Writers
          </MenuItem>


          <Collapse in={this.state.nestedListOpen} timeout="auto" unmountOnExit>
            <MenuList>
              {writersData.map(({id, name}) => (
                <MenuItem key={id}
                          component={Link}
                          className={classes.nested}
                          to={`/writers/${id}`}
                          selected={matchPath(pathname, `/writers/${id}`)}
                >

                  {name}
                </MenuItem>
              ))}
            </MenuList>

          </Collapse>
        </MenuList>
      </Fragment>
    );

    return (

      <Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" style={{color: 'white', fontWeight: 'bold'}} noWrap>
                Writers Blog
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
              style={{height: '100%'}}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>

            <div className={classes.toolbar}/>

            {this.props.children}
          </main>
        </div>
      </Fragment>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  writersData: PropTypes.array.isRequired,
};


export default compose(
  withRouter,
  withTheme(),
  withStyles(styles),
)
(
  ResponsiveDrawer
)
