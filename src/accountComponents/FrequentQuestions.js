import React from "react";

const handleSubmit = () => {
    console.log("pressed")
}

const FrequentQuestions = () => {
    return (
        <main className="frequentQuestionsMain">
            <div  className="frequentQuestionsContainer">
                <div className="frequentQuestionsTextContainer">
                    <br></br>
                    <h2 className="frequentQuestionsTitle">Frequent Questions</h2>
                    <br></br>
                    <br></br>
                    <div className="frequentQuestionsContentContainer">
                        <div className="frequentQuestion">
                            <span className="frequentQuestionTitle">Question</span>
                            <br></br>
                            <span>What is the proper maintenance routine for my flowers?</span>
                            <br />
                            <span className="frequentQuestionContent">Answer</span>
                            <br />
                            <span>You want to clean your vase thoroughly, fill your vase with two-thirds of lukewarm water and add flower food. Make sure to remove any foliage that can possibly cause debris build-up. Keep yor flowers out of direct sunlight to prolong their life. Change your water regularly, flowers love clean water. Talk to your flowers and make sure to show them love.   </span>
                        </div>
                        <br></br>
                        <div className="frequentQuestion">
                            <span className="frequentQuestionTitle">Question</span>
                            <br></br>
                            <span className="frequentQuestionContent">Answer</span>
                        </div>
                        <br></br>
                        <div className="frequentQuestion">
                            <span className="frequentQuestionTitle">Question</span>
                            <br></br>
                            <span className="frequentQuestionContent">Answer</span>
                        </div>
                    </div>
                </div>
                <div className="frequentQuestionsFormContainer">
                    <div className="frequentQuestionsForm">
                        <form onSubmit={handleSubmit}>
                            <h3>Ask A Question</h3>
                            <hr></hr>
                            <br></br>
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
                            <div>
                                <textarea
                                className="inputContent"
                                placeholder="Question"
                                />
                            </div>
                            <button className="formButton" type="submit">Submit</button>
                            <hr></hr>
                        </form>
                    </div>
                </div>
            </div>
            <div className="FAQemptySpace"></div>
        </main>
    )
}

export default FrequentQuestions