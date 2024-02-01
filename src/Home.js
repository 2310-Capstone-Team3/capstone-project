import React from "react";
import { NavLink } from 'react-router-dom'

const Home = () => {

    return(
        <main className="homeContainer">
            <div className="homeBody">
                <img src="/public/flowerBannerHome.jpeg"></img>
            </div>
            <section className="homeMainSection">
                <br></br>
                <h1>Some of our favorites</h1>
                <br></br>
                <div className="catalogPreview">
                    <section className="catalogProduct">
                        <span className="productContainer">
                                <img src="/public/productImages/anthuriums.webp" alt="ProductImage"></img>
                            <NavLink style={{alignSelf: "center"}} className='ProductLink' to='/products'> 
                                Explore This Product
                            </NavLink>     
                        </span>  
                    </section>
                    <section className="catalogProduct">
                        <span className="productContainer">
                            <img src="/public/productImages/orchid.png" alt="ProductImage"></img>
                            <NavLink style={{alignSelf: "center"}} className='ProductLink' to='/products'>
                                Explore This Product
                            </NavLink>
                        </span>
                    </section>
                    <section className="catalogProduct">
                        <span className="productContainer">
                            <img src="/public/productImages/lotuses.png" alt="ProductImage"></img>
                            <NavLink style={{alignSelf: "center"}} className='ProductLink' to='/products'>
                                Explore This Product
                            </NavLink>     
                        </span>         
                    </section>
                    <br></br>
                    <br></br>
                </div>
                    <div className="HOMEemptySpace"></div>
                    <div className="ReviewTitleBox">
                        <h1 className="ReviewTitle">Read Our Reviews</h1>
                    </div>
            </section> 
                <section className="homeReviewsContainer">
                    <div className="homeReviews">
                    <span className="reviewPreview">
                        <img src="/public/5starpng.png" alt="5 stars"></img>
                        <h3>Exquisite Orchids!</h3>
                        <h5>The orchids I ordered were stunning! The vibrant colors and delicate petals exceeded my expectations. Highly recommended!</h5>
                        <span className="customerDetails">
                            <h5>FloralEnthusiast123</h5>
                            <h5>January 31, 2024</h5>
                        </span>
                        </span>
                        <span className="reviewPreview">
                            <img src="/public/5starpng.png" alt="5 stars"></img>
                            <h3>Ravishing Roses</h3>
                            <h5>I purchased a bouquet of roses for a special occasion, and they were absolutely breathtaking. A delightful purchase!</h5>
                            <span className="customerDetails">
                                <h5>RoseLover567</h5>
                                <h5>January 31, 2024</h5>
                            </span>
                        </span>
                        <span className="reviewPreview">
                            <img src="/public/5starpng.png" alt="5 stars"></img>
                            <h3>Birds of Paradise Elegance</h3>
                            <h5>The birds of paradise arrangement I received was incredible. The vibrant colors added a touch of tropical paradise to my home.</h5>
                            <span className="customerDetails">
                                <h5>TropicalOasis89</h5>
                                <h5>January 31, 2024</h5>
                            </span>
                        </span>
                    </div>
                </section>
                <section className="homeAbout">
                    <div className="AboutContentContainer">
                        <span className="AboutText">
                        <h2 className="AboutContent">Our Mission</h2>
                        <h4 className="AboutContent">Established in 2023, Bloom Room is proud to champion environmental responsibility and ethical sourcing in the floral industry. Our commitment to a sustainable future is woven into the fabric of every bouquet. Since our inception, we've been on a mission to eliminate fossil-based single-use plastics from our packaging, contributing to a cleaner and greener planet.</h4>
                        <h4 className="AboutContent">But our journey doesn't stop with plastic reduction. At Bloom Room, we've embraced pesticide-free growing practices, ensuring that our blooms not only captivate with their beauty but also promote a healthier ecosystem. By avoiding harmful chemicals, we're fostering a floral experience that aligns with nature's harmony. As leaders in ethical floral commerce, we've set our sights on a future where conscious choices and the joy of flowers seamlessly coalesce, creating a bloom-filled world we can all be proud of.</h4>
                        <NavLink to='/contact' className="AboutLink">Learn More</NavLink>
                        </span>
                    </div>
                </section>
                {/* <section className="FooterNavContainer">
                    <div className="FooterNavContent">
                        <div className="FooterNavCompany">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>Company</h3>
                            <NavLink to='/' className="FooterNavTextLink">Home</NavLink>
                            <NavLink to='/contact' className="FooterNavTextLink">Contact</NavLink>
                            <NavLink to='/frequent-questions' className="FooterNavTextLink">FAQ Forum</NavLink>
                        </div>
                        <div className="FooterNavServices">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>Collection</h3>
                            <NavLink to='/' className="FooterNavTextLink">Products</NavLink>
                            <NavLink to='/contact' className="FooterNavTextLink">Services</NavLink>
                            <NavLink to='/frequent-questions' className="FooterNavTextLink">Information</NavLink>
                        </div>
                        <div className="FooterNavUser">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>User</h3>
                            <NavLink to='/login' className="FooterNavTextLink">Sign In</NavLink>
                            <NavLink to='/register' className="FooterNavTextLink">Register</NavLink>
                            <NavLink to='/account' className="FooterNavTextLink">Account</NavLink>
                        </div>
                        <NavLink className='FooterNavLink' to='/socials'>
                        <img src="/public/socials.webp" className="FooterNavImage"></img>
                        </NavLink>
                    </div>
                </section> */}
        </main>         
    );
};

export default Home;
