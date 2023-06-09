import React, { useState, useEffect } from "react";
import { Grid, InputAdornment, Input, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InfinitScroll from "react-infinite-scroll-component";
import '../../app.css'

const Products = ({ products, onAddToCart, setProducts, fetchNextUsers }) => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [booksLength, setBooksLength] = useState(10);
  const [booksStart, setBooksStart] = useState(0);
  const [cart, setCart] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  console.log("latest books", books);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <div className={classes.searchs}>
        <Input
          className={classes.searchb}
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>

      {console.log("products" , products )}
        <InfinitScroll
          dataLength={books.length}
          next={() => fetchNextUsers(books.length + 5)}
          hasMore={true}
          loader={<h4>Loading ... </h4>}
          className="infinite-scroll"
        >
          {products
            .filter((product) => {
              if (searchTerm === "") {
                return product;
              } else if (
                product.title
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} id="pro" className="single-book">
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
        </InfinitScroll>
      {/* </Grid> */}
    </main>
  );
};

export default Products;
