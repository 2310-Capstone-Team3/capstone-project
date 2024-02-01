
import React, {useState} from "react";


const SubmitReview = (reviews, newReview, sendSubmission) => {

        const [nameAdd, setNameAdd] = useState('')
        const [bodyAdd, setBodyAdd] = useState('')

const submitHandler = (e) =>{
    e.preventDefault()        
   

    const review = {
        name : nameAdd,
        body : bodyAdd,
    }
    // console.log(review)
    sendSubmission(review)


}


        return (

            <div>
            <div className='review'> 

                <form onSubmit={submitHandler}>
                    <div className='nameBox'>
                    <label>Name:</label>

                   
                            <input type="text" value={nameAdd} onChange={(e) => {setNameAdd(e.target.value)}}/>
                    

                
                            
                  </div>
                    <div className='reviewBox'>
                    <label>Review:</label>
                        
                    
                            <input type="text" value={bodyAdd} onChange={(e) => {setBodyAdd(e.target.value)}}/>
                    <br/>
                                                </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            

    
            </div>
        )

        };





//   { reviews.map(review) => {
//     return(
//         <div>
        
//              <h1>We'd love to hear from you!</h1>
//                 <div className='reviewBox'>
//                 <form onSubmit={submitHandler}>{  
//                  <><div><label>
//                         <input type="text" value={nameAdd} onChange={(e) => { setNameAdd(e.target.value); } } />
                      

                  
//                     </label></div><div> <label>
//                         Review:
//                         <input type="text" value={bodyAdd} onChange={(e) => { setBodyAdd(e.target.value); } } />
//                     </label></div></>};

//                     );

                    
//             </form> 
//             <button type="submit">Submit</button>
//         </div></div>}}
//     )








// const Submit = ({
//     reviews,

// }) => {

//     const [name, setName] = useState('')
//     const [body, setBody] = useState('')


//     const submitReview = (e) => {
//             e.preventDefault()


    



    
export default SubmitReview