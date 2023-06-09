import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item.image} alt={item.title} className={classes.media} style={{backgroundSize: 'contain'}} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="h6" color='secondary' >{item?.price?.data[0]}</Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
