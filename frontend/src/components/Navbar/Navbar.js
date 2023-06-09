import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography, Button} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logo from '../../assets/circles.png';
import useStyles from './styles';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const handleLogout = () => {
      localStorage.clear() ;
      history.push("/login");
    }
    
    return (
        <div>
         <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h5" className={classes.title} color="inherit"> 
              <strong >Book Store</strong> 
          </Typography>
            <div className={classes.grow} />
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            {location.pathname === '/' && (
            <div className={classes.button}>
                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
            
        </div>
    )
}

export default Navbar
