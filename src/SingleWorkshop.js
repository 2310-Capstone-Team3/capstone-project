import { useParams, Link } from "react-router-dom";
import Reviews from './Reviews';

const SingleWorkshop = ({workshops}) => {
    const params = useParams()
    const id = params.id*1

    
    const workshop = workshops.find ((workshop)=> {
        return workshop.id === id
    }) 

if (!workshop) {
    return null
}
    
    return (
        <div>
            <h1> {workshop.name} </h1>
            <h2> {workshop.price}</h2>
            <h2> {workshop.duration}</h2>
            <h4> {workshop.description}</h4>


            <div className="reviews">
        <Reviews reviews={reviews} />
    </div>
            <hr/>

            <Link to='/Flowers'>
            Return to flowers.
            </Link>

            
        </div>
    )
}

export default SingleWorkshop