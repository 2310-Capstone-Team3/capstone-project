import React, {useState} from "react";


const Reviews = ({
    reviews,
    createReviews,
    fetchReviews,

}) => {

    const [name, setName] = useState('')
    const [review, setReview] = useState('')


    const submitReview = (e) => {
            e.preventDefault()
            console.log('yippee')
    }

        return (

            <div>
            <div className='review'> 

            <h1>We'd love to hear from you!</h1>
                <form onSubmit={submitReview}>
                    <div className='nameBox'>
                    <label>
                        Name:
                            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </label></div>
                    <div className='reviewBox'>
                    <label>
                        Review:
                        <input type="text" value={review} onChange={(e) => {setReview(e.target.value)}}/>
                    </label></div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            

            <div className='reviewPost'>
                <h1> Reviews:</h1>
                <ul>
                    {/* i think it needs to be find not map ?? compare to order page!!77 */}
                    {reviews.map( review => {
                        const cartItem = cartItems.find(lineItem => lineItem.review_id === review.id);
                        return ( <li key={review.id}>
                    {review.name}
                    <br/>
                    {review.body}
                
                   </li>
                   );
                    })
                    }
                  
                </ul>

            </div>
            </div>
        )


}

export default Reviews 