import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from '../../assets/circles.png';

const Footer = () => {
  return (
    <MDBFooter color="unique-color-dark" className="font-small pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="4" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
               <strong>Book Store</strong>              
            </h6>
            <p>
              It is an online React web application where the customer can purchase books online.
             Through this book store the users can search for a book by its title and purchase it. 
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />

          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold"><strong>Contact</strong></h6>
            <p>
              <i className="fa fa-envelope mr-3" /> meetbhure286@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> +91 8200077172
            </p>
          </MDBCol>
        </MDBRow>
        <hr />
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;