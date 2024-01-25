import React from "react";

const Workshops = ({workshops}) =>{

       
            <div>
              <h1>Workshop Details!</h1>
                <ul>{ 
                workshops.map((workshop) =>{
                    return (
                        <li key={workshop.id}>
                           <Link to ={`/workshops/${workshop.id}`}>
                           {workshop.name}
                            </Link> 
                              <h3>{workshop.price}</h3>
                              <h4>{workshop.duration}</h4>


                              <button className="details">
                            <Link to ={`/workshops/${workshop.id}`}>Click For Details!</Link>
                            </button>
                        </li>
                        
                            
                    )
                })
                }
  </ul>
</div>
};

export default Workshops;

module.exports = {
  fetchWorkshops,
  createWorkshops,}