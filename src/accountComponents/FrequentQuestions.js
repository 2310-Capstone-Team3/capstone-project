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
                            <span className="frequentQuestionContent">Answer</span>
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