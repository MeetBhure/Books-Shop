import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import {commerce} from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import ProductView from './components/ProductView/ProductView';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import axios from "axios";



  const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [booksLength, setBooksLength] = useState(5);
    const [booksStart, setBooksStart] = useState(0);
    const [token, setToken] = useState("");
  // const [cart, setCart] = useState([]);
  
    const fetchProducts = async () => {
      fetch(
        `http://localhost:5000/books/get?count=${booksLength}&start=${booksStart}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data));
      const { data } = await commerce.products.list();
  
      // setProducts(data);
    };

    const fetchNextUsers = (startCount) => {
      console.log("in the fetch")
      setBooksStart((prev) => prev + 10)
        axios
          .get(
            `http://localhost:5000/books/get?count=${booksLength}&start=${startCount}`
          )
          .then((response) => {
            console.log("response", response.data);
            setProducts((prev) => prev.concat(response.data));
          })
    };
  
    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    };
  
    const handleAddToCart = async (productId, quantity) => {
      // const item = await commerce.cart.add(productId, quantity);
      const response = await products.filter((key) => key._id == productId)[0];
      // console.log(cart)
      cartItems.push(response)
      // setCart(cart.push(response));
      // setCart([...cart, response]); 
      console.log("cart " , cartItems , response )
    };
  
    const handleUpdateCartQty = async (lineItemId, quantity) => {
      const response = await commerce.cart.update(lineItemId, { quantity });
  
      setCart(response.cart);
    };
  
    const handleRemoveFromCart = async (lineItemId) => {
      const filterCart = cartItems.filter(item => item._id !== lineItemId );
      setCartItems(filterCart)
    };

    const removeElement = (el) => {
      return el.value === '14' 
    }
  
    const handleEmptyCart = async () => {
      setCartItems([])
    };
  
    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
  
      setCart(newCart);
    };
  
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
  
        setOrder(incomingOrder);
  
        refreshCart();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };
  
    useEffect(() => {
      fetchProducts();
      fetchCart();
    }, []);
  
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const getToken = window.localStorage.getItem("token");
  
    return (
      <div>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={cartItems.length} handleDrawerToggle={handleDrawerToggle} />
          <Switch>
            <Route exact path="/">
              {getToken == "" || getToken == null ? <Login setToken={setToken}/> : <Products fetchNextUsers={fetchNextUsers}products={products} onAddToCart={handleAddToCart} setProducts={setProducts} handleUpdateCartQty /> }
            </Route>
            <Route exact path="/cart">
              <Cart setCartItems={setCartItems} cart={cartItems} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
            </Route>
            <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
            </Route>
            <Route path="/product-view/:id" exact>
              <ProductView products={products} />
            </Route>
            <Route path="/login" exact>
              <Login setToken={setToken}/>
            </Route>
            <Route path="/register" exact>
              <Register setToken={setToken} />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
      </div>
    );
  };
  
  export default App;
  