import React from "react";

const Contact = () => {

    const handleSubmit = () => {
        console.log("Pressed")
    }

    return (
        <main className="contactContainerMain">
            <section className="contactAboutContainer">
                <div className="contactAboutHeading">
                    <br></br>
                    <h2>About Our Company</h2>
                    <hr></hr>
                </div>
                <div className="contactAboutContentAbout">
                    <br></br>
                    <h4>
                        Established in 2023, [Company Name] is the brainchild of four dedicated individuals united by a shared love for flowers and a vision for positive change in the floral industry. Our journey began with the simple goal of creating beautiful arrangements, but it quickly evolved into a mission to redefine the standards of floristry.
                    </h4>
                    <h4>
                        Rooted in ethical sourcing and environmental responsibility, [Company Name] strives to go beyond the ordinary in delivering floral experiences. Our commitment extends to more than just aesthetics – each arrangement is a testament to our dedication to ethical business practices, sustainability, and a profound respect for the natural world.
                    </h4>
                    <h4>
                        At [Company Name], we believe in offering more than just flowers; we aim to provide a symbol of elegance, conscientiousness, and joy. As industry leaders, we are setting new benchmarks for ethical sourcing, ensuring that your choices contribute to a sustainable and environmentally conscious future.
                    </h4>
                    <h4>
                        Join us on this journey, and let [Company Name] be your preferred destination for exquisite floral arrangements that not only captivate with their beauty but also align with your values. Thank you for choosing [Company Name] – where sophistication meets ethical responsibility, creating memorable moments one bloom at a time.
                    </h4>
                    <br></br>
                </div>
                <hr></hr>
                <div className="contactAboutHeading">
                    <h2>Our Mission</h2>
                    <hr></hr>
                </div>
                <br></br>
                <div className="contactAboutContentMission">
                    <div className="textContainer">
                        <h4>
                            At [Your Company Name], we're not just about flowers; we're committed to making a positive impact. Through volunteer actions, we actively contribute to our local communities. Our workshops focus on gardening, sustainability, and environmental friendliness, offering hands-on experiences and knowledge-sharing. Join us in cultivating a community that shares our passion for nature, beauty, and sustainability.
                        </h4>
                    </div>
                    <div className="imgContainer">
                        <img src="/public/navyflowerpng.png"></img>
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <div className="contactAboutHeading">
                    <h2>Get In Touch</h2>
                    <hr></hr>
                </div>
                <div className="contactAboutContentContact">
                    <br></br>
                </div>
            </section>
            <section className="contactContactContainer">
                <div className="contactFormContainer">
                    <form onSubmit={handleSubmit}>
                        <h3>Contact Us</h3>
                        <div>
                            <input
                            className="inputInfo"
                            placeholder="Name"
                            />
                        </div>
                        <div>
                            <input
                            className="inputInfo"
                            placeholder="Email"
                            />
                        </div>
                        <button className="contactButton" type="submit">Submit</button>
                    </form>
                </div>
                <hr></hr>
            </section>
            <div className="CONTACTemptySpace"></div>
        </main>
    )

}

export default Contact