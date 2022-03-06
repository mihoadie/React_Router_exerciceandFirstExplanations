import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  // console.log(params.productID); // because in App we declared <Route path="/product-details/:productID"> but we could add as much parameters /:   as we want in the app.js, it will be detected in params with the associated key

  return (
    <section>
      <h1>ProductDetails</h1>
      <p>{params.productID}</p>
    </section>
  );
};

export default ProductDetails;
