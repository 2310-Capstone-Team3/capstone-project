import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
    
    const SearchBar = ({products}) => {
    const [searchParams, setSearchParams] = useSearchParams({})
    const filteredParams = products.filter((product) => {
        let lowerCaseProduct = product.name.toLowerCase()
        return !searchParams.get('search') || lowerCaseProduct.indexOf(searchParams.get('search')) !== -1 })
    return (
        <div className="searchBar">
            <input placeholder='Search Products' value={searchParams.get('search') || ''} onChange={(ev)=> {setSearchParams(ev.target.value.toLowerCase() ? {search: ev.target.value.toLowerCase()} : {})}} />
                { 
                filteredParams.length > 0 ?
                searchParams.get('search') != undefined ?
                filteredParams.map((product) => {
                    return (
                        <div className="filter-list">
                                <h5>Viewing {filteredParams.length} Products</h5>
                                <ul style={{padding:'0'}}>
                                <div className="searchProduct" key={product.id}>
                                    <NavLink style={{padding: "0"}} to={`/products/${product.id}`}>
                                    <img src={product.product_image_path}></img>
                                    <h5>{product.name}</h5>
                                    </NavLink>
                                </div>
                            </ul>
                            </div>
                            )
                    })
                    : null
            
                    : null
                    }
                    </div>
    )
}
                
export default SearchBar;

     {/* <input placeholder="Search Products" value={searchTerm} onChange={(ev) => {setSearchTerm(ev.target.value.toLowerCase())}} /> */}