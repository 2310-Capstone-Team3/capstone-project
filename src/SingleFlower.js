import { useParams, Link } from "react-router-dom";
import Reviews from "./Reviews";

const SingleFlower = ({flowers}) => {
    const params = useParams()
    const id = params.id*1

    
    const flower = flowers.find ((flower)=> {
        return flower.id === id
    }) 

if (!flower) {
    return null
}
    
    return (
        <div>
            <h1> {flower.name} </h1>
            <h2> {flower.price}</h2>
            <h2> {flower.origin}</h2>
            <h2> {flower.type}</h2>
            <h2> {flower.species}</h2>
            <h4> {flower.description}</h4>

            <div className="reviews">
        <Reviews reviews={reviews} />
    </div>
            <hr/>

            <Link to='/Flowers'>
            Return to flowers.
            </Link>


            
        </div>
    );
};

export default SingleFlower