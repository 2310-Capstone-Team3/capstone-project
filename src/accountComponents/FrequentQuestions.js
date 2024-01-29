import React from "react";

const handleSubmit = () => {
  console.log("pressed");
};

const FrequentQuestions = () => {
  return (
    <main className="frequentQuestionsMain">
      <div className="frequentQuestionsContainer">
        <div className="frequentQuestionsTextContainer">
          <br></br>
          <h2 className="frequentQuestionsTitle">Frequent Questions</h2>
          <br></br>
          <br></br>
          <div className="frequentQuestionsContentContainer">
            <div className="frequentQuestion">
              <span className="frequentQuestionTitle">Question</span>
              <br></br>
              <span className="frequentQuestionContent">
                What is the proper maintenance routine for my flowers?
              </span>
              <br />
              <span className="frequentQuestionContent">Answer</span>
              <br />
              <span className="frequentQuestionContent">
                You want to clean your vase thoroughly, fill your vase with
                two-thirds of lukewarm water and add flower food. Make sure to
                remove any foliage that can possibly cause debris build-up. Keep
                your flowers out of direct sunlight to prolong their life. Make
                sure to prune off dead or wilted leaves in order to not cause
                mold in water. Change your water regularly, flowers love clean
                water. Talk to your flowers and make sure to show them love!
              </span>
            </div>
            <br></br>
            <div className="frequentQuestion">
              <span className="frequentQuestionTitle">Question</span>
              <br></br>
              <span className="frequentQuestionContent">
                What services does your company offer?
              </span>
              <br />
              <span className="frequentQuestionContent">Answer</span>
              <br />
              <span className="frequentQuestionContent">
                At the Bloom Room we offer more than just flowers; we aim to
                create memories that will last a life time. We offer educational
                workshops that help with the knowledge of flowers. Whether you
                want to know the sustainability of a flower, how to properly
                landscape design your garden, or you simply wanna learn how to
                make an arrangement, the Bloom Room can accomplish it. We also
                offer floral installation services for weddings, birthdays,
                corporate events or maybe you just want your house to look like
                a flower-land; we can help achieve it.
              </span>
            </div>
            <br></br>
            <div className="frequentQuestion">
              <span className="frequentQuestionTitle">Question</span>
              <br></br>
              <span className="frequentQuestionContent">
                Where are your workshops located?
              </span>
              <br />
              <span className="frequentQuestionContent">Answer</span>
              <br />
              <span className="frequentQuestionContent">
                We offer two learning options for our workshops. We have
                on-line, self-paced learning, as well as, in-store. The in-store
                workshops will take place at our ATLANTA or MICHIGAN locations.
              </span>
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
                <input className="inputInfo" placeholder="Name" />
              </div>
              <div>
                <input className="inputInfo" placeholder="Email" />
              </div>
              <div>
                <textarea className="inputContent" placeholder="Question" />
              </div>
              <button className="formButton" type="submit">
                Submit
              </button>
              <hr></hr>
            </form>
          </div>
        </div>
      </div>
      <div className="FAQemptySpace"></div>
    </main>
  );
};

export default FrequentQuestions;
