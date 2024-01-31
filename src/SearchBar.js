     import React from "react";
     import { Link, useSearchParams } from "react-router-dom";
    
    const SearchBar = ({products}) => {
    const [searchParams, setSearchParams] = useSearchParams({})
    //console.log(searchParams.get('search'))
    const filteredParams = products.filter((product) => {
        let lowerCaseProduct = product.name.toLowerCase()
        return !searchParams.get('search') || lowerCaseProduct.indexOf(searchParams.get('search')) !== -1 })

    return (
        <div className="searchBar">

            <input placeholder='Search Products' value={searchParams.get('search') || ''} onChange={(ev)=> {setSearchParams(ev.target.value.toLowerCase() ? {search: ev.target.value.toLowerCase()} : {})}} />
        
                { 
                filteredParams.length > 0 ?
                <div className="filter-list">
              
               
                    <h5>Viewing {filteredParams.length} Products</h5>
                    <ul>
                    {
                            filteredParams.map((product) => {
                            return <li key={product.id}> 
                           
                            <Link to={`/products/${product.id}`}>
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

     {/* <input placeholder="Search Products" value={searchTerm} onChange={(ev) => {setSearchTerm(ev.target.value.toLowerCase())}} /> */}