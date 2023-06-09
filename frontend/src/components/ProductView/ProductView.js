import React from 'react'
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {commerce} from '../../lib/commerce';
import { useState, useEffect } from "react";
import './style.css'

const createMarkup = (text) => {
    return { __html: text };
  };

const ProductView = ({products}) => {

    const [product, setProduct] = useState({});
    const [response, setResponse] = useState({});
  console.log("in the " , products)
    const fetchProduct = async (id) => {
        // const response = await commerce.products.retrieve(id);
        const response = await products.filter((key) => key._id == id)[0];
        console.log("qq", response );
        setResponse(response)
        const { title,
          writer,
          image,
          tag } =  response;
        setProduct({
          title,
            writer,
            image,
            tag
        });
      };

      useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchProduct(id[2]);
      }, []);

    return (
        <Container className="product-view">
          <Grid container>
            <Grid item xs={12} md={6} className="image-wrapper">
              {console.log("filter product" , product)}
              <img src={product?.image} alt={product?.title}
              />
            </Grid>
            <Grid item xs={12} md={5} className="text">
              <Typography variant="h2"><b>{product.title}</b></Typography>
              <hr />
              <Typography variant="p" dangerouslySetInnerHTML={createMarkup(product?.tag)} />
              <Typography variant="h3" color="secondary" >Price: <b> {response?.price?.data[0]} </b> </Typography>
              <br/>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Button size="large" className="custom-button" component={Link} to='/' >
                     Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      );
    };
    
    export default ProductView;
