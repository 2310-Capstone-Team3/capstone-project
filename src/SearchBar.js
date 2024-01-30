import React from "react";
     import { useState } from "react";
     import { Link } from "react-router-dom";
    const SearchBar = ({products}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredTerms = products.filter((product) => {
        let lowerCaseProduct = product.name.toLowerCase()
        return lowerCaseProduct.indexOf(searchTerm) !== -1

    })
    return(
        <div className="searchBar">

            <label>
                <input placeholder="Search Products" value={searchTerm} onChange={(ev) => {setSearchTerm(ev.target.value.toLowerCase())}} />
            </label>
            {
             searchTerm.length > 0 ? 
                <div className="filter-list"> 
                    <h5>Viewing {filteredTerms.length} of {products.length} Products</h5>
                    <ul>
                        {
                          filteredTerms.map((product) => {
                            return <li key={product.id}> 
                           
                            <Link to={`/products`}>
                                {product.name}
 
                            </Link>
                            
                          
                                </li>


                            })
                        }
                       </ul>
            
                      </div>
                    : null
                    }
                   </div>
                   ) 
                   }
export default SearchBar;