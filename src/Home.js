import React from "react";



const Home = () => {

    return(
        <div>

            <section className='header'>
            <h1>filler.</h1>
            <h2>create, learn, start.</h2>
            </section>
<hr></hr>
            <section>
                <div className='homebody'>

                <img src="./assets/photo1.webp" alt="Photo of woman coding."/>

            <h3>No matter if you have a job or kids at home, it's never too late to learn.</h3>
            <h4>We know you have your own life. That's why we offer course options to best fit with you!</h4>
            
            
            <h4>Check out which course works best for you!   </h4> 

            <div className='b1'>
            <button onclick="/products'" type="button">Course 1</button>            
            </div>

            <div className='b2'>
            <button onclick="/products'" type="button">Course 2</button>            
            </div>

            <div className='b3'>
            <button onclick="/products'" type="button">Course 3</button>            
            </div>

            <div className='b4'>
            <button onclick="/products'" type="button">Course 4</button>            
            </div>


            </div>
            </section>

            <hr></hr>

            <div className='why'>
                <h4>Why us?</h4>
                    <p>Our company started as a small study group, all fresh out of different paths. We had new students and old, people trying to start a new career or have a new hobby. We all had one goal in common, though: coding. Through working together, we learned how important teamwork and collaboration is.
                        Community is most important to us. It takes a village, right? Our goal here is to make sure everyone has such a supportive and insightful experience as we do!
                        </p>

                        <img src="./assets/photo2.png" alt="Photo of coding class."/>


            </div>

            <hr></hr>
            <section><div className='enroll'> 
         
                <button onclick="/products'" type="button">Enroll Today!</button>            

                    </div>

            </section>


       </div> 
       
    );
};

export default Home;