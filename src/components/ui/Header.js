import React, { Fragment, useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import logo from '../../assets/logo.svg'; 

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  appbar: {
    zIndex: theme.zIndex.modal + 1
  },
  toolbarMargin: {
    ...theme.mixins.toolbar, 
    marginBottom: '3em', 
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    }, 
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }, 
  logo: {
    height: '8em', 
    [theme.breakpoints.down('md')]: {
      height: '7em'
    }, 
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  }, 
  logoContainer: {
    padding: 0, 
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  }, 
  tab: {
    ...theme.typography.tab, 
    minWidth: 10, 
    marginLeft: '25px'
  }, 
  button: {
    ...theme.typography.estimate, 
    borderRadius: '50px', 
    marginLeft: '50px', 
    marginRight: '25px', 
    height: '45px'
  }, 
  menu: {
    backgroundColor: theme.palette.common.blue, 
    color: 'white', 
    borderRadius: '0px'
  }, 
  menuItem: {
    ...theme.typography.tab, 
    opacity: 0.7, 
    '&:hover': {
      opacity: 1
    }
  }, 
  drawerIcon: {
    height: '50px', 
    width: '50px'
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }, 
  drawer: {
    backgroundColor: theme.palette.common.blue
  }, 
  drawerItem: {
    ...theme.typography.tab, 
    color: 'white', 
    opacity: 0.7,
  }, 
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  }, 
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  }
}))

const Header = () => {
  const classes = useStyles(); 
  const theme = useTheme(); 
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0); 

  const handleClick = (event) => {
    // console.log(event.currentTarget); 
    setAnchorEl(event.currentTarget); 
    setOpenMenu(true); 
  }

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null); 
    setOpenMenu(false); 
    setselectedIndex(index)
  }

  const handleClose = (event) => {
    setAnchorEl(null); 
    setOpenMenu(false); 
  }

  const menuOptions = [
    {name: "Services", link: "/services"}, 
    {name: "Custom Software Development", link: "/customsoftware"}, 
    {name: "Mobile App Development", link: "/mobileapps"}, 
    {name: "Website Development", link: "/websites"}
  ]

  const tabsOptions = [
    { link: "/", name: "Home" },
    { link: "/services", name: "Services"}, 
    { link: "/revolution", name: "The Revolution" }, 
    { link: "/about", name: "About Us" }, 
    { link: "/contact", name: "Contact Us" }
];

  useEffect(()=> {  
    const pathname = window.location.pathname;
    const valueIndex = tabsOptions.findIndex(option => option.link === pathname);
    const index = menuOptions.findIndex(option => option.link === pathname);
 
    if (pathname === '/estimate') {
      setValue(false)
    } else {
      setValue(valueIndex === -1 ? 1 : valueIndex);
    }
    setselectedIndex(index);

  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabs = (
    <Fragment>
      <Tabs 
        value={value} 
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        <Tab component={Link} to="/" className={classes.tab} label="Home"/>
        <Tab 
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          component={Link} 
          to="/services" 
          className={classes.tab} 
          label="Services"
          onMouseOver={event => handleClick(event)}
        />
        <Tab component={Link} to="/revolution" className={classes.tab} label="The Revolution"/>
        <Tab component={Link} to="/about" className={classes.tab} label="About Us"/>
        <Tab component={Link} to="/contact" className={classes.tab} label="Contact Us"/>
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={openMenu} 
        onClose={handleClose}
        MenuListProps={{onMouseLeave: handleClose}}
        classes={{paper: classes.menu}}
        elevation={0}
        keepMounted
        style={{zIndex: '1302'}}
      > 
        {menuOptions.map((menuItem, index) => {
          return (
            <MenuItem 
              key={menuItem.name}
              component={Link} 
              to={menuItem.link}
              onClick={(event) => {handleMenuItemClick(event, index); handleClose(); setValue(1)}}
              selected={index === selectedIndex && value === 1}
              classes={{root: classes.menuItem}}
            >
              {menuItem.name}
            </MenuItem>
            )
          })}
      </Menu>
    </Fragment>
  )

  const drawer = (
    <Fragment>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS} 
        open={openDrawer}
        onClose={()=> setOpenDrawer(false)}
        onOpen={()=> setOpenDrawer(true)}
        classes = {{paper: classes.drawer}}
      >
        <div className={classes.toolbarMargin}/>
        <List disablePadding>
          <ListItem 
            component={Link} 
            to="/" 
            divider 
            button
            onClick={() => {setOpenDrawer(false); setValue(0)}}
            selected={value === 0}
            classes={{selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              Home
            </ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to="/services" 
            divider 
            button 
            onClick={() => {setOpenDrawer(false); setValue(1)}}
            selected={value === 1}
            classes={{selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              Services
            </ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to="/revolution" 
            divider 
            button 
            onClick={() => {setOpenDrawer(false); setValue(2)}}
            selected={value === 2}
            classes={{selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              The Revolution
            </ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to="/about" 
            divider 
            button 
            onClick={() => {setOpenDrawer(false); setValue(3)}}
            selected={value === 3}
            classes={{selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              About Us
            </ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to="/contact" 
            divider 
            button 
            onClick={() => {setOpenDrawer(false); setValue(4)}}
            selected={value === 4}
            classes={{selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              Contact Us
            </ListItemText>
          </ListItem>

          <ListItem 
            component={Link} 
            to="/estimate" 
            button 
            onClick={() => {setOpenDrawer(false); setValue(5)}}
            className={classes.drawerItemEstimate}
            selected={value === 5}
            classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}}
          >
            <ListItemText 
              disableTypography 
              className={classes.drawerItem}
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton 
        onClick={() => setOpenDrawer(!openDrawer)} 
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </Fragment>
  )

        return (
          <Fragment>
            <ElevationScroll>
              <AppBar position="fixed" color="primary" className={classes.appbar}>
                <Toolbar disableGutters>
                  <Button 
                    component={Link} 
                    to="/" 
                    className={classes.logoContainer}
                    onClick={() => setValue(0)}
                    disableRipple
                  >
                    <img src={logo} className={classes.logo} alt="Company logo"/>   
                  </Button>
                  {matches ? drawer : tabs}
                </Toolbar>
              </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
    </Fragment>
  )
}

export default Header; 