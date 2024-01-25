import React from "react";
import { useState, useEffect } from "react";

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
}) => {
  const [flowers, setFlowers] = useState([])
  const [tools, setTools] = useState([])
  const [planters, setPlanters] = useState([])
  const [workshops, setWorkshops] = useState([])

  useEffect(() => {
    const fetchProducts = () => {
      const filteredFlowers = products.filter(product => product.product_type === 'flower');
      const filteredTools = products.filter(product => product.product_type === 'tool');
      const filteredPlanters = products.filter(product => product.product_type === 'planter');
      const filteredWorkshops = products.filter(product => product.product_type === 'workshop');
  
      setFlowers(prevFlowers => [...prevFlowers, ...filteredFlowers]);
      setTools(prevTools => [...prevTools, ...filteredTools]);
      setPlanters(prevPlanters => [...prevPlanters, ...filteredPlanters]);
      setWorkshops(prevWorkshops => [...prevWorkshops, ...filteredWorkshops]);
    };
  
    fetchProducts();
  }, [products]);

  const displayProducts = (type) => {
    let productsToDisplay;

    switch (type) {
      case 'flowers':
        productsToDisplay = flowers;
        break;
      case 'tools':
        productsToDisplay = tools;
        break;
      case 'planters':
        productsToDisplay = planters;
        break;
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
          <h5>{product.name}</h5>
        </div>
      ))}
    </div>
  );
  };

  return (
    <main className="productContainerMain">
        <br></br>
        <h2>Our Collection</h2>
        <br></br>
        <div className="filterNavBar">
        </div>
        <br></br>
        <br></br>
        {displayProducts("flowers")}
        {displayProducts("tools")}
        {displayProducts("planters")}
        {displayProducts("workshops")}
    </main>
  );
};

export default Products;


{/* <ul>
  {products.map((product) => {
    const cartItem = cartItems.find(
      (lineItem) => lineItem.product_id === product.id
    );
    return (
      <li key={product.id}>
        <div className="course">
          {product.name} (${product.price})
        </div>
        <br />
        {product.description}
        <br />
        {auth.id ? (
          cartItem ? (
            <button onClick={() => updateLineItem(cartItem)}>
              Add Another
            </button>
          ) : (
            <button onClick={() => createLineItem(product)}>Add</button>
          )
        ) : null}
      </li>
    );
  })}
</ul> */}
