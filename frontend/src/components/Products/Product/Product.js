import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button,CardActionArea} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
    console.log("in the" ,product)
    return (
        <Card className={classes.root}>
        <Link to={`product-view/${product._id}`} >
        <CardActionArea>
        <CardMedia className={classes.media} image={product?.image} title={product.name} style={{backgroundSize: 'contain'}}  />
        </CardActionArea>
        </Link>
        <CardContent>
          <div className={classes.cardContent} style={{display: 'block'}}>
            <Typography  variant="h6">
            {product.title}
            </Typography>
            <Typography variant="h6" color="secondary">
              ₹<b>{product.price.data[0]}</b> 
            </Typography>
            <Typography variant="h6" color="secondary">
              Written By<b>{product.writer}</b> 
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button variant="contained" className={classes.button} endIcon={<AddShoppingCart />} onClick={() => onAddToCart(product._id, 1)} >
            <b>ADD TO CART</b>
          </Button>
        </CardActions>
        </Card>
    )
}

export default Product;