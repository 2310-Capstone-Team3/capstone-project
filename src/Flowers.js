import React from "react";


const Flowers = ({flowers}) => {

    return(
        <div>

            <h1>Check out our Flowers: </h1>
            <div className="Flowers">
            <ul> { 
                flowers.map((flower) =>{
                    return (
                        <li key={flower.id}>
                           <Link to ={`/flowers/${flower.id}`}>
                           {flower.name}
                            </Link> 
                            <h2>{flower.price}</h2>
                            <h2> {flower.origin}</h2>
                            <h2> {flower.type}</h2>
                            <h2> {flower.species}</h2>
                            <h4> {flower.description}</h4>
                        
                            <button className="details">
                            <Link to ={`/flowers/${flower.id}`}>Click For Details!</Link>
                            </button>
                        
                        
                        </li>
                        
                            
                    )
                })
        
                    
                }

            </ul>
            </div>
        
        </div>
    );
};

export default Flowers;