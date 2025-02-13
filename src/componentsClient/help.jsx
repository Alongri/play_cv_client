import React, { useState } from "react";

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-5 pb-5">
      <h1 className="text-center mb-5">Q&A</h1>
      <div className="accordion" id="accordionExample">
        {/* שאלה 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={`accordion-button ${
                openIndex === 0 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(0)}
            >
              What is the purpose of creating a life story video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 0 ? "show" : ""
            }`}
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              The life story video allows you to introduce yourself in a more
              personal and dynamic way than a traditional resume. It focuses on
              your experiences, values, passions, and unique aspects of your
              personality, helping others get to know you beyond your
              professional qualifications. Whether for networking, personal
              projects, or self-expression, it's a great way to connect with
              others on a deeper level.
            </div>
          </div>
        </div>

        {/* שאלה 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={`accordion-button ${
                openIndex === 1 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(1)}
            >
              How do I start creating my life story video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 1 ? "show" : ""
            }`}
            aria-labelledby="headingTwo"
          >
            <div className="accordion-body">
              Simply sign up or log in to the platform, then click on "Create
              New Video." You'll be guided through a step-by-step process where
              you'll answer questions, upload media (like photos and videos),
              and customize your video to tell your story. You can include
              information about your personal journey, key life events, hobbies,
              or anything else that helps others understand who you are.{" "}
            </div>
          </div>
        </div>

        {/* שאלה 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className={`accordion-button ${
                openIndex === 2 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(2)}
            >
              Can I focus on specific aspects of my life in the video, such as
              personal achievements or passions?{" "}
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 2 ? "show" : ""
            }`}
            aria-labelledby="headingThree"
          >
            <div className="accordion-body">
              Absolutely! The beauty of the life story video is that it’s
              completely customizable. You can highlight the aspects of your
              life that matter most to you—whether it’s your family background,
              travel experiences, volunteer work, or personal milestones. The
              video is all about giving a holistic view of you as a person.{" "}
            </div>
          </div>
        </div>

        {/* שאלה 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className={`accordion-button ${
                openIndex === 3 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(3)}
            >
              Do I need any video editing skills to use this platform?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 3 ? "show" : ""
            }`}
            aria-labelledby="headingFour"
          >
            <div className="accordion-body">
              No, you don't need to be a video editing expert! The platform is
              designed to be user-friendly and intuitive. We provide templates,
              guided prompts, and built-in editing tools to help you create your
              video with ease. You can customize the video by adding text,
              music, and transitions without needing advanced skills.{" "}
            </div>
          </div>
        </div>
        {/* שאלה 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className={`accordion-button ${
                openIndex === 4 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(4)}
            >
              Can I include professional details in my life story video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 4 ? "show" : ""
            }`}
            aria-labelledby="headingFive"
          >
            <div className="accordion-body">
              While the focus of the video is on your personal journey, you can
              certainly include professional achievements, experiences, and
              skills if they are part of your life story. The goal is to present
              a well-rounded version of yourself, so feel free to touch on your
              career, education, or any other work-related topics in a way that
              aligns with your personal narrative{" "}
            </div>
          </div>
        </div>
        {/* שאלה 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className={`accordion-button ${
                openIndex === 5 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(5)}
            >
              Is there a time limit for the video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 5 ? "show" : ""
            }`}
            aria-labelledby="headingSix"
          >
            <div className="accordion-body">
              Yes, we recommend keeping your video between 3 to 5 minutes for
              optimal engagement. This gives you enough time to share key
              aspects of your life story without overwhelming your audience. You
              can adjust the length as needed depending on the content you want
              to include.{" "}
            </div>
          </div>
        </div>
        {/* שאלה 7 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button
              className={`accordion-button ${
                openIndex === 6 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(6)}
            >
              Can I update my video after it's published?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 6 ? "show" : ""
            }`}
            aria-labelledby="headingSeven"
          >
            <div className="accordion-body">
              Yes, you can make updates to your video at any time. Whether you
              want to add new life experiences, adjust content, or change the
              visuals, you have the flexibility to edit and republish your video
              whenever you need.{" "}
            </div>
          </div>
        </div>
        {/* שאלה 8 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingEight">
            <button
              className={`accordion-button ${
                openIndex === 7 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(7)}
            >
              Can I share my video on social media or with potential employers?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 7 ? "show" : ""
            }`}
            aria-labelledby="headingEight"
          >
            <div className="accordion-body">
              Absolutely! Once your video is ready, you can easily share it via
              a link or directly on your social media platforms. Many users also
              use their life story videos as part of job applications or to
              introduce themselves in professional networks, providing a more
              personal touch beyond the traditional resume.{" "}
            </div>
          </div>
        </div>
        {/* שאלה 9 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingNine">
            <button
              className={`accordion-button ${
                openIndex === 8 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(8)}
            >
              Can I control who sees my video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 8 ? "show" : ""
            }`}
            aria-labelledby="headingNine"
          >
            <div className="accordion-body">
              Yes, we offer privacy settings that allow you to control who can
              view your video. You can make your video public, share it
              privately with specific people, or restrict access entirely,
              depending on your preferences.{" "}
            </div>
          </div>
        </div>
        {/* שאלה 10 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTen">
            <button
              className={`accordion-button ${
                openIndex === 9 ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion(9)}
            >
              What type of content should I include in my life story video?
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${
              openIndex === 9 ? "show" : ""
            }`}
            aria-labelledby="headingTen"
          >
            <div className="accordion-body">
              Your video should tell the story of who you are as a person. You
              might include personal anecdotes, lessons you've learned,
              meaningful experiences, challenges you've overcome, and what you
              value most in life. Feel free to get creative with how you present
              these aspects—whether it's through narration, images, or even
              clips from your personal life.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
