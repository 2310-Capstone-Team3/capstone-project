import React, {useState} from "react";


const Reviews = ({reviews}) => {

        return (
            <div>


                  <div className='posts'>
                 <div className='reviewTitle'>
                <h1>Reviews</h1>
                 </div>
                <ul>
                    {
                        reviews.map((review) =>{
                            return (
                                <li key={review.id}>
                                    <br/>
                                        <h2>{review.name}</h2>
                                        <br/>
                                        {review.body}
                            </li>
                            ) }
                             )

                    }
                </ul></div>



             
            {/* <div className="reviewList">
    
                  
                        </div> </div>
                    
                        <div className='review'> 

                        <h1>We'd love to hear from you!</h1>
                        <form >
                        <div className='nameBox'>
                            <label>
                                Name:
                        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        </label></div>
                        <div className='reviewBox'>
                            <label>
                                Review:
                        <input type="text" value={body} onChange={(e) => {setBody(e.target.value)}}/>
                        </label></div>
                        <button type="submit">Submit</button>
                                </form>
                                    </div> */}

                        </div>



        );
        };
export default Reviews;