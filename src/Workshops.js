import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Workshops = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
}) => {

  const [workshops, setWorkshops] = useState([])


  useEffect(() => {
    const fetchProducts = () => {
      const filteredWorkshops = products.filter(product => product.product_type === 'workshop');
  
      setWorkshops(prevWorkshops => [...prevWorkshops, ...filteredWorkshops]);
    };
  
    fetchProducts();
  }, [products]);

  const displayProducts = (type) => {
    let productsToDisplay;

    switch (type) {
      case 'workshops':
        productsToDisplay = workshops;
        break;
      default:
        return null;
    }
    return (
    <div className="productDisplay">
      {productsToDisplay.map((product) => (
        <div className="product" key={product.id}>
          <NavLink style={{padding: "0"}} to={`/products/${product.id}`}>
          <img src={product.product_image_path}></img>
          <h5>{product.name}</h5>
          </NavLink>
        </div>
      ))}
    </div>
  );
  };

  return (
    <main className="productContainerMain">
        <br></br>
        <h2>Our Workshops:</h2>
        <br></br>
        {displayProducts("workshops")}
    </main>
  );
};

export default Workshops;