import React from 'react'; 
import {Link} from 'react-router-dom'; 

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import footerAdornment from '../../assets/Footer Adornment.svg'; 
import facebook from '../../assets/facebook.svg'; 
import twitter from '../../assets/twitter.svg'; 
import instagram from '../../assets/instagram.svg'; 


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue, 
    width: '100%', 
    zIndex: 1302, 
    position: 'relative'
  }, 
  adornment: {
    width: '25em', 
    verticalAlign: "bottom", 
    [theme.breakpoints.down('md')]: {
      width: '21em'
    }, 
    [theme.breakpoints.down('xs')]: {
      width: '15em'
    }
  }, 
  mainContainer: {
    position: 'absolute'
  }, 
  gridItem: {
    margin: '3em'
  },
  link: {
    color: 'white', 
    fontFamily: 'Arial', 
    fontSize: '.75rem', 
    fontWeight: "bold", 
    textDecoration: 'none'
  }, 
  socialContainer: {
    position: 'absolute', 
    marginTop: '-6em', 
    right: '1.5em', 
    left: 'auto', 
    [theme.breakpoints.down('xs')]: {
      right: '.6em'
    }
  },
  icon: {
    height: '4em',
    width: '4em', 
    [theme.breakpoints.down('xs')]: {
      width: '2.5em',
      height: '2.5em'
    }
  }
}))

const Footer = props => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container justify='center' className={classes.mainContainer}>

          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link} component={Link} to='/' onClick={()=> props.setValue(0)}>
                Home
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid 
                item 
                className={classes.link} 
                component={Link} to='/services' 
                onClick={()=> {props.setValue(1); props.setselectedIndex(0)}}
              >
                Services
              </Grid>
              <Grid 
                item 
                className={classes.link} 
                component={Link} to='/customsoftware' 
                onClick={()=> {props.setValue(1); props.setselectedIndex(1)}}
              >
                Custom Software Development
              </Grid>
              <Grid 
                item 
                className={classes.link} 
                component={Link} to='/mobileapps' 
                onClick={()=> {props.setValue(1); props.setselectedIndex(2)}}
              >
                Mobile App Development
              </Grid>
              <Grid 
                item 
                className={classes.link} 
                component={Link} to='/websites' 
                onClick={()=> {props.setValue(1); props.setselectedIndex(3)}}
              >
                Website Development
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link} component={Link} to='/revolution' onClick={()=> props.setValue(2)}>
                The Revolution
              </Grid>
              <Grid item className={classes.link} component={Link} to='/revolution' onClick={()=> props.setValue(2)}>
                Vision
              </Grid>
              <Grid item className={classes.link} component={Link} to='/revolution' onClick={()=> props.setValue(2)}>
                Technology
              </Grid>
              <Grid item className={classes.link}component={Link} to='/revolution' onClick={()=> props.setValue(2)}>
                Process
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link} component={Link} to='/about' onClick={()=> props.setValue(3)}>
                About Us
              </Grid>
              <Grid item className={classes.link} component={Link} to='/about' onClick={()=> props.setValue(3)}>
                History
              </Grid>  
              <Grid item className={classes.link} component={Link} to='/about' onClick={()=> props.setValue(3)}>
                Team
              </Grid>      
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.link} component={Link} to='/contact' onClick={()=> props.setValue(4)}>
                Contact Us
              </Grid>   
            </Grid>
          </Grid>

        </Grid>
      </Hidden>
      
      <img src={footerAdornment} alt="black decorative slash" className={classes.adornment}/>

      <Grid container justify="flex-end" spacing={2} className={classes.socialContainer}>
        <Grid item component={'a'} href="http://www.facebook.com" rel="noopener noreferrer" target="_blank">
          <img src={facebook} alt="facebook logo" className={classes.icon}/>
        </Grid>
        <Grid item component={'a'} href="http://www.twitter.com" rel="noopener noreferrer" target="_blank">
          <img src={twitter} alt="twitter logo" className={classes.icon}/>
        </Grid>
        <Grid item component={'a'} href="http://www.instagram.com" rel="noopener noreferrer" target="_blank">
          <img src={instagram} alt="instagram logo" className={classes.icon}/>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer; 
